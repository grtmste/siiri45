# SIIRI 45 — RSVP page

An elegant, mobile-first single-page RSVP web app for Siiri's private 45th
birthday party. Black-tie, candlelit mood: deep emerald velvet, gold, warm
candle glow. All guest-facing copy is in Estonian.

Built with **Next.js (App Router) + TypeScript**, **Tailwind CSS**,
**framer-motion**, and **Neon Postgres** (via `@neondatabase/serverless`).
Deploy target: **Vercel**.

## Features

- Cinematic intro hero at the top of a normally scrollable page: the hero
  photo blurs/fades in, then a gold **"Jätka"** button appears; clicking it
  smooth-scrolls down to the invite.
- Invite section driven entirely by `lib/event-config.ts`, with **Google Maps**
  and **Waze** directions buttons built from the address.
- RSVP form (**"Kas tuled?"**) with attend/decline, name, optional **+1**, and
  graceful loading/error/confirmation states.
- Password-protected **/admin** dashboard: summary cards + a newest-first table
  of every response, with per-row delete. Auth is checked server-side; the
  password never ships to the client.

## 1. Install

```bash
npm install
```

## 2. Add the hero image

Drop the party photo (the one with the neon **"SIIRI 45"** sign) at:

```
public/hero.png
```

Referenced as `/hero.png`. If it's missing, the app shows an emerald/gold
placeholder instead of breaking.

## 3. Configure environment variables

Copy the example file and fill it in:

```bash
cp .env.local.example .env.local
```

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `DATABASE_URL`         | Neon pooled connection string (injected by Vercel in prod).    |
| `ADMIN_USERNAME`       | Admin login (default `siiri`).                                 |
| `ADMIN_PASSWORD`       | Admin login (default `Pidu45!`).                               |
| `ADMIN_SESSION_SECRET` | Long random string for the session cookie (`openssl rand -hex 32`). |

Defaults `siiri` / `Pidu45!` apply if the admin vars are unset.

## 4. Set up the database

Create a Neon project, then run the schema once (Neon SQL Editor or `psql`):

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

See [`db/README.md`](./db/README.md) for details.

## 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin dashboard is at
[http://localhost:3000/admin](http://localhost:3000/admin).

## 6. Edit the event details

Open [`lib/event-config.ts`](./lib/event-config.ts) and replace the `TODO`
placeholders (date/time, location, address, invite text). Every visitor-facing
value lives here.

## 7. Deploy to Vercel

1. Push this repo to GitHub and **import it** into Vercel.
2. In the Vercel project, go to **Storage / Integrations → Marketplace** and add
   the **Neon Postgres** integration. This provisions the database and injects
   `DATABASE_URL` automatically — no need to set it by hand.
3. Run [`db/schema.sql`](./db/schema.sql) against that Neon database (SQL Editor
   or `psql`) to create the `rsvps` table.
4. In **Settings → Environment Variables**, add `ADMIN_USERNAME`,
   `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET`.
5. Deploy. Everything is serverless-friendly — no local filesystem persistence
   and no long-lived DB connections.

## Project structure

```
app/
  layout.tsx            # fonts (Cinzel, Cormorant Garamond) + theme shell
  page.tsx              # intro overlay + invite + rsvp + footer
  globals.css           # emerald/gold design system
  admin/page.tsx        # login + dashboard
  components/           # HeroImage, IntroHero, InviteSection, RsvpSection, …
  api/
    rsvp/route.ts             # POST: store an RSVP
    admin/login/route.ts      # POST: server-side login, sets httpOnly cookie
    admin/logout/route.ts     # POST: clear cookie
    admin/rsvps/route.ts      # GET (protected): list all RSVPs
lib/
  event-config.ts       # host-editable event details
  db.ts                 # Neon client
  auth.ts               # server-side admin auth helpers
db/
  schema.sql            # rsvps table
  README.md             # how to run it on Neon
public/
  hero.png              # (you add this)
```
