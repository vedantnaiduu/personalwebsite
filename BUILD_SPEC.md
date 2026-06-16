# BUILD_SPEC — Vedant Naidu Portfolio ("Aqua Terminal")

This is the single source of truth for the rebuild. Every build task must conform to it.
Derived from research in `research/01-portfolio-and-y2k.md` and `research/03-technical-setup.md`.

---

## 0. Project at a glance

- **Owner:** Vedant Naidu — CS student @ UMass Amherst (BS CS, expected 2027), AI/SWE.
- **One-liner positioning:** "AI engineer building agentic & RAG systems that ship to real users."
- **Goal:** A single-page portfolio that is professional-first, Y2K/Frutiger-Aero in flavor, fast,
  accessible, and unmistakably *him* (pickleball, house music, festivals, TV shows / Suits).
- **Stack:** Next.js 14 App Router + TypeScript + Tailwind + framer-motion. Deploy: **Vercel**.
  Backend: **Supabase** (postcard wall). Live status: **Spotify Web API**.
- **Hard rule:** the site must build and run **with zero secrets configured** — every integration
  degrades gracefully (Spotify → "offline" sample; guestbook → read-only sample postcards + a
  friendly "not configured" notice). Never crash a render because an env var is missing.

---

## 1. Aesthetic: "Aqua Terminal" (Frutiger Aero base + one retro signature)

Professional 90% of the time; retro is the 10% accent. **One** committed retro motif: **window-chrome
framing** (title bar + min/max/close dots) on cards/panels, plus monospace "system" labels and a
single chrome-text logo. Retro maximalism ("Y2K mode") is **opt-in** (Konami code / ⌘K toggle).

### Palette (CSS variables)
```
--aero-sky:      #69cfff   /* light aqua sky */
--aero-blue:     #38abe4   /* mid aqua */
--aero-deep:     #0050a0   /* deep tech blue (text-on-glass, accents) */
--aero-ink:      #062a4a   /* near-black navy for body text */
--aero-green:    #9fe11d   /* nature accent, use sparingly */
--aero-lime:     #ccff7c
--glass-white:   rgba(255,255,255,0.55)
--glass-border:  rgba(255,255,255,0.7)
--y2k-magenta:   #ff3df0   /* Y2K-mode pop accent only (5–10%) */
--y2k-acid:      #c6ff00
```
Default background = a soft sky→aqua vertical gradient with subtle bokeh/bloom blobs (SVG/CSS,
reduced-motion aware). Cards = frosted glass (`backdrop-blur`, translucent white, soft inner/outer
glow, 1px light border, gentle radius ~10px).

### Typography (2 families + 1 display)
- **Humanist sans (all real text/body/headings):** Inter (already loaded). Clean = credible.
- **Monospace (UI chrome, labels, "system" text, window titles, status widget):** JetBrains Mono.
- **Display/logo only:** chrome-text effect via CSS (recipe below) on the name. Optional pixel font
  for tiny window-title flourishes only.
- Two fonts max for content. Never chrome/pixel fonts for body.

### Chrome text recipe (logo/name only)
```css
.chrome-text {
  background: linear-gradient(180deg,#0a3a66 0%,#2f7fb8 18%,#bfe7ff 40%,#ffffff 50%,#bfe7ff 60%,#2f7fb8 82%,#0a3a66 100%);
  -webkit-background-clip: text; background-clip: text;
  color: transparent; -webkit-text-fill-color: transparent;
  text-shadow: 0 1px 1px rgba(255,255,255,.6);
}
```
(Aqua-tinted chrome to match the palette; classic silver `#999→#fff→#ccc` is an acceptable alt.)

### Window-chrome card (the signature motif)
A panel with a top "title bar": left = three dots (close=red `#ff5f57`, min=amber `#febc2e`,
max=green `#28c840`) or a small aqua gloss; center/left = a mono window title; body below in glass.
Use for project cards, the about "readme" panel, the status widget, and the guestbook window.

