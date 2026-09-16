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

// Create the rsvps table if it doesn't exist yet, so the app works even when
// db/schema.sql hasn't been run manually (as long as DATABASE_URL is set).
// Memoized per server instance so it runs at most once per cold start.
let schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    const sql = getSql();
    schemaReady = (async () => {
      await sql`
        create table if not exists rsvps (
          id uuid primary key default gen_random_uuid(),
          name text not null,
          attending boolean not null,
          plus_one boolean not null default false,
          plus_one_name text,
          created_at timestamptz not null default now()
        )
      `;
    })().catch((err) => {
      // Reset so a later request can retry (e.g. transient connection issue).
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}
