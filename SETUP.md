# Setup & Deploy — vedant.dev portfolio

This site is a **Next.js 14 (App Router)** app styled "Aqua Terminal" (Frutiger-Aero + a single
retro window-chrome signature, with an opt-in **Y2K mode**). It deploys to **Vercel** and uses
**Supabase** (postcard guestbook) and the **Spotify Web API** (now-playing widget).

> Everything works locally **with no secrets** — integrations degrade gracefully (Spotify shows an
> offline chip, the guestbook shows sample postcards). Wire up the env vars below to make them live.

## Run locally
```bash
npm install
npm run dev         # http://localhost:3000
```
Press **⌘K** (or **Ctrl+K**) for the command palette. Enter the **Konami code**
(↑ ↑ ↓ ↓ ← → ← → B A) anywhere to toggle **Y2K mode**.

---

## 1. Deploy to Vercel
1. Push this repo to GitHub (already at `vedantnaiduu/personalwebsite`).
2. Go to https://vercel.com → **Add New… → Project** → import the repo. It auto-detects Next.js;
   leave build settings default (do **not** set output to `out`).
3. Add the environment variables from the sections below (Settings → Environment Variables) for
   **Production, Preview, and Development**.
4. Deploy. Push to `main` → Production; PRs → Preview URLs.
5. (Optional) Custom domain: Project → Settings → **Domains**. Lower your DNS TTL first, then point
   records at Vercel. Vercel auto-provisions SSL.

> **GitHub Pages note:** the old `.github/workflows/deploy.yml` (GH Pages) was **removed** — this app
> needs a server runtime (API routes), which GH Pages can't provide. Your old GH Pages site will
> stay up until you disable Pages in the repo settings; Vercel becomes the real home.

### Résumé PDF
Drop your résumé at **`public/Vedant_Naidu_Resume.pdf`** — the "View résumé" button and ⌘K action
link to `/Vedant_Naidu_Resume.pdf`. (Until you add it, the link 404s; everything else works.)

---

## 2. Spotify "Now Playing" (optional, server-only env)
Shows your current/last-played track in the hero. Without these vars the widget shows a friendly
offline state.

**One-time: get a refresh token**
1. https://developer.spotify.com/dashboard → **Create app** (Web API). Copy **Client ID** +
   **Client Secret**. Add redirect URI `http://127.0.0.1:8888/callback`
   (loopback IP is allowed; `localhost` is **not**, post-Nov-2025 OAuth migration).
2. Open this URL in a browser logged into your Spotify account (substitute your client id):
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
   ```
   Approve → you're redirected to `…/callback?code=XXXX`. Copy the `code`.
3. Exchange the code for a refresh token:
   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -H "Authorization: Basic $(printf '%s' 'CLIENT_ID:CLIENT_SECRET' | base64)" \
     -d grant_type=authorization_code \
     -d code=THE_CODE \
     -d redirect_uri=http://127.0.0.1:8888/callback
   ```
   Copy `refresh_token` from the response.

**Env vars (server-only — never `NEXT_PUBLIC_`):**
```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```

---

## 3. Supabase guestbook / postcard wall (optional)
Stores visitor postcards (a tiny doodle + name + message). Without these vars the wall shows sample
postcards and the submit button is disabled.

1. Create a project at https://supabase.com. Copy the **Project URL** and **anon/publishable key**
   (Settings → API). Optionally copy the **service_role** key (server-only).
2. In the Supabase **SQL editor**, run **`supabase/schema.sql`** from this repo (creates the
   `guestbook` table with Row-Level Security: public read + constrained anonymous insert, no
   update/delete).
3. Add env vars:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...           # public, safe in browser
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...      # public/anon — safe ONLY because RLS is on
   SUPABASE_SERVICE_ROLE_KEY=...          # OPTIONAL, server-only (used for inserts if present)
   ```

### Rate limiting (optional, recommended if it gets traffic)
The guestbook POST route rate-limits per IP. With no config it uses a simple in-memory cooldown.
For durable limiting, create an Upstash Redis DB (https://upstash.com) and add:
```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

## 4. What's where (quick map)
- `lib/site-data.ts` — **all content** (identity, experience, the 5 projects + their GitHub links,
  skills, about). Edit copy here.
- `app/globals.css` + `tailwind.config.ts` — the Aqua Terminal design system + Y2K-mode styles.
- `components/sections/*` — Hero, Projects, Experience, About, Skills, PostcardWall, Contact.
- `components/ui/*` — WindowFrame (the chrome motif), NowPlaying, PostcardCanvas, Postcard, chips.
- `components/layout/*` — Nav, Footer, AtmosphereBackground, CommandPalette.
- `app/api/now-playing` + `app/api/guestbook` — the two serverless routes.
- `supabase/schema.sql` — run once in Supabase.
- `.env.example` — the full list of env vars.

## 5. Verify
```bash
npm run lint && npm run build      # both should pass clean
npm run dev                        # click through every section, ⌘K, Konami
```
