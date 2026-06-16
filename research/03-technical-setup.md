# 03 — Technical Setup: Spotify Now Playing, Vercel Migration, Supabase Interactive Features

Researched June 2026. Targets Next.js App Router (Next 15/16) on Vercel, `@supabase/supabase-js` v2.91+, Spotify Web API.

> **Critical deprecation flag (Spotify):** The OAuth migration deadline of **27 Nov 2025 has passed**. As of now:
> - **Implicit Grant flow is gone.** Use Authorization Code flow (server-side, with client secret) — which is what this doc uses.
> - **Redirect URIs must be HTTPS.** Plain `http://` URIs are rejected. `localhost` is prohibited as a redirect host; `http://127.0.0.1:PORT` is still allowed for local dev (loopback IP, not the `localhost` alias).
> - Server-side Authorization Code flow with `client_secret` + a long-lived refresh token **still works** and is the recommended pattern for a personal "now playing" widget.
> Sources: https://developer.spotify.com/blog/2025-10-14-reminder-oauth-migration-27-nov-2025 , https://developer.spotify.com/documentation/web-api/tutorials/code-flow

---

## 1) Spotify "Now Playing" in Next.js App Router on Vercel

### 1.1 Required scopes
- `user-read-currently-playing` — for `GET /v1/me/player/currently-playing`
- `user-read-recently-played` — for `GET /v1/me/player/recently-played`

(You may also see `user-read-playback-state` referenced; it covers device/playback context but is **not required** just to read the current track. Keep scopes minimal.)

### 1.2 Register the Spotify app (one time)
1. Go to https://developer.spotify.com/dashboard → **Create app**.
2. Name/description anything. App type: Web API.
3. **Redirect URI**: add an HTTPS URI you control for the one-time auth step. For a quick local grab you can use `http://127.0.0.1:8888/callback` (loopback IP is allowed; `localhost` is not). For production-safe, use an HTTPS URL.
4. Save. Copy **Client ID** and **Client Secret** (Settings → "View client secret").

### 1.3 One-time Authorization Code grant → obtain the long-lived REFRESH TOKEN
You do this **once**, manually, to mint a refresh token that you then paste into env vars. The refresh token does not expire unless revoked.

**Step A — build the authorize URL and open it in a browser (while logged into your Spotify account):**
```
https://accounts.spotify.com/authorize?
  client_id=YOUR_CLIENT_ID
  &response_type=code
  &redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback
  &scope=user-read-currently-playing%20user-read-recently-played
```
(URL-encode the redirect_uri exactly as registered; space-separate scopes.)

Approve. Spotify redirects to `…/callback?code=AQ...`. Copy the `code` value (single-use, expires fast).

**Step B — exchange the code for tokens (run once; this curl returns the refresh token):**
```bash
curl -X POST https://accounts.spotify.com/api/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Authorization: Basic $(printf '%s' 'CLIENT_ID:CLIENT_SECRET' | base64)" \
  -d grant_type=authorization_code \
  -d code=THE_CODE_FROM_STEP_A \
  -d redirect_uri=http://127.0.0.1:8888/callback
```
Response includes `access_token`, `expires_in`, and crucially **`refresh_token`**. Save the `refresh_token` — that is `SPOTIFY_REFRESH_TOKEN`.

> Gotcha: the `code` is single-use and short-lived. If you get `invalid_grant`, redo Step A. The `redirect_uri` in Step B must byte-for-byte match the one in Step A and the dashboard.

### 1.4 Environment variables (Vercel + `.env.local`)
```
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
SPOTIFY_REFRESH_TOKEN=...
```
All three are **server-only** — do NOT prefix with `NEXT_PUBLIC_`. Add them in Vercel → Project → Settings → Environment Variables (Production + Preview + Development).

### 1.5 Refresh-token → access-token exchange (server side)
Endpoint: `POST https://accounts.spotify.com/api/token`
- Header `Content-Type: application/x-www-form-urlencoded`
- Header `Authorization: Basic base64(client_id:client_secret)`
- Body: `grant_type=refresh_token&refresh_token=...`

Response shape:
```json
{ "access_token":"BQ...", "token_type":"Bearer", "expires_in":3600,
  "scope":"user-read-currently-playing user-read-recently-played",
  "refresh_token":"AQ..." }
```
> Gotcha: a **new `refresh_token` may or may not** be returned. If absent, keep using the existing one. (For a personal widget reading from env, you can ignore rotation; if Spotify ever rotates yours, re-run §1.3.)

