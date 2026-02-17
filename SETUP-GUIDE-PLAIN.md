# Feroleto Catalog — Step-by-Step Setup Guide

Written for non-technical users. Follow each section in order.

---

## Part 1: Create a Supabase Account and Project

Supabase is a service that stores your catalog data (categories, crops, varieties) online. You’ll create a free account and a new project.

### Step 1.1: Sign up for Supabase

1. Open a web browser (Chrome, Safari, Firefox).
2. Go to: **https://supabase.com**
3. Click **Start your project** (or **Sign in** if you have an account).
4. Sign in with GitHub or email, and follow the prompts to create an account.

### Step 1.2: Create a new project

1. After you’re logged in, click **New project**.
2. **Organization:** Use the one shown, or create one (e.g. “My Org”).
3. **Name:** Type something like `feroleto-catalog`.
4. **Database Password:** Make up a strong password and **write it down somewhere safe.** You’ll need it later.
5. **Region:** Choose the one closest to you (e.g. East US).
6. Click **Create new project**.
7. Wait 1–2 minutes until you see a green checkmark and “Project is ready.”

---

## Part 2: Set Up Your Database

You’ll run a pre-made script that creates the tables Supabase needs (categories, crops, varieties, etc.).

### Step 2.1: Open the SQL Editor

1. In the left sidebar of Supabase, click **SQL Editor** (looks like a code/file icon).
2. Click **New query**.

### Step 2.2: Copy and run the schema

1. On your computer, open the project folder: `feroleto-catalog`.
2. Open the folder `supabase`, then the file `schema.sql`.
   - You can open it in Cursor, VS Code, or any text editor.
3. Select all the text in that file (Cmd+A on Mac, Ctrl+A on Windows) and copy it (Cmd+C or Ctrl+C).
4. Go back to the Supabase browser tab.
5. Click inside the empty box in the SQL Editor.
6. Paste the text you copied (Cmd+V or Ctrl+V).
7. Click **Run** (or press Cmd+Enter on Mac).
8. You should see “Success. No rows returned.” That means it worked.

---

## Part 3: Create the Image Storage Bucket

The app stores crop photos in a “bucket” (like a folder) in Supabase.

### Step 3.1: Create the bucket

1. In the left sidebar of Supabase, click **Storage**.
2. Click **New bucket**.
3. **Name:** Type exactly: `crop-images`
4. Turn ON **Public bucket** (toggle should be on/green) so the images can be shown on the website.
5. Click **Create bucket**.

---

## Part 4: Get Your API Keys

You’ll copy three values from Supabase and put them into a file on your computer. Those let the app talk to Supabase.

### Step 4.1: Find the keys

1. In the left sidebar, click **Project Settings** (gear icon at the bottom).
2. Click **API** in the left menu.
3. On that page you’ll see:
   - **Project URL** — a link like `https://xxxx.supabase.co`
   - **Project API keys** — two keys:
     - `anon` `public` — the anon key
     - `service_role` — the service role key (keep this secret)
4. Click the copy icon next to each value and paste them into a safe note on your computer. Label them clearly:
   - Project URL
   - Anon key
   - Service role key

---

## Part 5: Put the Keys Into Your Project

You’ll create a file called `.env.local` in your project folder and paste the keys into it.

### Step 5.1: Create `.env.local`

1. Open your project folder `feroleto-catalog` in Finder (Mac) or File Explorer (Windows).
2. Look for a file named `.env.example`. If you don’t see it, it may be hidden; use Cursor or your editor to open the project and you should see it.
3. In Cursor (or your editor):
   - Right-click `.env.example` → Copy, or use duplicate/copy.
   - Paste it and rename the copy to `.env.local` (remove `.example`).
   - Or: create a new file named `.env.local` in the project root.

### Step 5.2: Fill in the values

