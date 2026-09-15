import { cookies } from "next/headers";

// Server-side admin auth helpers. Credentials and the session token live only
// on the server — they are never shipped to the client bundle.

export const ADMIN_COOKIE = "admin_session";

export function adminUsername(): string {
  return process.env.ADMIN_USERNAME || "siiri";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "Pidu45!";
}

// The token stored in the httpOnly cookie. Falls back to a derived value so the
// app still works if the operator forgets to set ADMIN_SESSION_SECRET, while
// strongly encouraging a real random secret in production.
export function sessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `siiri45-${adminUsername()}-${adminPassword()}`
  );
}

export function credentialsMatch(username: string, password: string): boolean {
  return username === adminUsername() && password === adminPassword();
}

// Reads the request cookies and returns true when the session cookie carries a
// token equal to the server-side secret.
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return Boolean(token) && token === sessionSecret();
}
