# Human Interface Design & Minimalism — Principles Brief

A specific, opinionated, implementation-ready brief for building a **polished, minimal, "human interface design"-grade** personal portfolio for an AI/software engineer. The goal is *refined and premium*, the opposite of the busy "AI-generated SaaS template" look.

Reference quality bar:
- **seyityilmaz.com** — whisper-quiet, tiny precise type, huge whitespace, single magenta accent, left-aligned vertical list of work.
- **joseph.cv** — dark gallery, real work as the hero, monospace labels for metadata.
- **hasque.com** — light/clean, one bold typographic statement with an italic-serif accent against a grotesk, a single product mockup.

The common DNA: **content is the hero, the interface defers, one accent does all the talking, and confidence is expressed through what is removed.**

---

## 0. The North Star (read this first)

Three quotes that should govern every decision:

1. **Dieter Rams — "Less, but better" (*Weniger, aber besser*).** "Good design is as little design as possible. Concentrate on the essential aspects; products are not burdened with non-essentials." Design back to purity.
2. **Apple HIG — Deference.** "The UI helps people understand and interact with content, but never competes with it." The chrome should disappear.
3. **Tufte — maximize the data-ink ratio.** Every pixel of "ink" should carry information. Erase non-data-ink: decorative gridlines, borders, shadows, gradients, glassy panels, and color-without-meaning.

If an element does not (a) communicate content, (b) establish hierarchy, or (c) aid navigation — delete it. The default answer to "should I add this?" is **no**.

---

## 1. Human Interface Design / Restraint Principles

### Dieter Rams, applied to a portfolio
- **Innovative / honest:** Don't fake depth, scale, or social proof. No fake "trusted by" logo walls, no decorative dashboards.
- **Unobtrusive:** "Products are tools. They are neither decorative objects nor works of art." The site is a tool to show work and let someone contact you — design like an instrument, not a poster.
- **Long-lasting:** Avoid trend-of-the-year effects (glassmorphism, aurora gradients, bento-everything). They date a site within 12 months and read as templated.
- **Thorough to the last detail:** Optical alignment, consistent corner radii, correct apostrophes/quotes, hover states that feel intentional. Detail is the entire premium signal.
- **As little design as possible:** When in doubt, remove. Then remove again.

### Apple HIG: Clarity, Deference, Depth
- **Clarity:** Text legible at every size; nothing decorative competes with reading. Negative space, color, and type do the work — not boxes and lines.
- **Deference:** Content (your actual work, screenshots, writing) is the hero. UI is a quiet frame. No element should out-shout the work.
- **Depth — but earned through value, not borders.** Use *subtle value steps* (a surface 3–6% lighter than the background) to imply layering — never a 1px gray border around every card. Hierarchy comes from size, weight, spacing, and value, in that order.

### Tufte for UI
- **Data-ink ratio:** Strip chartjunk equivalents — gratuitous dividers, card outlines, drop shadows, badges, "decorative" icons.
- **Small multiples / repetition with variation:** A consistent project-row template repeated down the page (à la seyityilmaz) is more premium than six differently-styled sections.
- **Layering and separation:** Separate elements with *space and value*, not rules and boxes.

### What makes an interface feel PREMIUM vs TEMPLATED

| Premium | Templated / AI-generated |
|---|---|
| Intentional hierarchy (clear 1st/2nd/3rd read) | Everything roughly equal weight |
| Generous, *uneven* whitespace tuned per element | Uniform padding everywhere |
| One restrained accent used sparingly (<10%) | Multiple colors / gradients fighting |
| Asymmetric, left-anchored composition | Everything centered |
| 1–3 deliberate typefaces with tight weight discipline | Default Inter/Roboto at many random weights |
| Real content as hero | Stock illustration / 3D blob / gradient hero |
| Tiny, confident type + huge space | Big bold safe type filling the screen |
| Micro-interactions that respect the user | Everything fades/glows/translates-Y on scroll |

**The single biggest premium tell: confidence through restraint.** Amateurs add; professionals subtract. Tiny type surrounded by space reads as "I don't need to shout." Huge centered hero type reads as "template."

---

## 2. Typographic System

Typography is ~80% of the premium feel on a minimal site. Get this right and almost nothing else matters.

### 2.1 The trio (display / body / mono)
Use **2 families, optionally a 3rd for mono labels.** Two is ideal; three is the maximum.

**Recommended primary direction — Grotesk + Mono (the engineer-tasteful default):**
- **Display + Body:** one neo-grotesque used across the whole site, weight-differentiated.
- **Mono:** for metadata, labels, years, section eyebrows, code — the joseph.cv move. This is what signals "software engineer" without being loud.

