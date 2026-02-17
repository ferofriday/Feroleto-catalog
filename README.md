# Feroleto Garden Co. — Crop Catalog

A web app for residential garden clients to browse crops, pick varieties, and submit their selections. Includes an admin dashboard for managing submissions and crop data.

## Stack

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **Supabase** (Postgres + Storage for crop photos)
- **Vercel** (deploy)

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the schema: `supabase/schema.sql`.
3. Create a storage bucket named `crop-images` (Public).
4. Copy your project URL, anon key, and service role key.

### 2. Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (for admin and seed)
- `ADMIN_PASSWORD` — password for `/admin` login
- `ADMIN_SECRET` — secret for signing admin session cookie (can match password)

### 3. Seed the catalog

```bash
npm install
npm run seed
```

### 4. Run locally

```bash
npm run dev
```

- Client: [http://localhost:3000](http://localhost:3000) — welcome → catalog → detail → review → submit
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin) — login with `ADMIN_PASSWORD`

## Deploy (Vercel)

1. Push the repo to GitHub and import in Vercel.
2. Add the same env vars in Vercel (Settings → Environment Variables).
3. Deploy.

## Features

- **Client**: Enter name → browse crop types (filter by category) → open detail → pick whole crop type or specific varieties → optional notes → review → submit → confirmation.
- **Admin**: Dashboard (submissions), view by client, view by crop (counts), edit crop type name/description/season, upload photo for crop type, mark submission status (new / planned / planted).

## Project structure

- `src/app` — routes (welcome, catalog, review, confirm, admin)
- `src/components` — catalog header, crop type card
- `src/context` — picks state (client selections)
- `src/lib` — Supabase client, admin auth
- `src/data` — seed data; `src/scripts/seed.ts` — seed script
- `supabase/schema.sql` — DB schema
