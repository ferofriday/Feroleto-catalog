# Feroleto catalog — setup (do this once)

Follow these in order. When done, you’ll have a working app (locally or deployed). **→ For full deployment (including Netlify) and images, see [DEPLOYMENT.md](./DEPLOYMENT.md).**

---

## Step 1: Supabase project

1. Go to **[supabase.com](https://supabase.com)** and sign in (or create an account).
2. Click **New project**.
3. Pick an organization (or create one), name the project (e.g. `feroleto-catalog`), set a database password and region, then **Create new project**.
4. Wait until the project is ready (green checkmark).

---

## Step 2: Run the database schema

1. In the Supabase dashboard, open **SQL Editor** (left sidebar).
2. Click **New query**.
3. Open the file **`supabase/schema.sql`** in this repo and copy **all** of its contents.
4. Paste into the SQL Editor and click **Run** (or Cmd+Enter).
5. You should see “Success. No rows returned.”

---

## Step 3: Storage bucket for crop photos

1. In the left sidebar click **Storage**.
2. Click **New bucket**.
3. Name: **`crop-images`**.
4. Turn **Public bucket** ON (so crop images can be shown on the site).
5. Click **Create bucket**.

---

## Step 4: Get your keys

1. In the left sidebar click **Project Settings** (gear icon).
2. Open **API**.
3. Copy and keep these somewhere safe:
   - **Project URL**
   - **anon public** (under “Project API keys”)
   - **service_role** (under “Project API keys” — keep this secret)

---

## Step 5: Environment variables

**For local:**

1. In the project folder, copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Open **`.env.local`** and fill in (replace the placeholders with your real values):
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL from Step 4
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
   - `SUPABASE_SERVICE_ROLE_KEY` = service_role key
   - `ADMIN_PASSWORD` = a password you choose for the admin site
   - `ADMIN_SECRET` = same as `ADMIN_PASSWORD` or another secret string

**For Vercel (when you deploy):**  
Add the same five variables in the Vercel project → **Settings → Environment Variables**.

---

## Step 6: Seed the catalog

From the project folder in the terminal:

```bash
npm run seed
```

You should see something like “Seeding categories…”, “Categories done”, “Crop types and varieties done”, “Seed complete.”

---

## Step 7: Run the app

**Option A — Local (Node server + welcome/catalog):**

```bash
node server.js
```

Then open **http://localhost:8080**. (For the full Next.js catalog with real data, you’d run `npm run build` then `node server.js` again.)

**Option B — Deploy:**

- **Netlify:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step Netlify setup.
- **Vercel:** Push to GitHub → [vercel.com](https://vercel.com) → Add New → Project → import repo → add env vars → deploy.

---

## Quick check

- **Client:** Open the app → enter name → catalog shows crop cards (Vegetables, Herbs, Cut Flowers) → click a crop → see varieties → add picks → review → submit.
- **Admin:** Open **/admin** → log in with `ADMIN_PASSWORD` → see submissions, crops, edit crop types, upload photos.

If anything in this file doesn’t match what you see in the Supabase or Vercel UIs, use the names/buttons that are there; the steps are the same idea.
