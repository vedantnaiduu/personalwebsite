# Tasteful Motion & Implementation for a Premium Minimal Portfolio

Stack: Next.js (App Router) + TypeScript + Tailwind + framer-motion (now `motion`), Vercel.
Reference feel: seyityilmaz.com, joseph.cv, hasque.com, rauno.me, emilkowal.ski.

**Guiding philosophy (the difference between premium and "AI-animated"):**
- Motion is *information*, not decoration. Add it only where it clarifies hierarchy, state, or spatial continuity.
- **Restraint wins.** Small offsets (8–24px), short durations (150–600ms), few simultaneous moving things.
- **ease-out for entrances**, never `ease-in` for UI (it feels sluggish). Spring only when something is interactive/draggable.
- Animate **only `transform` and `opacity`** (composite-only → 60fps). Never animate width/height/top/left/margin.
- **`prefers-reduced-motion` is non-negotiable** — every effect needs a reduced path.
- No layout shift, ever. Reserve space, use aspect-ratio, transform-based motion.

---

## 0. Foundation: the design tokens (easing + duration)

Define once, reuse everywhere. These curves are the "expensive" feel.

```ts
// lib/motion.ts
export const ease = {
  // strong ease-out (expo-ish) — entrances, reveals. Emil Kowalski's go-to.
  out: [0.16, 1, 0.3, 1] as const,          // "easeOutExpo"-like
  outQuart: [0.25, 1, 0.5, 1] as const,     // softer, good for text
  // smooth ease-in-out — looping / two-way / scrubbed
  inOut: [0.65, 0, 0.35, 1] as const,
  // Lenis default scroll easing (expo-out)
  expoOut: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

export const duration = {
  fast: 0.18,   // micro: hover, dropdowns (under ~200ms feels instant)
  base: 0.4,    // standard reveal
  slow: 0.6,    // hero / large element entrance
  // hard rule: UI interactions < 300ms; entrances < 600ms.
};
```

Tailwind equivalents (`tailwind.config.ts`):
```ts
extend: {
  transitionTimingFunction: {
    'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
    'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
  },
}
```

Curve cheat-sheet (Penner, cubic-bezier form):
- expoOut `cubic-bezier(0.16,1,0.3,1)` — punchy, premium entrances.
- quartOut `cubic-bezier(0.25,1,0.5,1)` — gentle, editorial text.
- quintInOut `cubic-bezier(0.83,0,0.17,1)` — dramatic two-way / scrubbed.
- Emil's classics: ease-out `cubic-bezier(0.23,1,0.32,1)`, ease-in-out `cubic-bezier(0.77,0,0.175,1)`.

---

## 1. Page-load orchestration

### 1a. Staggered hero reveal (variants + staggerChildren)
**What:** parent orchestrates children entering one after another. **When:** hero on first paint, nav items, a short list. Keep stagger tight (0.06–0.12s) and items few.

```tsx
'use client';
import { motion } from 'motion/react';
import { ease, duration } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export function Hero() {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.h1 variants={item}>Vedant Naidu</motion.h1>
      <motion.p  variants={item}>Designer & engineer.</motion.p>
      <motion.a  variants={item} href="/work">View work</motion.a>
    </motion.div>
  );
}
```

### 1b. Masked line reveal (overflow-hidden + translateY)
**What:** each line sits in an `overflow-hidden` clip; the inner span slides up from below. The signature "type slides out of nowhere" editorial move. **When:** hero headline, section titles. Use sparingly — once or twice per page.

```tsx
const lineParent = { show: { transition: { staggerChildren: 0.1 } } };
const lineChild = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: ease.out } },
};

export function MaskHeadline({ lines }: { lines: string[] }) {
  return (
    <motion.h1 variants={lineParent} initial="hidden" animate="show">
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span variants={lineChild} className="block">{l}</motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
```
- Split by **line, not letter**, for restraint (per-letter reads as "AI/awwwards demo"). For real line-splitting use `SplitType` or the new `<TextSplitter>`/motion `splitText`, but pre-defined lines are cleanest.
- `clip-path: inset(0 0 100% 0) → inset(0)` is an alternative mask that also wipes; overflow-hidden+translate is cheaper.

### 1c. Blur-up + fade-up entrance
**What:** opacity 0→1, y 12→0, **and filter blur(8px)→blur(0)**. The blur adds a soft, expensive depth-of-field feel. **When:** the single most important element (hero image/name), or as the standard scroll reveal. Don't blur everything — it's GPU-costly and gimmicky in bulk.