### Effects & a11y (non-negotiable)
- Subtle only: glows/bloom for depth, scanline/CRT ≤5% opacity and **only in Y2K mode**.
- Respect `prefers-reduced-motion`: disable parallax/bokeh motion, cursor effects, autoplay.
- Keyboard navigable, visible focus rings, semantic HTML, alt text, contrast AA on glass
  (body text uses `--aero-ink`, not low-contrast aqua).
- Mobile-first responsive. Target LCP < 2.5s, CLS ~0, load < 2s.

### Y2K mode (opt-in retro maximalism)
Toggled by Konami code or ⌘K action; persisted in `localStorage`; sets `data-y2k="on"` on `<html>`.
When on: turns up the retro — visible scanline overlay (≤6%), starfield/sparkle cursor trail
(reduced-motion off only), bolder gradients, a tiled/`88x31`-style badge row + odometer hit counter
in the footer, chrome turned up. Default (off) = the calm professional Aqua look.

---

## 2. Structure (single-page, anchor-navigated)

Order front-loads proof (per research):
1. **Hero** — chrome-text name, one-line positioning, CTAs (View résumé PDF, copy email, GitHub,
   LinkedIn), and a compact Spotify "now playing" status chip. Aero atmosphere background.
2. **Selected Projects** — 5 window-chrome case-study cards (details §3).
3. **Experience** — compact timeline, 2 roles, outcome bullets (details §3).
4. **About** — short, voice-forward; personality (pickleball, house music, festivals, shows/Suits).
5. **Skills** — grouped chips (Languages / Frameworks / Tools&Infra / AI&ML).
6. **Postcard Wall (guestbook)** — interactive, draw + sign (details §4).
7. **Contact / Footer** — email (one-click copy), GitHub, LinkedIn, résumé; (Y2K mode: hit counter +
   88x31 badges).

Sticky top nav: anchor links to sections + a "Y2K" toggle + (⌘K hint). Smooth scroll, scroll-spy.
A `⌘K` command palette provides navigation + actions everywhere (details §4).

> Note: the existing app currently uses separate routes (/about, /projects, /experience, /contact).
> The rebuild consolidates to a single scroll page with `#anchors`. Remove the old route folders'
> page content (or convert to redirects to `#anchor`). Keep `app/api/*` for new routes.

---

## 3. CONTENT — exact, authoritative (resume is source of truth)

> The old site had WRONG GitHub links and mismatched images. Use EXACTLY the links below.
> Put this content in `lib/site-data.ts` as typed exports. Do not invent metrics.

### Identity
- Name: **Vedant Naidu**
- Email: **vedantsnaidu@gmail.com** (one-click copy)
- Phone: 646-335-2994 (optional; do not feature prominently)
- GitHub: **https://github.com/vedantnaiduu**
- LinkedIn: **https://linkedin.com/in/vedant-naidu/**
- Location vibe: UMass Amherst / Boston / Bay Area
- Résumé PDF: link to `/Vedant_Naidu_Resume.pdf` in `/public` (placeholder ok if absent; the user
  will drop the PDF in — see SETUP).

### Education
- **University of Massachusetts Amherst** — BS Computer Science — *Expected 2027* — Amherst, MA
- Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming, Computer System
  Principles, Computer Architecture, Computational Statistics, Human-Centered Design

### Experience
**1. Artificial Intelligence Intern — Commonwealth of Massachusetts (DPH/EOHHS)** — Boston, MA —
*Jan 2026 – Present*
- Shipped a production RAG chatbot adopted by **351 Massachusetts health departments** that cut
  regulatory lookup from **8+ minutes to under 30 seconds**, handling **500+ inspector queries/week**
  with zero hallucinated citations.
- Engineered a hybrid **BM25 + KNN** retrieval pipeline over **14 CMR regulatory PDFs** on **Amazon
  Bedrock** + **OpenSearch Serverless**, validated against a curated LLM eval benchmark at **94%
  retrieval precision**, with inline-cited responses via the **Claude (Anthropic) API**.
