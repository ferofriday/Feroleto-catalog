# Troubleshooting: Slow dev & "Page isn't working"

## What’s likely going wrong

1. **Dev server is too slow (7+ min or ~1 hour “Ready”)**
   - **Cause:** Next.js dev compiles the whole app on first run. On a MacBook Air or when the project is on a synced/slow disk, that can take a very long time.
   - **Other causes:** iCloud Drive or Dropbox syncing the project folder; antivirus scanning `node_modules`; low free RAM (Node + Next use a lot of memory).

2. **“Page isn’t working” when submitting name or opening /admin**
   - **Cause (when using `node server.js`):** The proxy starts before Next.js is listening, so requests to Next get “connection refused” and the browser shows a generic error.
   - **Cause (when using `npm run dev`):** You opened the site before the terminal showed “Ready”, so Next wasn’t responding yet.

---

## What to do

### Option 1: Use production mode (recommended)

Avoid the slow dev server. Build once, then start the app (starts in seconds):

```bash
npm run build
```

Wait until you see “Compiled successfully” and the prompt returns (often 1–3 min). Then:

```bash
npm run start
```

Then open:

- **http://localhost:8080**
- **http://localhost:8080/admin**

After the first build, always use `npm run start` to run the app. Use `npm run dev` only when you’re changing code and need hot reload.

---

### Option 2: If build is also very slow

- **Move the project off iCloud/Dropbox**  
  Put the project in a folder that is **not** synced (e.g. `~/Projects/feroleto-catalog`). Syncing thousands of files in `node_modules` and `.next` can make everything 10x slower.

- **Give Node more memory** (if you have enough RAM):
  ```bash
  NODE_OPTIONS=--max-old-space-size=4096 npm run build
  ```
  Then:
  ```bash
  npm run start
  ```

- **Full clean and reinstall** (fixes bad cache or broken install):
  ```bash
  rm -rf .next node_modules
  npm install
  npm run build
  npm run start
  ```

- **Antivirus**  
  Exclude the project folder (or at least `node_modules` and `.next`) from real-time scanning so it isn’t slowing every file read/write.

---

### Option 3: Run dev only when necessary

- Use **`npm run dev`** only when you’re editing code and want changes without rebuilding.
- Always wait until the terminal shows **“✓ Ready”** before opening http://localhost:8080 or submitting the form.
- Prefer **`npm run build`** then **`npm run start`** for normal use so the app starts quickly.

---

## Quick reference

| Goal              | Command           | Then open                    |
|-------------------|-------------------|-----------------------------|
| Run app (fast)    | `npm run start`   | http://localhost:8080       |
| First-time setup  | `npm run build` then `npm run start` | http://localhost:8080, http://localhost:8080/admin |
| Edit code + reload| `npm run dev`     | http://localhost:8080 (after “Ready”) |
| Clean and rebuild | `npm run clean` then `npm run build` then `npm run start` | Same as above |