**Optional editorial direction — Grotesk + Serif-italic accent (the hasque move):**
- Grotesk for everything, **one serif italic** used for a single emphasized phrase ("*building* intelligent systems") or a name. Used once or twice, never as body.

### 2.2 Specific typeface recommendations (designed, not default)

Avoid Inter-as-everything, Roboto, Instrument Sans (the literal "AI startup" default), and Open Sans. They are technically fine but read as defaults.

**Grotesks — premium paid (if budget allows):**
- **Söhne** (Klim) — the current gold standard for tasteful tech. Akzidenz lineage, Helvetica warmth.
- **ABC Diatype** (Dinamo) — neutral, precise, slightly mechanical; very "design studio."
- **Neue Montreal / Neue Haas Grotesk** — clean, confident.
- **Aeonik** (CoType) — geometric neo-grotesque, modern.

**Grotesks — FREE and designer-grade (use these to avoid Inter):**
- **General Sans** (Fontshare) — variable, the best free Söhne-adjacent workhorse.
- **Satoshi** (Fontshare) — variable, slightly geometric, very clean.
- **Geist** (Vercel, OFL) — variable, engineered for software/devtools; excellent for an AI engineer.
- **Cabinet Grotesk** (Fontshare) — variable, more character/personality.
- **Nohemi** — free variable neo-grotesque.
- **Hanken Grotesk** (Google) — solid neutral body grotesk.

**Display (if you want a distinct heading face):**
- **Clash Display** (Fontshare, variable) — confident, modern display.
- **Bricolage Grotesque** (Google, variable) — ink traps, texture, personality without being loud.
- **Druk / Trim Poster** — only if you want an aggressively condensed statement headline (use with extreme discipline).

**Serif (for the single italic accent):**
- **Fraunces** (Google, variable, has `opsz` optical-size + `SOFT`/`WONK` axes) — the best free expressive serif; its italic at light weight is the ideal accent against a grotesk.
- **Newsreader** (Google, variable) — refined editorial serif.
- **Editorial New / PP Editorial New** (paid) — the quintessential premium italic-serif accent seen on high-end studio sites.

**Monospace (labels/metadata — strong recommendation for this site):**
- **Geist Mono** (free) — pairs perfectly if using Geist.
- **JetBrains Mono** (free) — engineer-credible.
- **IBM Plex Mono** (free) — clean, slightly humanist.
- **Berkeley Mono** (paid) — the premium choice; reads as deliberate taste.
- **Commit Mono** (free) — neutral, beautiful.

**Two concrete recommended stacks:**
1. **Engineer-quiet:** Geist (display+body) + Geist Mono (labels). All free, variable, devtools-credible. Closest to joseph.cv energy.
2. **Editorial-premium:** General Sans (body/UI) + Clash Display *or* Fraunces-italic accent + IBM Plex Mono (metadata). Closest to a hasque/studio energy.

### 2.3 Type scale (modular)
On a minimal site, **prefer a smaller base and a generous ratio** so the jump from body to display is dramatic but the body stays quiet.

- **Base body size:** 16–18px (use 17–18px for an airy, premium feel; tiny metadata can drop to 12–13px).
- **Ratio:** **1.25 (Major Third)** for a calm UI scale, or **1.333 (Perfect Fourth)** for more editorial contrast. Avoid going above ~1.5 unless you want a single giant statement headline (then jump the top step manually rather than scaling everything up).

Example scale (base 16, ratio 1.25, rounded):
```
xs   12px   — mono labels, eyebrows, captions
sm   13–14  — secondary metadata
base 16     — body
md   20     — lead paragraph / large body
lg   25     — small headings
xl   31     — section headings
2xl  39     — page headings
3xl  49–64  — single hero statement (set manually, can break the ratio)
```
Clamp the hero with `clamp()` for fluid sizing, e.g. `clamp(2.5rem, 6vw, 4.5rem)`.

### 2.4 Weight discipline
- **Use 2–3 weights total, max.** Typically Regular (400) for body, Medium (500) for emphasis/UI, and one heavier (600/700) for the single hero statement. Or stay entirely in 400/500 and let *size + space* create hierarchy (the most refined look — seyityilmaz barely changes weight).
- **Avoid thin (100–200) at body sizes** — it reads washed-out and is a low-contrast tell.
- A 16px Medium can out-rank a 24px Light — **pair size changes with weight changes** so hierarchy is unambiguous.
- Minimum **~200-unit weight gap** between a heading face and body face if you pair two families.