### 1.6 Route Handler — `app/api/now-playing/route.ts`
```ts
// app/api/now-playing/route.ts
import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    // Token endpoint must never be cached.
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  return (await res.json()) as { access_token: string };
}

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
};

function mapTrack(item: any, isPlaying: boolean): Track {
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists ?? []).map((a: any) => a.name).join(", "),
    album: item.album?.name ?? "",
    albumImageUrl: item.album?.images?.[0]?.url ?? null,
    songUrl: item.external_urls?.spotify ?? "",
  };
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    const auth = { Authorization: `Bearer ${access_token}` };

    // 1) Currently playing
    const nowRes = await fetch(NOW_PLAYING, { headers: auth, cache: "no-store" });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      // currently-playing can return a non-track context (ads/podcasts) -> item null
      if (data?.item && data.currently_playing_type === "track") {
        return cached(NextResponse.json(mapTrack(data.item, !!data.is_playing)));
      }
    }
    // 204 No Content (or non-track) => nothing playing; fall through to recent.

    // 2) Recently played fallback
    const recentRes = await fetch(RECENTLY_PLAYED, { headers: auth, cache: "no-store" });
    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const item = data?.items?.[0]?.track;
      if (item) return cached(NextResponse.json(mapTrack(item, false)));
    }

    // 3) Final fallback: nothing to show
    return cached(NextResponse.json({ isPlaying: false } satisfies Partial<Track>));
  } catch (err) {
    return NextResponse.json(
      { isPlaying: false, error: "spotify_unavailable" },
      { status: 200 } // keep the widget graceful even on failure
    );
  }
}

function cached(res: NextResponse) {
  // Edge/CDN cache + SWR so we don't hammer Spotify on every visitor.
  res.headers.set(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=60"
  );
  return res;
}
```

### 1.7 Caching / revalidation notes
- **Per-request fetches use `cache: "no-store"`** so the token call and Spotify reads are always fresh; never cache the token endpoint.
- **Edge-cache the handler's response** via `Cache-Control: s-maxage=30, stale-while-revalidate=60`. This serves cached "now playing" data from Vercel's CDN for ~30s, refreshing in the background — protects you from Spotify rate limits and keeps the widget snappy.
- Alternative: if you want the route itself revalidated, add `export const revalidate = 30;` — but the explicit `Cache-Control` header is more predictable for a JSON API used by a client `fetch`.
- Do **not** set `export const dynamic = "force-static"` here (it would freeze the data at build time).

### 1.8 "Nothing playing" fallback (UI)
The handler returns `{ isPlaying: false }` (or a recently-played track with `isPlaying:false`). Client polls every ~20–30s:
```ts
"use client";
import useSWR from "swr";
const fetcher = (u: string) => fetch(u).then((r) => r.json());
export function NowPlaying() {
  const { data } = useSWR("/api/now-playing", fetcher, { refreshInterval: 30000 });
  if (!data) return <div>Loading…</div>;
  if (!data.title) return <div>Not playing anything right now</div>;
  return (
    <a href={data.songUrl} target="_blank" rel="noreferrer">
      {data.isPlaying ? "▶ Now playing" : "⏸ Last played"}: {data.title} — {data.artist}
    </a>
  );
}
```

### 1.9 Spotify gotchas summary
- `204 No Content` from currently-playing = nothing playing → fall back to recently-played.
- `currently_playing_type` may be `ad` / `episode` / `unknown` with `item` null — guard for it.
- Album art is an **external URL** (`i.scdn.co`). If you render it via `next/image`, add it to `remotePatterns` (see §2). A plain `<img>` avoids that entirely.
- Rate limits are per-app and rolling; the CDN cache in §1.7 is the main mitigation.

---

## 2) Migrating from Static Export / GitHub Pages → Vercel