```tsx
const blurUp = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)',
          transition: { duration: 0.7, ease: ease.out } },
};
```
Note: animating `filter` is composite-friendly but heavier than transform — limit count.

---

## 2. Scroll

### 2a. Smooth scroll with Lenis
**Pros:** unifies wheel/trackpad inertia, makes parallax/scroll-linked effects feel cohesive, tiny (~Lenis is lightweight, no GSAP dependency). **Cons:** hijacks native scroll (anchor/scrollbar edge cases), can fight `position: sticky` and accessibility expectations, must disable for reduced-motion, mobile inertia can feel off (`syncTouch: false`). Use it only if the whole site benefits — it's optional for a minimal portfolio.

Packages: use **`lenis`** + **`lenis/react`** (`ReactLenis`). The old `@studio-freight/*` packages are deprecated.

```tsx
// app/lenis-provider.tsx
'use client';
import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (reduce) return <>{children}</>; // native scroll for reduced-motion

  return (
    <ReactLenis root options={{
      lerp: 0.1,            // 0.08–0.12 = smooth but responsive
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,     // native touch on mobile = better
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expoOut
    }}>
      {children}
    </ReactLenis>
  );
}
```
- `autoRaf` (newer Lenis) handles the RAF loop for you; otherwise drive it via your own `requestAnimationFrame`.
- If syncing with framer-motion `useScroll`, pass Lenis's scroll value or let `useScroll` read window — they coexist fine.
- Gotcha: keep options out of effect dep arrays (re-init loop); `"use client"` required.

### 2b. Scroll-triggered reveals (subtle)
**What:** elements fade/translate in when scrolled into view. **When:** section intros, project rows. **Keys to taste:** `once: true` (never re-trigger on scroll-back — re-animating reads cheap), trigger slightly early with `margin`, small offset only.

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
  transition={{ duration: 0.5, ease: ease.out }}
/>
```
- Equivalent imperative: `useInView(ref, { once: true, margin })` to gate state/video play/lazy work.
- **Don't** move elements horizontally across the viewport on scroll — distracting. Stick to small Y + opacity (+ optional blur).

### 2c. Scroll-linked progress
**What:** value tied directly to scroll position (reading progress bar, subtle header shrink). **When:** long pages, article views. `useScroll` + `useSpring` to smooth.

```tsx
const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
return <motion.div style={{ scaleX, transformOrigin: '0%' }} className="fixed top-0 h-px w-full bg-foreground" />;
```

### 2d. Pinned / sticky sections
**What:** a panel holds while content scrolls past. **Premium minimal version:** prefer **CSS `position: sticky`** (no JS, no jank) over GSAP ScrollTrigger pinning. Use a tall wrapper + sticky child; drive inner state with `useScroll({ target, offset })`.

```tsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
// <section ref={ref} className="h-[200vh]">
//   <div className="sticky top-0 h-screen"> ...drive opacity/x from scrollYProgress... </div>
```

### 2e. Parallax (tasteful = tiny offsets)
**What:** background/foreground move at slightly different rates for depth. **When:** one hero image or a single feature. **Rule:** offsets of **~20–80px max**, never huge. Anything dramatic looks like a template.

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const y = useTransform(scrollYProgress, [0, 1], ['-40px', '40px']); // subtle
// <motion.img style={{ y }} />
```

---

## 3. Micro-interactions

### 3a. Link underline wipe
**What:** underline grows from left (or wipes through) on hover instead of a static text-decoration. **When:** nav + inline links. Pure CSS, cheap, very premium.

```tsx
// scaleX wipe
<a className="relative inline-block
  after:absolute after:left-0 after:bottom-0 after:h-px after:w-full
  after:origin-left after:scale-x-0 after:bg-current
  after:transition-transform after:duration-300 after:ease-out-expo
  hover:after:scale-x-100">Work</a>
```
For a "wipe out then in" (underline exits right, re-enters left) use two pseudo-states with `transform-origin` swap on hover/leave.

### 3b. Magnetic button (use sparingly — 1–2 per site)
**What:** element drifts toward cursor with spring, snaps back on leave. **When:** the single primary CTA or a contact link. Overuse = gimmick.

```tsx
'use client';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef } from 'react';

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    const STRENGTH = 0.3; // small pull
    x.set((e.clientX - (r.left + r.width / 2)) * STRENGTH);
    y.set((e.clientY - (r.top + r.height / 2)) * STRENGTH);
  }
  function reset() { x.set(0); y.set(0); }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      style={{ x: sx, y: sy }} className="inline-block">
      {children}
    </motion.div>
  );
}
```
Disable under reduced-motion (skip listeners). Keep STRENGTH ≤ 0.35.

