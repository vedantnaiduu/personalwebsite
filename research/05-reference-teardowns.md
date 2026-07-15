# 05 — Reference Teardowns: Elite Minimal Portfolio Sites

Research date: 2026-06-15. Hard data (fonts, hex, grid, type scale) captured from live
computed styles via headless browser. Inferred items are flagged.

---

## PART 1 — Primary references (deep teardown)

### 1. seyityilmaz.com — "the typed work-index"

The signature is the **left-aligned typed work index + extreme restraint + a single
link-colored accent**, all sitting on a soft pastel light wash. The whole intro fits one
screen.

| Property | Value (measured) |
|---|---|
| **Typeface (rendered)** | `system-ui / -apple-system / Segoe UI / Roboto …` — i.e. the OS native UI font. NOT a custom face. (Montserrat/Open Sans/Roboto are loaded as Webflow defaults but not actually used for the visible type.) |
| **Type scale** | Only **5 sizes**: 12px/300 (fine print), 14px/400, 16px/400, 18px/400 (body/index), 22px/700 (name). Tiny, precise, system-native. |
| **Background** | `#f7f7f7` base with a **stacked multi-radial-gradient wash**: four soft pastel blobs — blue `rgb(225,236,255)`, warm cream `rgb(254,244,225)`, lilac `rgb(240,228,251)`, ice-blue `rgb(226,245,253)`, each fading to transparent at 50%. This is the "soft light gradient bg." |
| **Text color** | Body `rgba(0,0,0,0.74)`; secondary links `rgba(0,0,0,0.7)`; name pure black. |
| **The "magenta" accent** | Reality check: the word **Apple is `rgb(0,0,238)`** — the browser **default unstyled link blue**, not a chosen magenta. Visually it reads as a vivid blue-violet against pastel. The "device" is deliberately leaving one word as a raw hyperlink so it pops as the only saturated color on the page. |
| **Layout / grid** | Centered single column. Left-aligned project list, each row = platform icon + title + year (reverse-chron 2022→2017) + collaborator. Centered name block + role line above it. |
| **Navigation** | Tiny text links in footer: About · Email · LinkedIn · Twitter. No nav bar, no menu. |
| **Motion** | Minimal/none of note; Webflow-built, static-feeling. The restraint IS the interaction. |
| **THE ONE SIGNATURE DEVICE** | A **typed, dated work-index as the hero** (no images) + exactly **one raw-hyperlink-blue word** as the sole color accent, on a pastel gradient wash. Enormous whitespace. |

**Stealable:** system-ui type at small sizes + a 4-blob radial-gradient pastel background +
let exactly one word carry color by leaving it the native link blue.

---

### 2. joseph.cv — "the work is the hero" (dark grid gallery)

Signature is a **tight typographic header (identity as structured columns) sitting above a
real project-visual grid gallery**, with **monospace utility labels**. The actual work
dominates.

| Property | Value (measured) |
|---|---|
| **Primary typeface** | **neue-haas-unica** (Adobe Fonts), weight 500, ~15px for nav/identity/links; 16px/400 for project titles. Fallback `IBM Plex Sans`. |
| **Label / utility typeface** | **input-mono** (the monospace), **11.5px**, weight 400–500, `text-transform: uppercase`, `letter-spacing: 0.92px`, color **zinc `#71717a` (rgb 113,113,122)**. Used for ALL meta labels: ABOUT, TEAMS, LINKS, project categories ("DIGITAL TOOLMAKING", "CONSUMER PRODUCT"). |
| **Other loaded faces** | OffBit, nimbus-sans (700/900 + condensed/extended) — used sparingly for display moments. |
| **Type scale** | 11.5px mono labels · 15px identity/nav · 16px project titles · larger nimbus for accents. Deliberately tiny and tight. |
| **Background** | Near-black (transparent body over dark page). Text white `#ffffff`; project title `#fafafa`; muted `#71717a`. |
| **Grid** | **12-column grid, each col = 107px, gap 12px**, inside a **1800px max-width** container. Project hero blocks span sets of columns (464px-wide tiles = ~4 cols). This is a strict modular grid — the gallery's backbone. |
| **Header columns** | Identity as structured mini-columns: name / role ("Interaction Designer") / location ("New York, NY") / ABOUT prose / TEAMS (numbered: Cognition 1, Notion 2, Azuki 3, Skiff 4, Apple 5) / LINKS (Reading↗ Linkedin↗ Instagram↗ Twitter↗ — each with ↗ glyph). |
| **Navigation** | Inline text links only; "get in touch" CTA; external links marked with ↗. |
| **Motion / personality** | **Easter-egg loading microcopy** in mono: tiles show *"GENERATING PICTOGRAM…" / "POPULATING PICTOGRAM…"* before content paints. Animated `…` dots. Footer carries `v4.3.0` + "Last updated" timestamp — treats the site like a versioned product. |
| **THE ONE SIGNATURE DEVICE** | **Mono uppercase metadata labels (input-mono, 11.5px, zinc, tracked +0.92px) sitting over a strict 12×107px grid of real product visuals.** Identity rendered as data columns; work shown as a gallery, not a list. |