### 2.1 What to REMOVE from `next.config.js`
Static export for GH Pages typically looks like:
```js
// BEFORE (GitHub Pages static export)
module.exports = {
  output: "export",                 // remove
  basePath: "/your-repo-name",      // remove (GH Pages subpath; Vercel serves at root)
  assetPrefix: "/your-repo-name/",  // remove
  images: { unoptimized: true },    // remove to re-enable optimization
  trailingSlash: true,              // optional; remove unless you want it
};
```
```js
// AFTER (Vercel) — often you need (almost) nothing:
module.exports = {
  images: {
    remotePatterns: [
      // only if you load external images via next/image, e.g. Spotify art:
      { protocol: "https", hostname: "i.scdn.co" },
    ],
  },
};
```
- **`output: 'export'`** → remove. This is the switch that made Next produce a static `out/` dir and disabled all server features (Route Handlers, ISR, image optimization, middleware). On Vercel you want the full server runtime.
- **`basePath` / `assetPrefix`** → remove. They existed only because GH Pages serves your site under `/<repo>/`. Vercel serves at the domain root, and a stale `basePath` will break every internal link and asset path.
- **`images.unoptimized: true`** → remove to re-enable the Image Optimization API.

### 2.2 How image handling changes
- Under static export, `next/image` **required** `unoptimized: true` (no server to optimize at runtime). Images were shipped as-is.
- On Vercel, removing `unoptimized` **automatically re-enables** on-the-fly optimization (WebP/AVIF, resizing, lazy loading) served from Vercel's image pipeline. No other code change needed for local/`/public` images.
- **External images** (Spotify album art, avatars, etc.) must be allow-listed via `images.remotePatterns` (object or `new URL()` form). Example above for `i.scdn.co`.
- **Deprecation flag:** the old `images.domains` array is **deprecated** — use `remotePatterns` instead. `remotePatterns` is stricter/safer (matches protocol + hostname + path).
- If a remote image needs auth, prefer `unoptimized` on that specific `<Image>` instead of routing it through the optimizer.
- Note: Vercel Image Optimization has usage-based pricing on paid plans; for a personal site this is typically within free limits. If you'd rather not use it, you can keep `<img>` tags or set per-image `unoptimized`.

### 2.3 Vercel deploy steps

**Option A — Git integration (recommended, gives auto preview + prod deploys):**
1. Push your repo to GitHub.
2. Vercel dashboard → **Add New… → Project** → Import the GitHub repo.
3. Framework preset auto-detects **Next.js**; build command `next build`, output handled automatically (do NOT set output dir to `out`).
4. Add the env vars from §1.4.
5. Deploy. Every push to the default branch → Production; every PR/branch → a Preview URL with auto custom-domain updates.

**Option B — Vercel CLI:**
```bash
npm i -g vercel
vercel login
vercel            # first run links/creates the project, deploys a Preview
vercel --prod     # promote to Production
# add an env var via CLI if needed:
vercel env add SPOTIFY_REFRESH_TOKEN production
```

### 2.4 Custom / alias domain
- **Dashboard:** Project → Settings → **Domains** → add your domain → follow DNS records (A/`CNAME`, or set nameservers). Vercel auto-provisions SSL.
- **CLI:**
  ```bash
  vercel domains add yourdomain.com         # add domain to the linked project
  vercel alias set <deployment-url> yourdomain.com   # point a specific deployment at it
  ```
- With Git integration, once the domain is attached to the project, **new production deployments automatically take the custom domain** — no manual alias step needed each time.
- Migration tip: lower DNS TTL before cutover; GH Pages and Vercel can't both own the domain at once, so flip DNS when ready.

Sources: https://vercel.com/docs/cli/deploy , https://vercel.com/docs/cli/alias , https://vercel.com/docs/git/vercel-for-github , https://nextjs.org/docs/app/api-reference/components/image , https://nextjs.org/docs/pages/guides/static-exports

---

## 3) Supabase for Two Interactive Features

### 3.0 Which keys are safe to expose
- **Publishable / anon key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`, or the newer `sb_publishable_*`): **safe in the browser.** It is low-privilege and only works within the bounds of your **RLS policies**. Ship it client-side.
- **Service role / secret key** (`sb_secret_*` / `service_role`): **NEVER** expose. It bypasses RLS. Server-only, used only in Route Handlers / Server Actions if you need elevated writes (e.g., server-side rate limiting).
- Project URL (`NEXT_PUBLIC_SUPABASE_URL`) is public.
- **Hard rule:** the publishable key is only "safe" **if RLS is enabled on every table**. RLS off + public key = open database.

> 2025 note: Supabase introduced new API key format (`sb_publishable_*` / `sb_secret_*`) replacing the legacy `anon`/`service_role` JWTs. Both work during the transition; the role names (`anon`, `authenticated`, `service_role`) in RLS policies are unchanged.

Client setup (browser):
```ts
// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // publishable / anon key — safe in browser WITH RLS
);
```

---

### 3.a Persisted Guestbook / Postcard Wall

**Table schema (SQL):**
```sql
create table public.guestbook (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 40),
  message     text not null check (char_length(message) between 1 and 500),
  -- small drawing stored inline as a data URL; cap size to avoid abuse:
  drawing     text check (drawing is null or char_length(drawing) <= 200000),
  -- optional: if you store to Storage instead, keep just the path:
  drawing_path text
);