### 3c. Project row → thumbnail reveal on hover
**What:** a clean text list of projects; hovering a row reveals a small preview image (following cursor, or fixed corner) and dims siblings. The seyityilmaz/joseph.cv signature. **When:** work/index list. Feels editorial and content-first.

```tsx
'use client';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useState } from 'react';

export function ProjectList({ items }: { items: { title: string; img: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const my = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

  return (
    <ul onMouseMove={(e) => { mx.set(e.clientX + 16); my.set(e.clientY - 80); }}
        onMouseLeave={() => setActive(null)} className="group/list">
      {items.map((it, i) => (
        <li key={i} onMouseEnter={() => setActive(i)}
          className="border-b py-6 text-3xl transition-opacity duration-300
                     group-hover/list:opacity-40 hover:!opacity-100">
          {it.title}
        </li>
      ))}
      <AnimatePresence>
        {active !== null && (
          <motion.img key={active} src={items[active].img}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25, ease: ease.out }}
            style={{ left: mx, top: my }}
            className="pointer-events-none fixed z-50 hidden h-48 w-64 rounded object-cover lg:block" />
        )}
      </AnimatePresence>
    </ul>
  );
}
```
Sibling-dim via `group-hover` is the key premium detail.

### 3d. Custom cursor — done well vs badly
**Well:** a small dot/ring that springs toward the native cursor, **grows/labels on interactive elements** ("View"), respects pointer:fine only (skip on touch), keeps the native cursor as fallback. **Badly:** laggy big blob replacing the cursor entirely, hides on inputs, breaks accessibility, no reduced-motion fallback. **Recommendation for a minimal portfolio: usually skip it**; only add the context-label-on-hover variant if it earns its keep. Implement with `useSpring` on pointer coords; gate with `matchMedia('(pointer: fine)')`.

### 3e. focus-visible
**Always** style keyboard focus (premium = accessible). Don't kill outlines.
```css
:focus-visible { outline: 2px solid theme(colors.foreground); outline-offset: 2px; border-radius: 2px; }
```
Tailwind: `focus-visible:outline-2 focus-visible:outline-offset-2`. Pair with `focus:not(:focus-visible){outline:none}` if needed.

---

## 4. Typography motion

### 4a. Variable-font weight/width transition (the breathing weight)
**What:** transition `font-variation-settings` on hover/scroll. **When:** nav links, a big headline word. The classic gotcha — weight change reflows width ("button jumps wider"). Fix with `GRAD` axis (Roboto Flex) which changes apparent weight without width, or reserve width.

```css
.vf-link {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 0.4s cubic-bezier(0.16,1,0.3,1);
}
.vf-link:hover { font-variation-settings: 'wght' 650; }
```
Load the variable font via `next/font/local` with `axes`/`weight` range so a single file covers the range (no layout shift, self-hosted).

### 4b. Hover letter effect (restrained)
A single per-letter weight ripple on the name on hover can be one tasteful editorial moment — but **only one**, and subtle. Split letters, stagger a small `wght` bump with framer-motion `staggerChildren: 0.02`. Avoid bouncing/rotating letters.

### 4c. The single editorial moment
Pick **one** signature: a masked headline reveal, OR a variable-weight hover on the name, OR a scrubbed oversized word. Premium = one memorable gesture, not five.

---

## 5. Polish details (premium vs templated)