Open `.env.local` and you’ll see something like:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=same-or-another-secret
```

Replace each value:

- **NEXT_PUBLIC_SUPABASE_URL** — paste your Project URL from Step 4.
- **NEXT_PUBLIC_SUPABASE_ANON_KEY** — paste your anon key.
- **SUPABASE_SERVICE_ROLE_KEY** — paste your service role key.
- **ADMIN_PASSWORD** — choose a password you’ll use to log into the admin area. Write it down.
- **ADMIN_SECRET** — can be the same as ADMIN_PASSWORD, or another secret string.

Save the file. Do not share this file or put it on the internet.

---

## Part 6: Seed the Database (Add the Catalog Data)

“Seeding” means loading the catalog (Vegetables, Herbs, Cut Flowers and all the varieties) into Supabase.

### Step 6.1: Open the terminal

1. In Cursor, open the Terminal:
   - View → Terminal, or
   - Shortcut: Ctrl+` (backtick) or Cmd+` on Mac.
2. Make sure you’re in the project folder. You should see `feroleto-catalog` in the path.
   - If not, type: `cd ~/Projects/feroleto-catalog` and press Enter.

### Step 6.2: Run the seed command

1. Type: `npm run seed`
2. Press Enter.
3. Wait a few seconds. You should see lines like:
   - “Seeding categories…”
   - “Categories done”
   - “Crop types and varieties done”
   - “Seed complete.”

If you see any error, double-check that `.env.local` has the correct keys and that Part 2 (schema) ran successfully.

---

## Part 7: Run the App Locally

Now you can run the app on your own computer and see it in the browser.

### Step 7.1: Start the dev server

1. In the terminal (same one as Part 6):
2. Type: `npm run dev`
3. Press Enter.
4. Wait until you see something like “Ready” or “Local: http://localhost:8080”.

### Step 7.2: Open the app in your browser

1. Open your browser.
2. Go to: **http://localhost:8080**
3. You should see the Feroleto catalog with categories (Vegetables, Herbs, Cut Flowers) and crop cards.

To stop the server: press **Ctrl+C** in the terminal. To run it again later, run `npm run dev` again.

---

## Part 8: Deploy to Netlify (Put It Online)

Netlify hosts your site so others can visit it on the web. You’ll connect your GitHub repo and add the same keys you used in Part 5.

### Step 8.1: Put your project on GitHub

1. If you haven’t already, create an account at **https://github.com**.
2. Create a new repository (e.g. `feroleto-catalog`).
3. In Cursor’s terminal (with the project folder open):
   - If the project is not yet a git repo:  
     `git init`
   - Add files:  
     `git add .`
   - Commit:  
     `git commit -m "Initial commit"`
   - Add the GitHub repo:  
     `git remote add origin https://github.com/YOUR-USERNAME/feroleto-catalog.git`  
     (Replace YOUR-USERNAME with your GitHub username.)
   - Push:  
     `git push -u origin main`  
     (If your default branch is `master`, use `master` instead of `main`.)

If you’re unsure about git, you can use GitHub Desktop or ask someone technical to help with this step.

### Step 8.2: Connect the project to Netlify

1. Go to **https://netlify.com** and sign in (or create an account).
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** and authorize Netlify if asked.
4. Select your `feroleto-catalog` repository.
5. Netlify will guess the settings. Leave them as:
   - **Build command:** `npm run build`
   - **Publish directory:** (leave default or `.next`)
6. Before deploying, click **Add environment variables** (or **Advanced build settings** → **Environment variables**).

### Step 8.3: Add environment variables on Netlify

Add each of these variables. Click “New variable” or “Add a variable” for each:

| Variable name | Value |
|---------------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (same as in .env.local) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `ADMIN_PASSWORD` | Your admin password |
| `ADMIN_SECRET` | Your admin secret |

Make sure “Production” is checked (and “Preview” if you use branch deploys).

### Step 8.4: Deploy

1. Click **Deploy site** (or **Deploy**).
2. Wait a few minutes while Netlify builds and deploys.
3. When it’s done, you’ll get a URL like `https://something-random.netlify.app`.
4. Click it to open your live catalog.

### Step 8.5: Test the live site

1. Go to your Netlify URL.
2. Enter your name, browse the catalog, and submit a selection.
3. Visit `https://your-site.netlify.app/admin` and log in with your ADMIN_PASSWORD to access the admin area.

---

## Part 9: Adding Images to Crops

After the site is deployed, you can add photos to crops from the admin area.

1. Go to `https://your-site.netlify.app/admin`.
2. Log in with your admin password.
3. Click **Crops**.
4. Click a crop (e.g. Cherry Tomatoes).
5. Under **Photo**, click **Choose File** and pick an image (JPG, PNG, or WebP, max 5MB).
6. The image uploads. Refresh the main catalog page and you should see it on the crop card.

---

## Quick Reference

| Task | Command or URL |
|------|----------------|
| Run the app locally | `npm run dev` then open http://localhost:8080 |
| Stop the app | Ctrl+C in the terminal |
| Seed the database | `npm run seed` |
| Admin area (local) | http://localhost:8080/admin |
| Admin area (live) | https://your-site.netlify.app/admin |

---

## If Something Goes Wrong

- **“Connection failed” on the catalog** — Check that `.env.local` has the correct Supabase URL and keys. Make sure Part 2 (schema) and Part 6 (seed) both completed.
- **Can’t log into admin** — Make sure ADMIN_PASSWORD and ADMIN_SECRET are set correctly in `.env.local` (or in Netlify env vars for the live site).
- **Image upload fails** — Confirm the `crop-images` bucket exists in Supabase, that it’s public, and that SUPABASE_SERVICE_ROLE_KEY is set.
- **Build fails on Netlify** — Verify all five environment variables are set. Try running `npm run build` locally; if it fails there, fix those errors first.