**Stealable:** pair a humanist grotesk (neue-haas-unica / could sub Inter or Söhne) for
content with a true monospace (input-mono / sub Geist Mono, JetBrains Mono) used ONLY for
uppercase tracked labels; lay work on a visible 12-col modular grid; version the footer.

---

### 3. hasque.com — "one big statement, grotesk + serif-italic"

Signature is **one enormous bold grotesk sentence with a single word swapped into serif
italic**, dark theme, anchored by one real phone mockup.

| Property | Value (measured) |
|---|---|
| **Display typeface** | **PP Mori SemiBold** (Pangram Pangram) for the headline. |
| **Accent typeface** | **PP Editorial New — Italic** (Pangram Pangram serif) for the swapped word. |
| **Body / meta typeface** | **PP Mori Regular**, 16px. (PP Telegraf also loaded.) |
| **Hero headline** | "I enjoy creating *mobile* products." — **106px, line-height 124px**, white. The word **"mobile" is the only serif-italic** (PP Editorial New Italic) inside the grotesk line. THE move. |
| **Background** | `#0d0d0d` (rgb 13,13,13) — near-black, slightly warm. |
| **Text colors** | Primary white `#ffffff`; secondary/muted `#7c7c83` (rgb 124,124,131) for descriptions; a third faint `#535355` for fine print. |
| **"Purple" accent** | Not a CSS color — the purple lives **inside the phone-mockup UI image**, not the page chrome. The page itself is monochrome dark; the phone provides the only hue. |
| **Metadata** | Two-up labeled blocks: **"Recent Experience"** + **"Location"**, each label white 16px with **small icons** (business-icon.png, location-icon.png), value in muted gray. |
| **Section list** | "Experiments" h2 (24px/700) → numbered project links (Instagram, FirstFloor, Cofolios.com, Curve.design) with one-line descriptions in muted gray. |
| **Personality** | Page `<title>` is literally **💙📱** (emoji-as-title). |
| **THE ONE SIGNATURE DEVICE** | **A single huge grotesk sentence (PP Mori SemiBold ~106px) with ONE word flipped to serif italic (PP Editorial New Italic)** — the type-mixing in one line is the entire identity. One phone mockup carries the only color. |

**Stealable:** giant bold grotesk headline + swap exactly one semantically-loaded word into a
contrasting serif italic; keep everything else near-black/white/gray and let a single product
image hold all the color; label meta blocks with tiny icons; emoji as the tab title.

---

## PART 2 — 14+ more elite minimal sites (URL + single stealable pattern)

Fonts confirmed from rendered pages or authors' own writing; "Inter-family" = confident
house-style inference. Company sites listed for craft, not as personal portfolios.

### Core personal-portfolio lineage

