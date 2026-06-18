# Deploy Level Up to Netlify (GitHub method)

Your folder is already a complete Netlify site. These steps put it on GitHub and connect it to Netlify for auto-deploys.

## What's in the folder
- `index.html` — the whole app (single file, includes the confetti + sound)
- `netlify/functions/state.mjs` — the shared storage API (Netlify Blobs)
- `netlify.toml`, `package.json` — Netlify config + the function's dependency
- `.gitignore` — keeps `node_modules` out of the repo (Netlify installs it on build)

## 1. Put the folder on GitHub
Easiest (no command line):
1. Go to https://github.com/new and create a repo, e.g. `level-up` (Private is fine). Do NOT add a README/license.
2. On the next page click **uploading an existing file**.
3. Drag the **contents** of this folder into the upload area (including the `netlify` subfolder — dragging the folder keeps the structure). Don't drag `node_modules` if it exists.
4. Click **Commit changes**.

## 2. Connect it to Netlify
1. Go to https://app.netlify.com → **Add new site** → **Import an existing project**.
2. Choose **GitHub**, authorize if asked, and pick the repo you just created.
3. Build settings — leave them as detected:
   - Build command: (empty)
   - Publish directory: `.`
   Netlify reads `netlify.toml` automatically, so you usually don't change anything.
4. Click **Deploy**.

## 3. Done
- Netlify gives you a URL like `https://level-up-xyz.netlify.app`.
- Netlify Blobs turns on automatically — no extra config, no database to set up.
- Open the site, set your admin PIN, and you're live. Both kids' tablets now share the same data.
- Per-kid links work too: `https://YOUR-SITE.netlify.app/?kid=ashwin` and `/?kid=naveen`.

## Updating later
Re-upload a changed `index.html` to GitHub (or commit a change) and Netlify redeploys automatically in ~1 minute.

## Note on shared editing
Saves are last-write-wins. If both kids tap at the exact same second on different tablets, the later save wins. For normal family use that's fine. Reload a tablet to pull the latest.
