# DESIGN_SPEC_V2 — Editorial-Dark redesign

Supersedes the "Aqua Terminal" look. Goal: a **premium, minimal, editorial** portfolio in the
lineage of seyityilmaz.com / joseph.cv / hasque.com. Content stays (`lib/site-data.ts`); this is a
visual + structural redesign. Detailed research: `research/04-hid-minimalism.md`,
`research/05-reference-teardowns.md`, `research/06-motion-implementation.md` — consult for exact
code sketches and token ramps.

## North star (do every one of these)
- **Confidence through restraint.** ~90% calm space; hierarchy from size/weight/spacing/value —
  NEVER from borders, boxes, glass, or shadows. Kill all glassmorphism/chrome/gradients.
- **Escape Inter** (the #1 AI tell). Use the type system below.
- **Near-mono dark + ONE accent at <5%.** True AA contrast on body text. No purple→blue gradients.
- **Work is a text-forward asymmetric list**, not a uniform card grid.
- **Motion is information**: short, transform/opacity only, ease-out, reduced-motion safe.
- Left-anchored, asymmetric layout. 0px radius (editorial) except the product visual.

## Type system (self-host via next/font where possible)
- **Display + Body — General Sans** (Fontshare). Weights 400/500/600/700. The workhorse.
- **Editorial accent — Fraunces** (Google, variable, italic, opsz). Used ONLY for a single
  serif-italic word in the hero statement (and at most one other moment). Never body.
- **Mono labels — Geist Mono** (or IBM Plex Mono). Uppercase, tracked +0.06–0.09em, ~11–12px,
  muted color. For ALL metadata: eyebrows, years, stack, section labels, footer version.
- Base 16–18px; modular scale ~1.25–1.333; hero via `clamp()`. Body line-height 1.5–1.6, measure
  ≤66ch. Display line-height 1.0–1.1, tracking −0.02em. Max 2–3 weights in use at once.

## Color tokens (dark)
```
--bg:       #0A0A0B   /* near-black base */
--surface:  #141417   /* elevated panels via VALUE step, not borders */
--surface-2:#1B1B1F
--text:     #ECECEE   /* primary (not pure white) */
--muted:    #8A8A93   /* secondary/labels */
--faint:    #55555C   /* tertiary */
--line:     rgba(255,255,255,0.08)  /* hairline, used sparingly */
--accent:   #FF5D3B   /* warm ember — <5% of surface: the italic word, link hover, focus ring */
--accent-weak: rgba(255,93,59,0.14)
```
Body text must hit WCAG AA (≥4.5:1). Visible `:focus-visible` ring in accent.

## Spacing & grid
- 8pt scale: 4 8 12 16 24 32 48 64 96 128 160. 4pt baseline for type.
- Max content width ~1240px; 12-col mental model, 24px gutters. Left-anchored; allow asymmetry
  (e.g., hero text col + offset visual; work rows full-bleed within max-width).
- Section vertical padding: 120–160px desktop, 72–96px mobile. Internal spacing < external spacing.
- One consistent radius: 0px for layout; 10px only for the product/preview visual + images.

## Motion (use `motion`/framer-motion + Lenis; consult research/06 for code)
- Easing: entrances `cubic-bezier(0.16,1,0.3,1)` (expoOut); text `cubic-bezier(0.25,1,0.5,1)`.
- Durations: interactions 150–250ms; reveals 400–600ms. Animate only transform/opacity.
- Hero: **masked line reveal** (overflow-hidden + inner translateY 110%→0), split by LINE, staggered
  0.08–0.12s; metadata + visual fade-up after.
- Scroll: **Lenis** smooth scroll (lerp ~0.1; disable on reduced-motion/touch). Section content
  reveals via `whileInView` (once, Y+opacity only, small margin).
- Micro: link underline-wipe (`after:scale-x` origin-left); ONE magnetic button (résumé);
  **project rows reveal a cursor-following thumbnail on hover** (the seyit/joseph signature).
- GLOBAL reduced-motion kill-switch: disable Lenis, entrance/scroll anims, cursor effects.

## Page structure (single page, left-anchored)
Minimal top bar: wordmark left (`vedant naidu`, lowercase, General Sans medium) · right = tiny text
links (work · about · guestbook · résumé↗). No glass. Hairline or nothing under it.

1) **HERO (Editorial Statement).**
   - Statement (huge grotesk, 2 lines): **"I build AI systems that *actually* ship."**
     — "actually" in Fraunces italic (accent color). (Tune wording for truth + punch.)
   - One quiet sub-line (muted): e.g. "Agentic & RAG systems, shipped to real users — from a
     chatbot used by 351 MA health departments to hackathon-winning voice agents."
   - Metadata rows (mono, muted): `NOW — AI Engineer Intern · MA Dept. of Public Health` ·
     `BASED — Amherst / Boston` · links row (GitHub, LinkedIn, Email-copy, Résumé↗).
   - **Signature visual (right/offset): a crafted "system readout" panel** — an in-code, crisp,
     monospace faux agent/RAG trace: a query → retrieval hits → an inline-cited answer with a
     `precision 94%` / `<30s` tag. Dark surface, value-step elevation, ember accent on one token.
     This is authentic to his work and the page's memorable element. NOT a stock image / 3D blob.
2) **SELECTED WORK.** Asymmetric LIST (no uniform cards, no 01/02 numbering — not a sequence).
   Each row (full width within max-width): project name (large grotesk) · year/context · stack
   (mono) · one-line **outcome with the metric** · award as a small mono tag. **Hover reveals a
   cursor-following preview thumbnail**; row text lifts; siblings dim slightly. Whole row links to
   GitHub (exact URLs from site-data). 5 projects.
3) **EXPERIENCE.** Typographic two-column: mono dates/org left, role + outcome bullets right. 2 roles.
4) **ABOUT.** Short, first-person, voice-forward (≤4 sentences). Personality woven in: builds things
   that ship; off the clock — pickleball, house music + festivals, currently watching Suits. No clichés.
5) **SKILLS.** Compact, mono-labeled groups (Languages / Frameworks / Tools & Infra / AI&ML) as quiet
   inline lists — not a chip explosion. Restrained.
6) **GUESTBOOK ("leave a mark").** Redesigned to match (dark, minimal): a small doodle canvas + name +
   short message → a quiet wall of marks. Keep Supabase backend + RLS + rate-limit + the data-URL
   drawing validation already in place. Sample marks + disabled submit when unconfigured.
7) **CONTACT / FOOTER.** A closing line + email (one-click copy), GitHub, LinkedIn, résumé. Footer:
   mono micro-meta (e.g. `© 2026 · built in next.js · v2`). Quiet.

## REMOVE / replace (cleanup from v1)
- Delete the Aqua-Terminal system: glass utilities, window-chrome cards, chrome-text, aqua palette,
  AtmosphereBackground bokeh, Y2K mode + Konami + scanlines, the ⌘K **CommandPalette**, and the
  **Spotify NowPlaying** widget + `app/api/now-playing` (user dropped these). Remove related deps if
  now unused (swr only if unused elsewhere; keep supabase/upstash for guestbook).
- Rewrite `tailwind.config.ts` + `app/globals.css` to the tokens above. Update nav/footer.

## Definition of done (v2)
- `npm run lint` + `npm run build` clean; runs with NO secrets (guestbook fallback intact).
- Looks premium at 1440px AND mobile (375px) — verified by screenshot.
- Body text AA contrast; visible focus; `prefers-reduced-motion` fully respected.
- No glass/chrome/gradient/Inter remnants. One accent, used <5%.
- All 5 work rows link to the correct GitHub repos (from `lib/site-data.ts`).
