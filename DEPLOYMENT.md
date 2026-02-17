# Feroleto Catalog — Setup & Deployment

Follow these steps in order.

---

## 1. Connect to Supabase

### 1a. Create a Supabase project

1. Go to **[supabase.com](https://supabase.com)** and sign in (or create an account).
2. Click **New project**.
3. Pick an organization, name the project (e.g. `feroleto-catalog`), set a database password, choose a region, then **Create new project**.
4. Wait until the project is ready (green checkmark).

### 1b. Run the database schema

1. In the Supabase dashboard → **SQL Editor** → **New query**.
2. Open **`supabase/schema.sql`** in this repo and copy all of its contents.
3. Paste into the SQL Editor and click **Run**.
4. You should see "Success. No rows returned."

### 1c. Create storage bucket for crop images

1. In the left sidebar → **Storage** → **New bucket**.
2. Name: **`crop-images`**.
3. Turn **Public bucket** ON (images need to be publicly viewable).
4. Click **Create bucket**.

### 1d. Get your API keys

1. **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL**
   - **anon public** (Project API keys)
   - **service_role** (Project API keys — keep secret)

### 1e. Local environment variables

1. In the project folder:
   ```bash
   cp .env.example .env.local
   ```

2. Edit **`.env.local`** and fill in:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_PASSWORD=choose-a-strong-password
   ADMIN_SECRET=same-or-another-secret
   ```

### 1f. Seed the database

```bash
npm run seed
```

You should see "Seeding categories…", "Categories done", "Crop types and varieties done", "Seed complete."

### 1g. Verify locally

```bash
npm run dev
```

Open **http://localhost:8080**. You should see the catalog with Vegetables, Herbs, and Cut Flowers.

---

## 2. Deploy to Netlify

### 2a. Prepare the repo

1. Initialize git if needed: `git init`
2. Create a `.gitignore` that includes `.env.local`, `node_modules`, `.next`
3. Push to **GitHub** (or GitLab/Bitbucket)

### 2b. Connect to Netlify

1. Go to **[netlify.com](https://netlify.com)** and sign in.
2. **Add new site** → **Import an existing project**.
3. Connect your Git provider and select the `feroleto-catalog` repo.
4. Netlify should auto-detect Next.js. Use:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (or leave default — Netlify’s Next.js plugin handles it)
   - **Base directory:** (leave blank)

### 2c. Environment variables on Netlify

1. **Site settings** → **Environment variables** → **Add a variable**.
2. Add these (same as `.env.local`):

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
   | `ADMIN_PASSWORD` | Your admin password |
   | `ADMIN_SECRET` | Your admin secret |

3. Enable them for **Production** (and Preview if you use branch deploys).

### 2d. Deploy

1. Click **Deploy site**.
2. When the build finishes, open your Netlify URL.
3. Test: enter your name → browse catalog → submit a selection.
4. Admin: visit `https://your-site.netlify.app/admin` and log in with `ADMIN_PASSWORD`.

---

## 3. Storage bucket policies (for image uploads)

For the admin image upload to work, the `crop-images` bucket must allow uploads. The app uses the **service role** key for uploads, which bypasses RLS, so you typically don’t need extra policies.

If uploads fail:

1. **Storage** → **crop-images** → **Policies**.
2. Add a policy: allow **INSERT** and **UPDATE** for authenticated users (or use a custom policy if you prefer).

---

## 4. Images

### Setup

Images are stored in the Supabase `crop-images` bucket you created in Step 1c. The app uploads via the service role key, so no extra storage policies are needed.

### Adding crop images

1. Deploy the app and open **/admin**.
2. Log in with your admin password.
3. Go to **Crops** → click a crop (e.g. Cherry Tomatoes).
4. Under **Photo**, click **Choose File** and select an image (JPG, PNG, or WebP, max 5MB).
5. The image uploads and replaces the placeholder on the crop card in the public catalog.

### Supported formats

- JPG, PNG, WebP (typical web formats).
- Max file size: 5MB.
- Recommended dimensions: 800×600 or 1200×900 for crop cards.

---

## Troubleshooting

| Problem | Check |
|--------|--------|
| "Connection failed" on catalog | Supabase URL and keys in env vars; schema and seed run |
| Admin login fails | `ADMIN_PASSWORD` and `ADMIN_SECRET` set in Netlify |
| Image upload fails | `crop-images` bucket exists and is public; service role key is set |
| Build fails on Netlify | Run `npm run build` locally; fix any TypeScript or lint errors |
