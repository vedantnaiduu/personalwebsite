# Portfolio + Interactive Features + Y2K/Retro-Web Brief

Research date: 2026-06-15. Audience: a serious AI/SWE student who wants a portfolio with
personality and a tasteful retro-web flavor — without looking like a joke or like every
other AI-generated template.

---

## PART 1 — What makes an outstanding developer / AI-engineer portfolio in 2026

### The core job of the site
A recruiter spends well under 30 seconds on first contact. The site has to answer three
questions before they scroll: **Who are you? What can you build? How do I reach you?** The
data point that keeps recurring: recruiters skim resumes in ~10 seconds but engage **~80%
more** with GitHub projects that have runnable code or live demos. Deployed apps and live
demos beat titles and years-of-experience claims. So the entire site should funnel attention
toward *working things you can click*.

### Recommended section structure and ordering
Single-page, top-to-bottom, fast. Order matters — front-load proof.

1. **Hero / identity (above the fold).** Name, one-line positioning ("AI engineer building
   X"), and a real face or distinctive mark. One sentence of substance, not a "passionate
   detail-oriented professional" cliche. Include the primary CTA (resume, email, GitHub)
   right here.
2. **Selected projects (2–5, NOT a dump).** This is the heart of the site. Each project is a
   mini case study, not a card with a logo. (Format below.)
3. **About / story.** Short. Who you are, what you're into, what you're optimizing for next.
   This is where *personality* and the retro flavor can live without hurting credibility.
4. **Experience / résumé timeline.** Compact. Companies, roles, dates, one-line impact each.
   Link the downloadable PDF résumé here.
5. **Writing / now / extras (optional).** A blog, a "/now" page, or a uses page signals you
   think in public. Strong differentiator for engineer-peers.
6. **Contact + footer.** Email, GitHub, LinkedIn, X. Make the email copyable in one click.

Rule of thumb: someone should understand who you are, what you build, and why it mattered in
**under two minutes**.

### How to present projects so they land (the single biggest lever)
The most common mistake is describing **what you made** instead of **what it achieved**.

- Bad: "Built a mobile app with React Native."
- Good: "Built a RAG document-chat app; cut support-ticket resolution time 34%; serves 1.2k
  MAU on a $40/mo budget."

For each project include:
- **One-line outcome** with a number if at all possible (latency, accuracy delta, cost, users,
  $ saved). "Improved F1 by 22%" reads as production thinking.
- **Live demo link** (Streamlit/Gradio/Vercel) AND **GitHub link**. A clickable demo is the
  highest-signal asset on the whole site.
- **A short "under the hood" story** — the interesting technical decision, the failure you
  handled, the tradeoff. Engineers read this; it's what separates you from a template.
- **Stack chips** (concise), and ideally a small screenshot/gif or architecture diagram.

For an **AI-engineer specifically** in 2026, hiring managers scan for *production signals*:
how you handle failures, structure data, connect systems, monitor, and ship. Show the full
lifecycle (data → model/prompt → deploy → eval/monitor), not just a notebook. A RAG project
(e.g. PDF-chat) is the single most in-demand pattern; an agent/tool-use project and an eval
harness are strong companions. Avoid "I called the OpenAI API in a wrapper" as your headline
project — everyone has that.

### What makes recruiters vs engineer-peers respond
- **Recruiters** want: instant clarity, a face, obvious "what they do," a résumé link, no
  friction, mobile that works, fast load. They reward scannability.
- **Engineer-peers** want: the technical story, good code on GitHub, a clean live demo, a
  blog post that teaches something, evidence of taste (clean UI, fast site, no jank).
- The site has to serve both — clarity on the surface, depth one click down.

### Signal vs noise
- **Signal:** working demos, measurable outcomes, real code, a distinctive voice, a couple of
  thoughtful technical writeups, fast/accessible site, one tasteful memorable interaction.
- **Noise:** a wall of 15 tutorial clones, skill-percentage bars (90% JavaScript — meaningless),
  generic stock illustrations, buzzword salad, autoplaying audio, three carousels, an
  over-animated hero that delays content.

### Performance / accessibility expectations (these are pass/fail)
- **Load in under ~2 seconds** or hiring managers bounce. Target good Core Web Vitals
  (LCP < 2.5s, CLS near 0).
- **Mobile responsiveness is non-negotiable** — test the contact path on a phone.
- Keyboard-navigable, real focus states, semantic HTML, alt text, sufficient contrast
  (especially important when doing retro gradients/chrome — see Part 3 warnings).
- Respect `prefers-reduced-motion` for any animation/cursor effects.
- An accessible, fast site is itself a credibility signal for a SWE.

### The most common mistakes that make a portfolio feel generic or AI-generated
1. **Cliche copy.** "Passionate, detail-oriented, dedicated to customer success." Dead giveaway.
   Use your authentic voice; write like a person, not a LinkedIn summary.
2. **Describing outputs, not outcomes** (see above).
3. **Letting an AI builder pick everything** — the templates all converge on the same gradient-
   hero + 3-card layout. The tell is uniformity. Use AI to kill blank-page time, keep human
   judgment on selection, voice, and which projects to feature.
4. **Too many projects, none explained.** Curate ruthlessly: 2–5 strong, deeply-explained.
5. **No live demos / dead links.** A broken demo is worse than none.
6. **Slow, janky, or broken-on-mobile.** Instant disqualifier.
7. **Overstating your role** ("architected" a thing you tweaked). Engineers smell it.
8. **Generic stock imagery** that clashes with the brand.

---

## PART 2 — Memorable interactive portfolio features

Survey of options, with implementation reality (client-only vs needs backend/realtime) and a
note on what makes each delightful vs gimmicky.

| Feature | Implementation | Delight vs gimmick |
|---|---|---|
| **Live / ghost visitor cursors** | Needs realtime backend (WebSocket). Easiest path: **PartyKit "cursor-party"** (one script tag; server runs on Cloudflare Workers, you whitelist your domain) or **Liveblocks** (managed presence/cursors). | Magical when there *are* other visitors and lonely when there aren't. Best with a fallback (ghost/replay cursors) so a solo visitor still sees motion. Cursor chat (press `/`) is a charming add. |
| **Drawable guestbook / postcard wall** | Needs backend + DB. Canvas drawing client-side; persist strokes/images to **Supabase/Neon**; gate spam with OAuth (GitHub login) + Row-Level Security. | Among the most delightful — it's a creative gift visitors leave *you*. High personality, low cringe. Needs moderation thought. |
| **Music recommendation drop-box** | Backend + DB. Form → store track URL/note → display a wall. | Sweet, low-stakes, invites participation. Niche but on-brand for a music lover. |
| **Visitor counter / hit counter** | Tiny backend or a counter service (or edge KV). | Pure nostalgia. Delightful *as a retro motif*; meaningless as a metric. Style it as a 7-seg/odometer and it sings. |
| **"Now playing / watching" widget** | Depends on source. **Spotify**: needs a serverless proxy (Vercel/Netlify) to hide tokens; polls Web API. **Discord presence**: use **Lanyard** (REST + WebSocket, real-time, no infra to deploy — just join their Discord) which can expose Spotify, current game, VS Code via RPC, etc. **Steam/Letterboxd**: RSS/script. | Genuinely delightful because it's *live and personal* — proof a real human is behind the site. Lanyard is the lowest-effort path to a real-time widget. |
| **Mini-game / 3D playground** | Client-only (WebGL/Three.js/physics). | The Bruno Simon move — huge wow, huge effort, real perf/accessibility cost. Reserve for when the game *is* the brand. Overkill for most. |
| **Easter eggs (Konami code, terminal, command palette)** | Client-only JS. Konami libs exist (konami-js); a `⌘K` command palette is a few hours. | Cheap, high-charm, zero backend. The Konami code unlocking a theme or a secret page is a classic engineer wink. A keyboard command palette doubles as real navigation *and* an easter egg — peers love it. |

### Recommendation: pick ONE "live human" feature + ONE "low-cost charm" feature

**Primary pick — a real-time "now playing / status" widget via Lanyard.**
Rationale: It's the strongest *signal that a real person made this* (the antidote to "AI-
generated"), it updates live, it ties straight into the personality/About section, and Lanyard
needs essentially no backend you have to operate (REST + WebSocket, optional `use-lanyard`
React hook). It pairs perfectly with the retro aesthetic styled as a little "system tray /
status window." If Discord isn't your hub, a Spotify-via-serverless-proxy variant achieves the
same effect.

**Secondary pick — a `⌘K` command palette that doubles as an easter-egg surface.**
Rationale: Pure client-side, ships in an afternoon, reads as *taste and craft* to engineers,
and is genuinely useful navigation. Hide a Konami code inside it that flips a "Y2K mode" /
CRT theme — that single toggle lets you have personality without forcing the retro look on a
recruiter who just wants the résumé.

**If you want exactly one social feature instead:** a **drawable guestbook** (Supabase + canvas
+ GitHub-login) is the most memorable, most "indie-web," and most likely to make someone
screenshot your site. It costs a small backend and moderation, but the payoff in personality is
the highest of any feature here. Skip live cursors unless you expect real concurrent traffic —
empty rooms feel sad.

What keeps any of these *delightful not gimmicky*: it must be (a) fast / non-blocking,
(b) discoverable but never in the way of the résumé path, (c) honest/live rather than fake, and
(d) on-brand with who you actually are.

---

## PART 3 — The Y2K / retro-web revival, made professional

Three adjacent looks worth distinguishing:
- **Y2K / early-2000s web (2000–2004):** chrome, metallics, lens flares, beveled glossy
  buttons, blobby gradients, pixel art, hit counters, marquees, star cursors, webrings, 88x31
  buttons, window-chrome (Win98/XP) motifs, CRT/scanline/VHS glitch.
- **Frutiger Aero (2004–2013):** the *clean, optimistic* sibling — glossy aqua glass, water
  droplets, bubbles, bokeh, auroras, blue skies + nature, skeuomorphic gloss, Myriad/Frutiger
  type. This is the most "professional-friendly" of the retro looks.
- **Tasteful brutalism:** raw HTML energy — system fonts, hard borders, monospace, high
  contrast, visible structure, near-zero ornament. Reads as confident and technical.

### Concrete visual hallmarks (the vocabulary to draw from)
Beveled/glossy buttons; chrome/metallic text; multi-stop linear gradients; bloom/glow; lens
flares + bokeh; aurora gradients; glass/transparency (frosted, refractive); water droplets &
bubbles (Aero); pixel art & dithering; CRT scanlines & VHS chromatic aberration; marquees;
hit counters; webrings & 88x31 buttons; star/sparkle cursors; window-chrome (title bars,
min/max/close, status bars); odometer counters; tiled backgrounds; "under construction" gifs
(use ironically, sparingly).

### Typography
- **Y2K display:** chrome/liquid-distortion display fonts for the *logo/name only* — never body.
- **Frutiger Aero:** Frutiger / Myriad / Segoe-style humanist sans — clean, neutral, friendly.
  This is the secret to looking professional: a calm humanist sans does 90% of the legitimizing.
- **Brutalist/technical:** a good monospace (Berkeley Mono, JetBrains Mono, IBM Plex Mono) for
  UI chrome, labels, and "system" text reads as engineer-credible and pairs great with retro.
- **Pixel fonts** (e.g. for a counter or window title) in *tiny doses only*.
- Pairing that works: **one chrome/display face for the name + one humanist or monospace for
  everything else.** Two fonts max. Body text must be a normal, readable sans/mono.

### Color palettes (hex)
- **Frutiger Aero blues:** `#4577ea` `#38abe4` `#69cfff` `#85cfee` `#7f9dda`
- **Aqua / glass:** `#0687db` `#7aeafe` `#ffffff` `#ffff26` `#fc720f`
- **Aero greens (nature accent):** `#6b8f25` `#9fe11d` `#ccff7c` `#f1ffcd`
- **Deep tech blues (chrome-friendly base):** `#003c78` `#0050a0` `#0064b4`
- **Y2K pop accents (use 5–10% only):** baby blue + hot pink/magenta + acid green + silver.
- **Chrome/silver gradient (for metallic text):** `#999 → #fff → #ccc → #ddd → #ccc → #fff →
  #999` at 45deg.

### Two concrete, professional design directions

**Direction A — "Aqua Terminal" (recommended).**
A calm Frutiger-Aero base (sky-to-aqua gradient background, white frosted-glass cards, soft
bloom) for credibility, with a single retro signature: window-chrome framing for project cards
("title bar" + min/max/close dots) and a monospace "system" font for labels and the now-playing
status widget. Name rendered once in subtle chrome. Glass + humanist sans = adult and modern;
the window chrome + mono = unmistakably "computer person." Reads professional first, playful on
inspection. Pairs perfectly with the Lanyard status widget styled as a system-tray panel and a
`⌘K` palette that flips a CRT/"Y2K mode."

**Direction B — "Chrome Brutalist."**
Near-monochrome, high-contrast, hard borders, monospace everywhere, a single chrome/metallic
treatment on the name, an odometer-style visitor counter in a corner, scanline overlay at very
low opacity available behind a toggle. Confident, fast, very engineer-coded. Lower risk of
kitsch because there's almost no ornament — the retro is in the *details*, not the surface.

### Metallic chrome text — the actual recipe
```css
.chrome {
  background: linear-gradient(45deg,#999 5%,#fff 10%,#ccc 30%,#ddd 50%,#ccc 70%,#fff 80%,#999 95%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(255,255,255,.5);
}
```
Use it on the name/logo only. Render metallic UI accents (progress bars, badges) as **SVG, not
raster**, so they stay crisp.

### Do's and don'ts (how to stay intentional, not kitschy)
**Do**
- Keep **~90% neutral/calm space**; let retro accents be the 10%.
- Use effects to build **hierarchy and depth** (a subtle outer glow to lift a card), not decoration.
- Keep glitch/scanline effects **subtle and controlled** — think ≤5% opacity, not constant.
- Pick **one signature motif** (window chrome, OR chrome text, OR a counter) and commit; don't stack all of them.
- Anchor everything with a **clean humanist sans / good monospace** for readability.
- Make retro **opt-in** where possible (a "Y2K mode" toggle) so recruiters get a clean default.
- Render metallic/iridescent surfaces as **vectors**; lean on **gradients-as-light**, building the background atmosphere first.
- Respect `prefers-reduced-motion`; ensure contrast survives the gradients (test the chrome text for legibility — often it shouldn't carry real content).

**Don't**
- No flashing marquees, autoplay audio, three cursors, or constant glitch — that's a headache, not retro-futurism.
- Don't use chrome/distortion fonts for body or long copy (legibility + a11y death).
- Don't stack every motif at once (chrome + bevels + scanlines + bubbles + counters = clutter).
- No Papyrus/Comic Sans, no literal "under construction" unless clearly an in-joke.
- Don't let aesthetics slow the load or break mobile — the look must survive the perf bar in Part 1.
- Don't make the gimmick the first thing a recruiter must get past to find the résumé.

---

## Curated reference list (URLs + why each is worth a look)

**Portfolio craft / gold-standard developer sites**
1. https://brittanychiang.com — the clean, content-rich single-page gold standard; concise project + stack + live/code links.
2. https://www.joshwcomeau.com/effective-portfolio/ — the most opinionated guide: 2–5 projects, "tour guide" case studies, copy that sells, serve both HR and engineers.
3. https://bruno-simon.com — Bruno Simon's drivable 3D WebGL portfolio with hidden easter eggs; the canonical "wow" portfolio (and a cautionary tale on effort/perf).
4. https://aladinakkari.ca — retro Y2K Windows-interface portfolio with VHS/glitch, working MP3 player, hidden easter eggs; great example of retro done as a cohesive system.
5. https://curious.page/blog/best-personal-website-examples-developers — 2026 roundup of strong developer personal sites for structure ideas.
6. https://portfoliostudio.dev/blog/best-developer-portfolio-examples — curated dev portfolio examples with commentary.

**Interactive features (implementation)**
7. https://blog.partykit.io/posts/cursor-party — multiplayer ghost cursors + cursor chat in one script tag (PartyKit / Cloudflare).
8. https://liveblocks.io/blog/how-to-animate-multiplayer-cursors — how to make realtime cursors actually feel smooth.
9. https://github.com/Phineas/lanyard — expose your live Discord presence (Spotify, game, VS Code) via REST + WebSocket; the easy "now playing."
10. https://github.com/alii/use-lanyard — React hook for Lanyard; drop-in for the status widget.
11. https://blog.alexkates.dev/how-i-built-a-guestbook-page-using-supabase-and-nextjs — concrete guestbook build (Supabase + Next.js, RLS, GitHub auth).
12. https://dev.to/basskibo/from-portfolio-widget-to-npm-package-building-a-spotify-now-playing-card-13p2 — Spotify now-playing card with a serverless proxy pattern.
13. https://github.com/georgemandis/konami-js — drop-in Konami-code easter egg (keyboard + touch gestures).

**Y2K / Frutiger Aero / retro aesthetic**
14. https://www.kittl.com/blogs/frutiger-aero-aesthetic-stl — clearest breakdown of Frutiger Aero hallmarks and why it's resurging.
15. https://webflow.com/blog/y2k-aesthetic — Y2K-for-web with the dos/don'ts (restraint, 90% neutral space, SVG metallics, ≤5% glitch).
16. https://ibelick.com/blog/creating-metallic-effect-with-css — exact CSS recipe for chrome/metallic text and buttons.
17. https://www.color-hex.com/color-palette/1061613 (Aero blues) and https://www.color-hex.com/color-palette/1050336 (Frutiger Aqua) — ready-to-copy palettes.
18. https://tuffgong.nekoweb.org/webring-list.html — 2025 webring directory; window into the indie-web revival (guestbooks, hit counters, 88x31 buttons) for authentic motif sourcing.

**Bonus — brutalist references**
- https://www.wix.com/blog/brutalist-websites and https://blog.hubspot.com/website/brutalist-website-design — tasteful brutalist examples (Kurt Champion's card-toggle "Work / About / Fun Stuff" layout is a clean idea worth stealing).

---

## TL;DR recommendation for this person
- **Structure:** single-page — Hero → 2–5 deep project case studies (outcomes + live demo + GitHub + the technical story) → short About with voice → compact experience → contact. Optional `/now` or blog as a peer-signal.
- **AI-engineer angle:** lead with a RAG project and one agent/eval project; show the full lifecycle and real numbers; every project has a clickable demo.
- **Interactive:** a live **Lanyard "now playing/status"** widget (real-human signal, ~no backend) + a **⌘K command palette** that hides a Konami "Y2K mode" toggle.
- **Aesthetic:** "**Aqua Terminal**" — Frutiger-Aero glass base + humanist/monospace type for credibility, with window-chrome project cards and a single chrome-text logo as the retro signature. Retro is opt-in via the toggle. One motif, 90% calm space, SVG metallics, subtle effects, perf and a11y intact.