- Provisioned full AWS infra via **CDK across 7 stacks** (VPC isolation, Bedrock Knowledge Bases,
  private API Gateway, DynamoDB interaction logging, Amplify SSR frontend) with **99.9% uptime**.

**2. Computational Biology Researcher — Stanford University (Optic Nerve Regeneration Lab)** —
Stanford, CA / Remote — *Sep 2025 – Dec 2025*
- Built a Python automation pipeline processing **3,000+ protein-interaction records**, surfacing
  **12 high-confidence wet-lab candidates** while **cutting the experimental search space by 99.6%**.
- Integrated graph-centrality signals with sequence-embedding similarity into a unified ranking
  framework that eliminated **95% of low-signal candidates** before costly wet-lab cycles.
- Automated the full scoring + data-integration workflow into a reproducible pipeline that re-runs
  complete candidate selection on any new database snapshot in **under 10 minutes**.

### Projects (5) — TITLE · GITHUB (exact) · AWARD · OUTCOME · UNDER-THE-HOOD · STACK
Each card shows: title, award badge (if any), a one-line **outcome**, an expandable **"under the
hood"** story, stack chips, and **GitHub link** (+ demo link where present). Lead ordering puts the
RAG/agent work first (AI-engineer signal).

**P1 — Voice Maintenance Agent** · GitHub: **https://github.com/RavjeetChahal/Resi** ·
Award: **Best Use of AI, HackUMass**
- Outcome: Agentic voice system — students call a number, describe an issue in plain speech, an LLM
  agent classifies urgency and autonomously routes each ticket to Maintenance or RA teams;
  generated a **100+ person waitlist** after live demos.
- Under the hood: Firebase real-time dashboard surfacing live ticket-position updates without
  polling; targeted a **40% reduction in staff processing time** in a production-deployed
  cross-platform app.
- Stack: LLM agent, speech/voice, Firebase, real-time, cross-platform.

**P2 — Real-Time Social Discovery Agent** · GitHub: **https://github.com/TCYTseven/serieshax**
- Outcome: Multi-step agentic SMS automation tying live Reddit city-subreddit sentiment, Polymarket
  prediction-market odds, and Supabase venue data into one LLM context window, routing replies
  across **7 intent-classified response types** for personalized recommendations.
- Under the hood: end-to-end latency **under 500 ms** via concurrent async context assembly,
  in-memory caching of Polymarket/Reddit responses, and per-user rate limiting on a **Kafka**
  consumer group.
- Stack: LLM agents, Kafka, Supabase, Reddit, Polymarket, async.

**P3 — Elderly Health Monitoring Agent** · GitHub: **https://github.com/RavjeetChahal/RetroCare** ·
Award: **Best Healthcare Hack, HackRPI**
- Outcome: Agentic platform that autonomously calls elderly patients on a schedule, holds a natural
  multi-turn conversation to track medication adherence + mood, and writes structured results to
  Supabase with **98% call-completion reliability**.
- Under the hood: detects voice-health deterioration via per-call cosine similarity against a
  per-patient healthy-voice embedding, alerting caregivers within **10 seconds** when similarity
  crosses a **0.40** emergency threshold.
- Stack: voice agents, embeddings, Supabase, scheduling.

**P4 — Jestify** · GitHub: **https://github.com/Nakul-Rajpal/Jestify**
- Outcome: AI platform where students upload course notes/slides, pick a persona (e.g., SpongeBob),
  and receive a fully animated explainer video of that character teaching the concept in its own
  voice and personality.
- Under the hood: multi-step generation pipeline — **Claude (Anthropic) API** writes
  character-voiced scripts, **ManimCE** renders per-scene animations, **Qwen3-TTS** synthesizes
  audio, **FFmpeg** composites the final video; every job dispatched async via a **Celery/Redis**
  worker queue.
- Stack: Claude API, ManimCE, Qwen3-TTS, FFmpeg, Celery, Redis.