### 2.5 Optical sizing, line-height, measure, tracking
- **Optical sizing:** Prefer variable fonts with an `opsz` axis (Fraunces, Newsreader). Let display sizes use display letterforms and body use text letterforms. Enable `font-optical-sizing: auto`.
- **Line-height (leading):**
  - Body: **1.5–1.65** (1.6 is a safe premium default).
  - Large display/headlines: **1.0–1.15** (tight leading = confident, editorial). The bigger the type, the tighter the leading.
  - Mono labels: 1.2–1.4.
- **Measure (line length):** **45–75 characters** for body; **60–66 is the sweet spot.** Enforce with `max-width: 60ch` (≈ 32–36rem) on text blocks. Wide full-bleed paragraphs are an amateur tell.
- **Tracking (letter-spacing):**
  - Large display: **slightly negative**, −0.01em to −0.03em (tightens big grotesk type, looks expensive).
  - Body: 0 (default).
  - Small uppercase / mono eyebrows: **positive, +0.05em to +0.12em** — uppercase always needs added tracking.
- **Always fix typographic detail:** real quotes (" "), apostrophes ('), en/em dashes, no double spaces, `text-wrap: balance` on headings and `text-wrap: pretty` on body.

### 2.6 The serif-italic-against-grotesk rule
Use it as a **single accent, not a system.** One italic-serif phrase inside an otherwise grotesk headline creates an instant "art-directed" feel (hasque). Rules: same optical size as the grotesk it sits in, lighter weight (300–400), let it carry meaning (the verb, the adjective, the name). Never set body or multiple headings in it.

---

## 3. Spacing & Layout System

### 3.1 The grid: 8pt base, 4pt sub-grid
- **Spacing scale (8pt-based):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` px. Use 4px only for fine type/icon nudges; everything structural in multiples of 8.
- **Baseline rhythm:** align type to a **4pt baseline grid** (line-heights as multiples of 4) — pure 8pt leaves too few line-height options.
- Expose this as tokens (`--space-1: 4px` … `--space-12: 160px`) so spacing is never arbitrary.

### 3.2 Whitespace = confidence
- **Be generous and deliberately uneven.** Premium sites use *more* space than feels comfortable, and tune it per relationship. The eye reads space as "this content deserves room."
- **Internal ≤ external rule:** space *within* a group must be smaller than space *between* groups, so grouping is unambiguous. (A project's title→meta gap should be tighter than the gap between two projects.)
- **Section spacing:** large vertical gaps between sections (96–160px on desktop). This single move does more for "premium" than any visual effect.
- Don't fill space for the sake of it. Empty space *is* the design.

### 3.3 Measure, max-width, and the canvas
- **Content max-width:** ~640–760px for text-led pages; the whole site can live in a **narrow, left-anchored column** (seyityilmaz) rather than full-bleed.
- Use **asymmetry:** left-align the main column, let metadata/labels sit in a narrow left or right gutter (joseph.cv mono labels). Asymmetric, left-anchored layouts read as designed; centered-everything reads as template.
- **Optical alignment over geometric:** nudge icons, quotation marks, and punctuation to *look* aligned, not just measure aligned. Hang punctuation/bullets into the margin.

### 3.4 The discipline of a strict grid (held loosely)
- Establish a strict column/spacing grid, then **break it intentionally once** for the hero or a single feature — a controlled break against an obvious grid reads as confidence; random placement reads as chaos.
- Consistent corner radii (pick one: 0px sharp = most premium/editorial, or a single small radius like 6–8px — never mix radii).

---

## 4. Color Discipline

### 4.1 Near-monochrome + one accent
- Build the entire palette from **one neutral ramp + one accent.** That's it.
- **The <10% accent rule:** the accent should appear on well under 10% of the visible surface — a link, a hover, one underline, one dot, the focus ring. seyityilmaz's magenta is used almost homeopathically. Over-using the accent is the fastest way to look templated.
- Accent choice: pick *one* with personality and use it precisely. A saturated magenta/pink (`#FF3D81`-ish), an electric blue, a sharp lime, or a warm orange. Avoid the purple→blue gradient — it is the literal "we used AI" signature.

### 4.2 Dark-mode palette that looks premium
- **Avoid pure black `#000000` as the main surface** (harsh; kills the ability to show elevation; can cause OLED smearing). Use a **near-black** base.
- **Elevation via value steps, NOT borders.** Each layer up gets ~3–6% lighter. Borders-everywhere is a template tell.

Recommended dark ramp (background → elevated):
```
--bg-0   #0A0A0B   base canvas (near-black, slightly warm/cool to taste)
--bg-1   #111113   raised surface / subtle section
--bg-2   #18181B   card / elevated panel
--bg-3   #232327   hover / highest elevation
--line   rgba(255,255,255,0.06)   hairline ONLY where truly needed
--text-1 #EDEDEF   primary text (not pure white — ~92% white)
--text-2 #A1A1AA   secondary / metadata
--text-3 #6E6E76   tertiary / disabled
--accent #FF3D81   single accent (example magenta)
```
Notes: primary text at ~#EDEDEF (not `#FFFFFF`) reduces glare and looks more refined. True black (`#000`) can be used *intentionally* for a "sunken" well behind an elevated card.

### 4.3 Light-mode palette (hasque/seyityilmaz energy)
```
--bg-0   #FAFAF8 / #FFFFFF   warm or pure white canvas
--bg-1   #F4F4F2            subtle raised surface
--text-1 #111111            primary (near-black, not #000)
--text-2 #6B6B6B            secondary / metadata
--text-3 #9A9A9A            tertiary
--accent #FF3D81            single accent
```
A faintly **warm off-white** (`#FAFAF8`) reads more premium and less clinical than pure `#FFFFFF`.

### 4.4 Contrast & legibility
- Body text vs background: meet **WCAG AA (4.5:1)**. Don't trade legibility for aesthetics — washed-out low-contrast gray-on-gray is itself an AI-template tell.
- Secondary/metadata text can sit at ~3:1+ but keep it readable; mono labels at small sizes need enough contrast.
- The accent must pass contrast where it carries meaning (links, focus rings). Always provide a **visible focus state** (an accent ring), and never remove outlines without replacing them.

---

## 5. The Concrete Tells of AI-Generated Design — and How to Avoid Each

For each tell: what it looks like → the fix.

1. **Uniform 3-card feature grid.**
   *Tell:* three (or six) equal cards with icon + heading + lorem, equal weight, equal padding.
   *Fix:* Replace with an asymmetric, repeated **list** of real work (project name, one-line outcome, year, stack in mono) — varied emphasis, no boxes. Or one feature at full attention rather than three at equal attention.

2. **Gradient hero + glassmorphism everything.**
   *Tell:* purple→blue aurora background, frosted translucent panels floating in a void.
   *Fix:* Flat near-mono background. No glass. Hero = a single typographic statement or real work, on solid color. Depth via value steps, not blur.

3. **Low-contrast, washed-out color.**
   *Tell:* light gray text on white, pastel-on-pastel, everything desaturated and soft.
   *Fix:* High-contrast neutrals (near-black text on warm white / ~92% white on near-black) + exactly one saturated accent. Confidence, not haze.

4. **Equal visual weight everywhere.**
   *Tell:* every section the same size, same spacing, same emphasis; no clear first read.
   *Fix:* Brutal hierarchy. One hero element. Everything else demonstrably quieter (smaller, lighter, less space). The eye should know exactly where to land first, second, third.

5. **Centered everything.**
   *Tell:* centered hero, centered headings, centered paragraphs, centered cards.
   *Fix:* **Left-align** the primary column. Use asymmetry and a left anchor. Reserve centering for nothing, or one deliberate moment.

6. **Generic section headers.**
   *Tell:* "Features," "About Me," "My Work," "Get In Touch," "Why Choose Me."
   *Fix:* Either drop headers entirely (let content speak) or write specific, human ones. Use mono **eyebrows** (e.g. `01 — SELECTED WORK`) rather than big generic banners.

7. **Default typeface at random weights.**
   *Tell:* Inter/Roboto/Instrument Sans everywhere, mixing 300/400/600/700/800 arbitrarily.
   *Fix:* A deliberate non-default family (see §2.2), 2–3 weights, size+space for hierarchy.

8. **Motion-as-polish.**
   *Tell:* everything fades-in, glows on hover, translates-Y on scroll-into-view.
   *Fix:* Almost no entrance animation. A couple of *intentional* micro-interactions (a link underline that draws, a quiet color shift on hover, ~150–200ms ease-out). Respect `prefers-reduced-motion`. Stillness reads as confidence.

9. **Decorative AI/3D blob / robot / stock illustration.**
   *Tell:* abstract gradient orb, neural-net graphic, generic isometric illustration.
   *Fix:* Show *real* work — screenshots, demos, diagrams of systems you built. Real content beats decoration every time.

10. **Box/border/shadow on everything.**
    *Tell:* every element wrapped in a 1px gray border + soft drop shadow.
    *Fix:* Separate with space and value. Borders only as rare hairlines (`rgba(255,255,255,0.06)`); shadows almost never (or one very subtle elevation shadow, used consistently).

11. **Emoji as accent / fake warmth.**
    *Tell:* 💙 📱 ✨ 🚀 sprinkled as "personality."
    *Fix:* Personality comes from voice, type, and the work. Skip the emoji garnish (or one, deliberately, max).

---

## 6. Implementation Checklist (tokens & defaults)

**Type**
- [ ] One non-default grotesk (General Sans / Geist / Satoshi), one mono (Geist/IBM Plex Mono) for labels, optional Fraunces-italic accent.
- [ ] Base 16–18px, scale ratio 1.25–1.333, hero set manually via `clamp()`.
- [ ] Max 2–3 weights. Body line-height 1.5–1.65; display 1.0–1.15.
- [ ] Body `max-width: 60ch`. Display tracking −0.02em; uppercase/mono +0.08em.
- [ ] `font-optical-sizing: auto`, `text-wrap: balance` on headings, smart quotes/dashes.

**Space**
- [ ] 8pt scale tokens (4→160), 4pt baseline for type.
- [ ] Internal-spacing < external-spacing. Section gaps 96–160px desktop.
- [ ] Narrow left-anchored content column; asymmetric layout; optical alignment.

**Color**
- [ ] One neutral ramp + one accent. Accent <10% of surface.
- [ ] Near-black base (`#0A0A0B`), elevation via value steps not borders; text ~#EDEDEF not pure white. (Light: warm `#FAFAF8`, near-black text.)
- [ ] AA contrast on body. Visible accent focus ring. No purple→blue gradient.

**Restraint**
- [ ] No gradient hero, no glassmorphism, no equal 3-card grid, no centered-everything, no generic headers, no default-Inter, no motion-as-polish.
- [ ] Real work as the hero. Delete anything that isn't content, hierarchy, or navigation.

---

## Sources
- Dieter Rams, Ten Principles for Good Design — [IxDF](https://ixdf.org/literature/article/dieter-rams-10-timeless-commandments-for-good-design), [design manifestos](https://designmanifestos.org/dieter-rams-ten-principles-for-good-design/)
- Apple Human Interface Guidelines (Clarity / Deference / Depth) — [HIG summary gist](https://gist.github.com/eonist/f4ba31012815731284d867232f6c70e4), [Netguru](https://www.netguru.com/blog/ios-human-interface-guidelines)
- Tufte data-ink ratio applied to UI — [Map UI Patterns](https://mapuipatterns.com/data-ink-ratio/), [Holistics](https://www.holistics.io/blog/data-ink-ratio/)
- Modular type scales — [Spec.fm](https://spec.fm/specifics/type-scale), [Cieden](https://cieden.com/book/sub-atomic/typography/different-type-scale-types)
- Premium / free typefaces — [Creative Boom 2026](https://www.creativeboom.com/resources/15-typefaces-designers-cant-stop-using-or-admiring-in-2026/), [Awwwards best free fonts](https://www.awwwards.com/best-free-fonts.html), [Fontshare](https://www.fontshare.com)
- Font pairing / weight / x-height rules — [TypeSmith pairing theory](https://typographysmith.com/guides/font-pairing-theory), [DEV font pairings](https://dev.to/web_dev-usman/10-font-pairings-so-good-they-feel-like-a-secret-8c3)
- 8pt grid / baseline / spacing — [Rejuvenate 8pt grid](https://www.rejuvenate.digital/news/designing-rhythm-power-8pt-grid-ui-design), [Cieden spacing best practices](https://cieden.com/book/sub-atomic/spacing/spacing-best-practices)
- Premium dark-mode palettes / elevation — [ColorArchive dark surfaces](https://colorarchive.org/collections/dark-mode-ui-surfaces/), [ColorUXLab black guide](https://coloruxlab.com/colors/black)
- AI-generated design tells — [DEV: why AI sites feel generic](https://dev.to/samareshdas/why-most-ai-generated-websites-still-feel-generic-and-what-actually-makes-a-product-feel-premium-33p2), [Medium: AI UI sameness](https://medium.com/@Rythmuxdesigner/why-your-ai-generated-ui-looks-like-everyone-elses-and-how-to-break-the-pattern-7a3bf6b070be), [AXE-WEB](https://axe-web.com/insights/ai-website-design-sameness/)
- Reference sites: seyityilmaz.com, joseph.cv, hasque.com