-- index for the wall feed
create index guestbook_created_at_idx on public.guestbook (created_at desc);
```

**RLS policies (anon reads + safe anon inserts):**
```sql
alter table public.guestbook enable row level security;

-- Anyone can read the wall
create policy "guestbook_select_public"
  on public.guestbook for select
  to anon
  using (true);

-- Anyone can insert, but only rows that pass the column CHECK constraints.
-- The WITH CHECK here re-validates so anon can't write oversized/empty rows.
create policy "guestbook_insert_anon"
  on public.guestbook for insert
  to anon
  with check (
    char_length(name) between 1 and 40
    and char_length(message) between 1 and 500
    and (drawing is null or char_length(drawing) <= 200000)
  );

-- NO update/delete policies for anon => anon cannot edit or delete entries.
```
> Why this is safe: with RLS on and only SELECT + constrained INSERT granted to `anon`, a leaked publishable key can only read the wall and append validated rows. No deletes, no updates, no oversized payloads.

**Client insert + read:**
```ts
"use client";
import { supabase } from "@/lib/supabase/client";

export async function signGuestbook(name: string, message: string, drawingDataUrl?: string) {
  const { error } = await supabase.from("guestbook").insert({
    name, message, drawing: drawingDataUrl ?? null,
  });
  if (error) throw error;
}

export async function loadGuestbook() {
  const { data, error } = await supabase
    .from("guestbook")
    .select("id, created_at, name, message, drawing")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return data;
}
```

**Storing the drawing — two options:**
1. **Inline data URL** (simplest): store the base64 PNG string in the `drawing` text column. Keep it small (canvas ≤ ~300×300, PNG). The 200 KB CHECK guards your DB. Good for tiny postcard doodles.
2. **Supabase Storage** (better for larger images): upload the blob, store only the path:
```ts
const fileName = `${crypto.randomUUID()}.png`;
const { error: upErr } = await supabase.storage
  .from("guestbook-drawings")           // create a PUBLIC bucket for read
  .upload(fileName, blob, { contentType: "image/png" });
// then insert drawing_path: fileName
```
Make the bucket public-read (or use signed URLs), and add Storage RLS policies analogous to the table (anon insert into that bucket, public read).

**Rate-limiting ideas (anon inserts are abusable):**
- **DB-side throttle via a trigger** — reject if the same IP/fingerprint inserted in the last N seconds. Postgres can't see the real client IP from RLS reliably, so the robust approach is:
- **Route Handler in front of inserts** — instead of inserting directly from the browser, POST to `app/api/guestbook/route.ts`, where you:
  - read the caller IP from `request.headers.get("x-forwarded-for")` (Vercel sets this),
  - check a rate limit (e.g. Upstash Redis `@upstash/ratelimit`, sliding window e.g. 3/min/IP),
  - then insert using the **service role** key (server-only) or still the anon key.
- **Cheap client-side defenses** (defense in depth, not security): honeypot field, a simple time-to-fill check, and `localStorage` cooldown.
- **DB CHECK constraints** (above) already block empty/oversized abuse regardless of client.

Example rate-limited Route Handler:
```ts
// app/api/guestbook/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 s"),
});