- **Rauno Freiberg — https://rauno.me** — Custom self-named grotesk on **grey paper canvas `#ededed`** (never pure white) + macOS-style magnifying dock nav, interface sound effects, and precise "Copied" micro-feedback. *Steal: grey-paper bg + OS-metaphor interactions.*
- **Paco Coursey — https://paco.me** — **Söhne** (Klim) on pure white, single narrow column, work as plain one-line links (he built ⌘K / cmdk). *Steal: foundry type + zero decoration; let whitespace carry it.*
- **Emil Kowalski — https://emilkowal.ski** — Custom sans on warm near-white `#fdfdfc`; **interruptible spring micro-animations** (~200-300ms, transform/opacity only, reduced-motion aware). *Steal: motion-as-proof-of-craft; the spring visualizer demo.*
- **Lee Robinson — https://leerob.com** — **STIX Two Text serif body** (literary, anti-Inter) on white, `#171717` text; work as curated collections not cards. *Steal: serif-for-body to feel "published."*
- **Brian Lovin — https://brianlovin.com** — Inter; **persistent product-grade sidebar** (Writing/Projects/Stack/AMA/TIL) — treats the site like a real app shell. *Steal: app-shell sidebar nav.*
- **Guillermo Rauch — https://rauchg.com** — **Geist**; essay index where each title is paired with a big **reader view-count** ("Pure UI — 704,829"). *Steal: readership numbers as typographic ornament.*
- **Samuel Kraft — https://samuelkraft.com** — Inter-family (experiments w/ SF Pro Rounded); card grid with large optimized hero images + buttery card micro-interactions. *Steal: the rare tasteful image-card grid done with restraint.*
- **Shu Ding — https://shud.in** — Clean sans; navigation-first homepage = one plainspoken sentence + compartmentalized section links, no splashy hero. *Steal: restraint itself as the signature.*
- **Delba de Oliveira — https://delba.dev** — Modern sans; content-first hero + two-bucket work split ("professional" vs "personal") as bullet lists; voice-driven ("Hey, I'm Delba"). *Steal: two-bucket linked lists + warm first-person voice.*
- **Tobias Lins — https://tobi.sh** — Minimal sans; one-screen **résumé-as-prose** (credentials as a sentence) + memorable short-handle domain. *Steal: credentials written as a sentence on one ultralight page.*
- **Brittany Chiang — https://brittanychiang.com** — **Inter**, dark; **split-pane**: fixed left intro/nav column + scrolling right column, nav highlights in sync with scroll; "time travel" footer to old versions. *Steal: fixed-left / scroll-right split + scroll-synced nav.*
- **Rasmus Andersson — https://rsms.me** — **Inter** (he made it); dense category index "Projects (74) / Thoughts (512)" with a single `●` bullet as the only ornament; type-specimen footer as branding. *Steal: counts in labels + specimen-as-logo.*
- **Anthony Fu — https://antfu.me** — Clean sans (UnoCSS); projects grouped **by role** (creator-of / core-team / maintains) so a huge OSS footprint reads instantly. *Steal: group work by relationship, not date.*
- **Max Stoiber — https://mxstbr.com** — Neutral sans; scannable "TL;DR" credentials block + essays with live view counts + self-aware humor ("0.84 essays/year"). *Steal: TL;DR block + data-as-decoration + dry wit.*
- **Josh W. Comeau — https://www.joshwcomeau.com** — Readable sans + playful custom header treatment; **theme-aware portrait swap** (different avatar per light/dark) + warm microcopy. *Steal: personality through theme-reactive details.*

### Honorable mentions / different flavor

- **Lynn Fisher — https://lynnandtonic.com** — Fully re-illustrated **versioned editions** ("v. XIX") with browsable archive. *Steal: redesign-as-content / versioned site.*
- **Sarah Drasner — https://sarah.dev** — Headshot + "I Make Things" + 3 category links, humanized by "She likes cheese." *Steal: one-liner personality tag.*
- **Alvar Lagerlöf — https://alvar.dev** — Narrative hero + a **single green star** as the only brand mark. *Steal: one tiny mark as entire brand.*
- **Jake Deichert — https://jacobdeichert.ca** — Homepage = pure dated reverse-chron blogroll, no thumbnails. *Steal: dated list, zero images.*

### Company exemplars (craft reference)

- **Linear — https://linear.app** — Inter on high-contrast dark + subtle **radial/conic gradient "glow"** behind hero elements; staged full-bleed modular sections. *Steal: dark + restrained gradient glow.*
- **Vercel / Geist — https://vercel.com** (system at `/geist`) — Geist Sans + Geist Mono; **visible 1px grid lines, hairline borders, "+" corner crosses** = blueprint/spec feel; mono for metadata. *Steal: blueprint hairline grid + mono meta.*

