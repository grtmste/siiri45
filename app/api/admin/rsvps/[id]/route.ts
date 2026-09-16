import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// DELETE /api/admin/rsvps/<id> — protected: remove a single RSVP row.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await params;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "bad_id" }, { status: 400 });
  }

  try {
    const sql = getSql();
    await sql`delete from rsvps where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Deleting RSVP failed:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