// service role: bypasses RLS — SERVER ONLY, never sent to client
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const { success } = await ratelimit.limit(`guestbook:${ip}`);
  if (!success) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const body = await req.json();
  const name = String(body.name ?? "").slice(0, 40);
  const message = String(body.message ?? "").slice(0, 500);
  if (!name || !message) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const { error } = await admin.from("guestbook").insert({
    name, message, drawing: body.drawing ?? null,
  });
  if (error) return NextResponse.json({ error: "db" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
```

---

### 3.b Live "Ghost Cursors" with Supabase Realtime

Use **Broadcast** for the high-frequency cursor positions and **Presence** for the ephemeral "who's here" list. Cursor data is transient — do **not** persist it to a table.

> Tip: Supabase ships a ready-made `realtime-cursor` UI block (`use-realtime-cursors.ts` + `cursor.tsx` + `realtime-cursors.tsx`) at https://supabase.com/ui/docs/nextjs/realtime-cursor — you can `npx shadcn add` it. Below is the hand-rolled version so you understand the moving parts.

**Channel + broadcast + presence (client hook):**
```ts
"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type CursorPayload = { id: string; x: number; y: number; name: string };

export function useGhostCursors(roomName: string, me: { id: string; name: string }) {
  const [cursors, setCursors] = useState<Record<string, CursorPayload>>({});
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const lastSent = useRef(0);

  useEffect(() => {
    const channel = supabase.channel(`cursors:${roomName}`, {
      config: {
        broadcast: { self: false },     // don't echo my own cursor back
        presence: { key: me.id },       // ephemeral "who's online"
      },
    });
    channelRef.current = channel;

    channel
      // receive others' cursor moves
      .on("broadcast", { event: "cursor" }, ({ payload }) => {
        const p = payload as CursorPayload;
        setCursors((prev) => ({ ...prev, [p.id]: p }));
      })
      // presence: drop cursors of users who leave
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        setCursors((prev) => {
          const next = { ...prev };
          for (const lp of leftPresences as any[]) delete next[lp.key ?? lp.id];
          return next;
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ id: me.id, name: me.name });
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, [roomName, me.id, me.name]);

  // throttled send: ~20 events/sec max (every 50ms)
  function onMouseMove(e: MouseEvent) {
    const now = performance.now();
    if (now - lastSent.current < 50) return;       // THROTTLE
    lastSent.current = now;
    channelRef.current?.send({
      type: "broadcast",
      event: "cursor",
      payload: { id: me.id, name: me.name, x: e.clientX, y: e.clientY } as CursorPayload,
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cursors; // render a little SVG/div per remote cursor
}
```

**Throttling cursor events — why & how:**
- Broadcast is the right primitive for >10 events/sec/user (cursors, typing, strokes). Still, cap your own send rate. Throttle to **~20 events/sec (every 50ms)** as above. Supabase's own component throttles to ~20/sec.
- For *smooth* rendering despite 50–80ms gaps, interpolate on the receiving side (e.g. the `perfect-cursors` library) — Supabase explicitly recommends this.
- **Rate limits:** Realtime enforces per-client message rate limits server-side; exceeding them yields system errors and requires backoff before rejoin. Throttling keeps you under the cap. (Free tier also has concurrent-connection / message quotas — fine for a personal site, watch it if it goes viral.)

**Ephemeral presence (who's here):**
```ts
// inside subscribe(): after track(), read merged state:
channel.on("presence", { event: "sync" }, () => {
  const state = channel.presenceState(); // { [presenceKey]: [{ id, name }, ...] }
  // e.g. setOnlineCount(Object.keys(state).length)
});
```
Presence state lives only in memory on the Realtime server; when a client disconnects, a `leave` fires and the state evaporates — exactly the "ghost cursor disappears when they leave" behavior. No DB writes.

**Realtime auth / keys:**
- Realtime uses the same **publishable/anon key** in `createClient` — safe to expose.
- For **public** broadcast (anyone in the room) the default works. If you ever switch to `private: true` channels, you must also add RLS-based authorization policies on `realtime.messages`; not needed for an open ghost-cursor toy.

Sources: https://supabase.com/docs/guides/realtime/broadcast , https://supabase.com/docs/guides/realtime/presence , https://supabase.com/ui/docs/nextjs/realtime-cursor , https://supabase.com/docs/guides/getting-started/api-keys , https://supabase.com/docs/guides/database/postgres/row-level-security

---

## Deprecations / current-API flags summary
- **Spotify Implicit Grant flow: removed (post 27 Nov 2025).** Use Authorization Code flow (server, client secret) — this doc's approach.
- **Spotify redirect URIs:** HTTPS only; `localhost` host banned; `127.0.0.1` loopback allowed for dev.
- **Next.js `images.domains`: deprecated** → use `images.remotePatterns`.
- **Next.js `next export` CLI command:** long removed; static export is `output: 'export'` config — which you delete when moving to Vercel.
- **Supabase API keys:** new `sb_publishable_*` / `sb_secret_*` format introduced (2025); legacy `anon`/`service_role` JWTs still function. Role names in RLS unchanged.
- **Supabase Realtime:** Broadcast can now also originate from the database ("Broadcast from Database"); binary broadcast payloads supported since `supabase-js` 2.91.0. For cursors, plain client-to-client WebSocket broadcast is what you want.