- **Easing/duration discipline:** see §0. ease-out entrances, <300ms interactions, <600ms reveals. Consistency across the site is itself the "expensive" signal.
- **prefers-reduced-motion everywhere:** global CSS kill-switch + per-component fallbacks.
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important; animation-iteration-count: 1 !important;
      transition-duration: .01ms !important; scroll-behavior: auto !important;
    }
  }
  ```
  In React, gate variants: if reduced, set offsets/blur to 0 and duration ~0.
- **No layout shift:** transform/opacity only; `aspect-ratio` on media; reserve font space (self-hosted `next/font`, `display: 'swap'` with sized fallback); never animate layout properties.
- **View Transitions API (page transitions):** browser cross-fades old→new DOM off the main thread. Next.js: experimental `experimental: { viewTransition: true }`, or stable via **`next-view-transitions`** (`<ViewTransitions>` wrap layout, use its `<Link>`). Default is a cross-fade; customize with `::view-transition-old/new` + `view-transition-name`. Degrades gracefully (no support = instant nav). Keep it a soft 200–300ms fade, not a slide circus.
  ```css
  ::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: 0.25s; animation-timing-function: cubic-bezier(0.16,1,0.3,1);
  }
  ```
- **Image loading / blur placeholders:** `next/image` with `placeholder="blur"`. Static imports auto-generate `blurDataURL`; for remote/CMS images generate LQIP with **`plaiceholder`** (sharp, server-side → base64). Fade from blur→sharp to avoid the jarring pop:
  ```tsx
  <Image src={src} fill alt="" placeholder="blur" blurDataURL={base64}
    onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
    className="opacity-0 transition-opacity duration-700 ease-out" />
  ```
  Keep blurDataURL tiny (≤10px source). Always set `sizes` + aspect-ratio wrapper.
- **Anti-aliasing / text rendering:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` (Tailwind `antialiased` on `<body>`). Improves perceived crispness of thin/variable type.
- **Grain / noise (subtle):** fixed full-screen overlay, SVG `feTurbulence` (no image request), very low opacity, `pointer-events:none`, optionally `mix-blend-mode: overlay/soft-light`. Also cures gradient banding.
  ```css
  .grain::after {
    content: ''; position: fixed; inset: 0; z-index: 50; pointer-events: none;
    opacity: 0.04; mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  ```
  baseFrequency ~0.6–0.9 for fine grain; opacity 0.03–0.06. Static (don't animate it — animated grain is GPU-hungry and gimmicky).

---

## 6. Recommended minimal library set

**Use:**
- **`motion`** (framer-motion, now published as `motion` / `motion/react`) — variants, `whileInView`, `useScroll`, `useSpring`, `AnimatePresence`. The workhorse.
- **`lenis`** (+ `lenis/react`) — only if smooth scroll benefits the whole site; optional.
- **`plaiceholder`** (+ `sharp`) — LQIP for remote images. Build-time, no runtime cost.
- **`next-view-transitions`** — clean page cross-fades (or native experimental flag).
- `next/font` (built-in) — self-host fonts incl. variable axes; zero CLS.
- Optional `SplitType` only if you need runtime line/word splitting beyond pre-split lines.

**Avoid (unless it IS the brand):**
- **Heavy WebGL / three.js / react-three-fiber / shaders** — huge bundle, battery/perf cost, screams "tech demo." Only if a 3D piece is the actual identity.
- **GSAP + ScrollTrigger** for a minimal portfolio — overkill; framer-motion `useScroll` + CSS `sticky` cover pinning/parallax. (GSAP is great, just heavier than needed here.)
- **Locomotive Scroll** — superseded by Lenis.
- **Per-letter animations on everything, autoplay video backgrounds, parallax on every section, animated grain, big custom-cursor blobs, looping marquees** — the "over-animated AI look."

**Bundle target:** motion (+ optional lenis) is essentially all the client-side motion JS you need. Everything else (underline wipes, sticky, focus, grain, reduced-motion) is CSS.

---

## Sources
- Emil Kowalski — Great Animations: https://emilkowal.ski/ui/great-animations
- Motion (framer-motion) variants/stagger: https://motion.dev/tutorials/react-variants , https://www.framer.com/motion/stagger/
- Clip-path text reveal: https://medium.com/@jurouhlar/simple-text-reveal-css-effect-using-clip-path-and-framer-motion-4d0866b1d949
- Lenis + Next.js: https://bridger.to/lenis-nextjs , https://www.gshukla.in/blog/smooth-scrolling-in-nextjs-with-lenis , https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap
- whileInView / useInView best practices: https://blog.logrocket.com/react-scroll-animations-framer-motion/ , https://ogblocks.dev/blog/react-scroll-animation-in-framer-motion
- Magnetic button / sticky cursor / project hover: https://blog.olivierlarose.com/tutorials/magnetic-button , https://blog.olivierlarose.com/tutorials/sticky-cursor
- Variable font animation: https://css-irl.info/variable-font-animation-with-css-and-splitting-js/ , https://ultimatedesigntools.com/blog/how-to-use-variable-fonts-css/
- View Transitions in Next.js: https://nextjs.org/docs/app/guides/view-transitions , https://github.com/shuding/next-view-transitions
- Image blur placeholders / plaiceholder: https://blog.olivierlarose.com/articles/placeholder-guide-using-next-image , https://nextjs.org/docs/pages/api-reference/components/image
- Grainy backgrounds (feTurbulence): https://css-tricks.com/grainy-gradients/ , https://ibelick.com/blog/create-grainy-backgrounds-with-css , https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/
