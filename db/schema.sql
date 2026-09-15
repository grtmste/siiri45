-- RSVP storage for the "SIIRI 45" party page.
-- Run this once against your Neon database (see db/README.md).

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  attending boolean not null,
  plus_one boolean not null default false,
  plus_one_name text,
  created_at timestamptz not null default now()
);

-- Helpful for the admin dashboard's newest-first ordering.
create index if not exists rsvps_created_at_idx on rsvps (created_at desc);
