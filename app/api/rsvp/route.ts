import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const attending = Boolean(data.attending);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "name_required" },
      { status: 400 }
    );
  }

  // If not attending, force plusOne=false and ignore any plusOneName.
  const plusOne = attending ? Boolean(data.plusOne) : false;
  const plusOneNameRaw =
    typeof data.plusOneName === "string" ? data.plusOneName.trim() : "";
  const plusOneName = attending && plusOne && plusOneNameRaw ? plusOneNameRaw : null;

  try {
    await ensureSchema();
    const sql = getSql();
    await sql`
      insert into rsvps (name, attending, plus_one, plus_one_name)
      values (${name}, ${attending}, ${plusOne}, ${plusOneName})
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