**P5 — Autonomous Infrastructure Detection** · GitHub:
**https://github.com/Nakul-Rajpal/HackBrown-Kavi**
- Outcome: Real-time drone road-inspection pipeline (**Meta SAM3 + Gemini Vision API**) classifying
  pavement damage by severity at **under 100 ms inference**, fusing DJI SRT telemetry with per-frame
  detections and surfacing reverse-geocoded hazards on a Next.js/Leaflet dashboard at **sub-200 ms
  latency**.
- Stack: SAM3, Gemini Vision, Next.js, Leaflet, geospatial.

### Skills (grouped, from resume)
- **Languages:** Python, TypeScript, JavaScript, Java, C++, C, SQL, HTML/CSS
- **Frameworks:** React, Next.js, Node.js/Express, FastAPI, React Native, Tailwind CSS, LangChain,
  LangGraph
- **Tools & Infra:** AWS (CDK, Lambda, Bedrock, OpenSearch, DynamoDB, Amplify, S3), PostgreSQL,
  Supabase, Firebase, MongoDB, Docker, Git, GitHub Actions, Kafka
- **AI/ML:** LLMs (OpenAI & Anthropic APIs), Agentic Workflows, Multi-Agent Systems, RAG Pipelines,
  Prompt Engineering, LLM Evals, Amazon Bedrock, Computer Vision, Whisper, scikit-learn