### Could not verify (excluded honestly)
- **Jordan Singer** — classic portfolio domains (jordansinger.me, jsinger.co) are dead; current presence is X/@jsngr + product sites (lil.software, Mainframe), not a minimal portfolio.
- **anand.computer** — does not resolve to a verifiable site.

---

## PART 3 — Recurring patterns: the implementation checklist

**Hero strategy**
- [ ] Hero = **a sentence, not a splash.** One-line identity statement over (optional) avatar. No carousels, no big stock imagery.
- [ ] Either (a) tiny precise system/grotesk type that fits one screen (seyit, paco, shud), or (b) ONE huge grotesk statement with a type-contrast word (hasque).
- [ ] Whole intro fits one viewport.

**How they show work**
- [ ] Default = **work as plain linked text lists**, grouped under terse labels (Building / Writing / Projects) or by relationship (creator-of / maintains).
- [ ] Each entry carries a **year / count / view-number** — data as ornament (rauchg, rsms, mxstbr).
- [ ] Image grids are the *exception* (joseph.cv, kraft) — when used, put them on a strict modular grid (12 cols, ~107px, 12px gaps, big max-width) and label tiles with mono.

**Type treatment**
- [ ] **Escaping the default font is the #1 differentiator.** Pick a lane: foundry/custom (Söhne, PP Mori, neue-haas-unica, custom grotesk), deliberate Inter, or contrarian serif/Geist (STIX Two Text, Geist).
- [ ] **Monospace ONLY for metadata/labels**: uppercase, ~11-12px, letter-spacing ~+0.9px, muted gray (`#71717a`). (joseph.cv, Vercel.)
- [ ] Optional power move: **mix grotesk + serif-italic in one line**, swapping one meaningful word (hasque).
- [ ] Tiny, tight type scale — typically 4-6 sizes total.

**Color**
- [ ] White/near-white **or** near-black, plus **exactly one quiet accent.**
- [ ] Light camp: soft off-white/grey paper (`#ededed`, `#fdfdfc`, `#f7f7f7`) — never harsh pure white; optionally a **multi-radial pastel gradient wash** (seyit).
- [ ] Dark camp: warm near-black (`#0d0d0d`, near-`#000`) + one accent that often lives **inside a product image**, not the chrome (hasque).
- [ ] Muted secondary text in a single gray (`#7c7c83` / `#71717a`).

**Spacing & grid**
- [ ] **Enormous whitespace**; single narrow column for text-forward sites.
- [ ] Strict modular grid for galleries; large max-width (1800px on joseph.cv) so the grid breathes.

**Navigation**
- [ ] Tiny **text links**, usually footer (About · Email · social). No nav bar for the minimal camp.
- [ ] App-shell sidebar (Lovin) or fixed-left split-pane with scroll-synced highlights (Brittany) for the "product" camp.
- [ ] External links marked with a `↗` glyph.

**Motion**
- [ ] **Restraint as the flex.** Short (200-300ms), **transform/opacity only**, spring or ease-out, **interruptible**, `prefers-reduced-motion` honored (Emil).
- [ ] Micro-feedback states ("Copied"), optional interface sounds (Rauno).

**"Human" personality touches (pick 1-2, not more)**
- [ ] Self-aware microcopy / dry stat ("0.84 essays/year", "She likes cheese").
- [ ] Easter-egg loading text in mono ("GENERATING PICTOGRAM…" — joseph.cv).
- [ ] Versioned footer (`v4.3.0` + last-updated) treating the site as a product.
- [ ] Emoji as the page `<title>` (hasque: 💙📱).
- [ ] Theme-reactive detail (avatar swaps light/dark — Comeau).
- [ ] "Time travel" link to past portfolio versions (Brittany, Lynn Fisher).

**Methodological note:** font-family values on these Next.js sites are bundled in JS/CSS;
exact names for the three primaries here were read from live computed styles via headless
browser (reliable). For the Part 2 sites, confirmed names come from rendered pages or
authors' writing; "Inter-family" labels are house-style inferences.
