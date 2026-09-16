import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    await ensureSchema();
    const sql = getSql();
    const rows = await sql`
      select id, name, attending, plus_one, plus_one_name, created_at
      from rsvps
      order by created_at desc
    `;
    return NextResponse.json({ ok: true, rsvps: rows });
  } catch (err) {
    console.error("Fetching RSVPs failed:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
