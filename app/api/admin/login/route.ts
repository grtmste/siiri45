import { NextResponse } from "next/server";
import { ADMIN_COOKIE, credentialsMatch, sessionSecret } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;
  const username = typeof data.username === "string" ? data.username : "";
  const password = typeof data.password === "string" ? data.password : "";

  if (!credentialsMatch(username, password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return res;
}
