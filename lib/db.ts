import { neon } from "@neondatabase/serverless";

// A single place to obtain the Neon SQL client.
// Reads DATABASE_URL from the environment (Vercel injects this in prod via the
// Neon integration; locally it comes from .env.local). We create the client
// lazily so a missing env var fails only when a query actually runs, not at
// module import / build time.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (or provision Neon on Vercel)."
    );
  }
  return neon(url);
}