### About / voice (write authentically — NO "passionate, detail-oriented" clichés)
Personality facts to weave in naturally (don't bullet-dump):
- Loves **building things that ship** to real users (RAG chatbot used by 351 health depts, hackathon
  wins). Optimizing next for: agentic systems + AI that augments how people work.
- **Pickleball** (plays regularly), gym/PRs.
- **House music** — festivals, live shows. (Tie to the Spotify widget.)
- Loves **TV shows** — currently watching **Suits**.
- Tone: confident, a little playful, concrete. First person. Short.

---

## 4. Interactive features (the personality layer)

### 4.1 Spotify "Now Playing" (PRIMARY live signal — user chose this)
- Route: `app/api/now-playing/route.ts` — refresh-token → access-token, GET currently-playing,
  fall back to recently-played, final fallback `{isPlaying:false}`. CDN cache header
  `public, s-maxage=30, stale-while-revalidate=60`. Token fetch `cache:'no-store'`.
  (Use the exact implementation in `research/03-technical-setup.md` §1.6.)
- Scopes: `user-read-currently-playing`, `user-read-recently-played`.
- Env (server-only): `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.
- Client: `NowPlaying` component styled as a **system-tray / status window** (mono title bar
  "now_playing.exe", album art, scrolling marquee of "♪ track — artist", green "▶ playing" / grey
  "⏸ last played" indicator, links to `songUrl`). Poll via SWR every 30s.
- **Unconfigured fallback:** if any Spotify env var is missing, the route returns a friendly sample
  (`isPlaying:false`, title hidden) and the widget shows "music offline — house mix loading…" with a
  link to his Spotify profile. Never error.
- Album art is external (`i.scdn.co`) → add to `images.remotePatterns`, or just use `<img>`.

### 4.2 Postcard Wall / Guestbook (the social interactive feature)
Satisfies the user's "drawable postcard / squiggly line" idea. Visitors draw a tiny doodle + leave a
name + short message; it posts to a wall of postcards.
- **Canvas doodle:** small (~320×200) drawing pad, pointer/touch, a couple of pen colors, clear
  button. Export to a compact PNG **data URL** (cap ~200 KB).
- **Form:** name (≤40), message (≤500), the drawing. Honeypot field + localStorage cooldown
  (client defense-in-depth).
- **Submit route:** `app/api/guestbook/route.ts` — POST, read IP from `x-forwarded-for`, basic
  rate-limit (in-memory LRU fallback if Upstash not configured; if `@upstash/ratelimit` envs present
  use sliding window 3/60s), validate sizes, insert via Supabase. Prefer service-role insert when
  `SUPABASE_SERVICE_ROLE_KEY` is set; else anon insert.
- **Read:** GET recent 100 via Supabase anon client, render as a wall of window-chrome "postcard"
  tiles (drawing on front, name + message + date). Newest first.
- **Schema:** commit `supabase/schema.sql` exactly per `research/03-technical-setup.md` §3.a
  (table `public.guestbook`, RLS: anon SELECT using(true) + constrained anon INSERT, no update/delete).
- **Unconfigured fallback:** if Supabase envs missing, show ~3 hardcoded sample postcards + a
  subtle "guestbook goes live once Supabase is connected" note; the form disables submit with a
  tooltip. Never crash.
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, optional
  `SUPABASE_SERVICE_ROLE_KEY`, optional `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.

### 4.3 ⌘K Command Palette + Konami "Y2K mode" (client-only charm)
- `⌘K` / `Ctrl+K` opens a command palette: jump to each section, copy email, open résumé, open
  GitHub/LinkedIn/Spotify, and **Toggle Y2K mode**. Keyboard-first, accessible (focus trap, esc).
- **Konami code** (↑↑↓↓←→←→ B A) anywhere toggles Y2K mode with a little flourish. Persist in
  localStorage; respect reduced-motion (skip cursor/starfield effects).
- Y2K mode behavior per §1.

### 4.4 (Stretch, NOT in initial build) Ghost cursors
Documented but deferred — research warns empty rooms feel sad. We may add Supabase Realtime
Broadcast/Presence later (code in `research/03-technical-setup.md` §3.b). A lightweight "👀 N here"
presence counter is an acceptable smaller nod if cheap, but do not block the build on it.

---

## 5. Architecture / files

```
app/
  layout.tsx          # fonts, providers (Y2KProvider, palette mount), atmosphere bg, ⌘K mount, footer
  page.tsx            # single-page: assembles all sections in order
  globals.css         # design system tokens, glass utils, chrome text, window chrome, y2k-mode styles
  api/
    now-playing/route.ts
    guestbook/route.ts
components/
  layout/  Nav.tsx, Footer.tsx, AtmosphereBackground.tsx, CommandPalette.tsx
  sections/ Hero.tsx, Projects.tsx, Experience.tsx, About.tsx, Skills.tsx, PostcardWall.tsx, Contact.tsx
  ui/      WindowFrame.tsx, GlassCard.tsx, Chip.tsx, NowPlaying.tsx, PostcardCanvas.tsx, Postcard.tsx
  providers/ Y2KProvider.tsx (context + Konami hook + localStorage)
lib/
  site-data.ts        # all content from §3, typed
  supabase/client.ts  # browser anon client (guarded if envs absent)
  spotify.ts          # token/now-playing helpers (used by route)
  utils.ts            # cn(), etc (exists)
supabase/schema.sql   # guestbook table + RLS
.env.example          # every env var documented
SETUP.md              # how to wire Vercel + Supabase + Spotify + résumé PDF
```
- Keep Next 14.2, framer-motion. Add deps: `@supabase/supabase-js`, `swr`. Optional (guarded):
  `@upstash/ratelimit`, `@upstash/redis`.
- Remove `.github/workflows/*` GH-Pages deploy (we deploy on Vercel). Add a short note in SETUP.
- `next.config.js`: remove `output:'export'`, `basePath`, `assetPrefix`, `images.unoptimized`; add
  `images.remotePatterns` for `i.scdn.co` (and supabase storage host if used).

## 6. Env vars (.env.example)
```
# Spotify (server-only; see SETUP.md §Spotify)
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
# Supabase (URL + anon are public/safe with RLS; service role is server-only)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
# Optional rate limiting for guestbook
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## 7. Definition of done
- `npm run build` passes clean (no type errors), `npm run lint` clean.
- Runs at `localhost:3000` with NO env vars set (all fallbacks active, nothing crashes).
- All 5 projects render with the CORRECT GitHub links from §3; all metrics match resume.
- Mobile responsive; keyboard navigable; `prefers-reduced-motion` respected; AA contrast on glass.
- Aqua Terminal look by default; Y2K mode toggles via ⌘K and Konami.
- SETUP.md explains every integration + Vercel deploy + résumé PDF drop-in.
```
