# Database setup (Neon Postgres)

The app stores RSVPs in a single `rsvps` table on [Neon](https://neon.tech).
You only need to run `schema.sql` once.

## Option A — Neon SQL Editor (easiest)

1. Open your project in the [Neon Console](https://console.neon.tech).
2. Go to **SQL Editor**.
3. Paste the contents of [`schema.sql`](./schema.sql) and click **Run**.

## Option B — `psql`

Use the connection string from Neon (Dashboard → **Connection Details**):

```bash
psql "postgres://USER:PASSWORD@HOST/DBNAME?sslmode=require" -f db/schema.sql
```

## Notes

- `gen_random_uuid()` is built into modern Postgres (Neon includes it), so no
  extension is required.
- Re-running the script is safe: it uses `create table if not exists` and
  `create index if not exists`.
- The same `DATABASE_URL` the app reads at runtime can be used here. On Vercel
  that variable is injected automatically by the Neon Marketplace integration;
  locally put it in `.env.local`.
