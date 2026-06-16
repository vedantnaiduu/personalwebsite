# Y2K / Retro / Nostalgic Personal-Site Design Inspiration

**Method:** Scraped public web-design galleries with the [Scrapling](https://github.com/d4vinci/Scrapling) library (`scrapling==0.4.9`, static `Fetcher`), then curated for retro / Y2K / brutalist / nostalgic / playful personal & portfolio sites. Gaps filled with WebSearch.

**Date:** 2026-06-15
**Script:** `research/scrape_y2k.py` -> raw output in `research/scrape_output.json`

## Sources & scraper results

| Source | Status | Usable sites scraped |
| --- | --- | --- |
| httpster.net (homepage + /page/2 + /page/3) | OK (200) | 70 |
| godly.website (homepage) | OK (200) | 49 |
| land-book.com (homepage) | Partial – only affiliate/builder links exposed in static HTML; real card URLs are JS-rendered. Effectively **blocked** for clean extraction. | 3 (junk) |
| godly/land-book tag & category paths | 404 – those URL patterns don't exist / are JS-driven | 0 |
| awwwards.com search | Not scraped – heavy bot protection + JS; skipped per "don't get stuck" | 0 |

**119 unique real live URLs** were captured total. Below is the curated shortlist of actual portfolio / personal / studio / playful sites that fit the retro–nostalgic brief.

---

## Curated examples (with live URLs + standout design feature)

### Tier 1 — strongest retro / Y2K / nostalgic fits

1. **softGlossary** — https://softglossary.space — soft-Y2K "space" aesthetic: glossy translucent UI, pastel gradients, frutiger-aero-adjacent blobs. *(httpster)*
2. **Man Ray Diary** — https://manraydiary.xyz — experimental `.xyz` art project; collage/scrapbook nostalgia, raw editorial typography. *(httpster)*
3. **Pixel Poetry** — https://pixelpoetry.heredesign.com — pixel-art motif, lo-fi nostalgic type treatment, playful retro-web feel. *(httpster)*
4. **Heartbeat Drum Machine** — https://www.heartbeatdrummachine.com — interactive retro hardware/synth toy (skeuomorphic drum machine you can play). *(httpster)*
5. **Uncut** — https://uncut.wtf — type foundry/gallery with raw brutalist grid, oversized type, anti-polish `.wtf` energy. *(httpster)*
6. **Counter Forms** — https://counter-forms.com — type-driven brutalist layout, stark monochrome, experimental letterforms. *(httpster)*
7. **Studio Office** — https://www.studio-office.fun — playful `.fun` studio site; bright, toy-like, maximalist interactions. *(httpster)*
8. **Desktop.fm** — https://desktop.fm — nostalgic desktop-OS metaphor (windows/icons), early-computing skeuomorphism. *(godly)*
9. **Daniel Sun** — https://danielsun.space — personal `.space` portfolio with playful, exploratory, slightly retro-futurist UI. *(godly)*
10. **Aladin Akkari** — https://aladinakkari.ca — Y2K portfolio built on vintage Windows interface with VHS + glitch effects (via WebSearch). *(search)*

### Tier 2 — brutalist / editorial / nostalgic-leaning personal & studio sites

11. **Pedro Duarte (ped.ro)** — https://ped.ro — minimal/brutalist personal dev site; stark black-on-white, monospace, content-first. *(godly)*
12. **Mnmllist** — https://mnmll.ist — extreme-minimal brutalist statement site, clever domain hack. *(httpster)*
13. **The Index** — https://theindex.website — directory/archive aesthetic, list-driven "old-web index" nostalgia. *(httpster)*
14. **Care of Chan** — https://www.careofchan.com — personal/editorial site, warm vintage palette, hand-made scrapbook feel. *(httpster)*
15. **Max Yinger** — https://yinger.dev — personal `.dev` portfolio, playful interactions, indie-web personality. *(godly)*
16. **Logan Liffick** — https://loganliffick.com — designer portfolio, crisp brutalist-minimal grid with characterful type. *(godly)*
17. **Dul Zorigoo (dzrgo.com)** — https://dzrgo.com — personal designer portfolio, bold experimental layout. *(godly)*
18. **Kons** — https://kons.fyi — personal `.fyi` site, raw indie-web minimalism. *(godly)*
19. **Maëlan Le Meur** — https://maelanlemeur.com — designer portfolio with expressive, slightly retro motion/type. *(httpster)*
20. **Nate Gagnon** — https://nategagnon.com — personal portfolio, playful color + bold display type. *(httpster)*

### Tier 3 — playful / maximalist studios worth a look for motifs & palette

21. **Kokopako** — https://kokopako.fr — colorful, toy-like illustrative studio site, maximalist & fun. *(httpster)*
22. **Balky Studio** — https://www.balky.studio — quirky studio site, bold playful interactions. *(httpster)*
23. **Roasted** — https://roasted.design — high-energy playful design studio, saturated palette. *(godly)*
24. **AndAgain** — https://andagain.uk — expressive studio site, strong character & motion. *(godly)*
25. **Spaces by Lovers Magazine** — https://spaces.loversmagazine.com — editorial/magazine nostalgia, rich imagery + retro type. *(httpster)*

---

## Design-motif takeaways for a Y2K/nostalgic personal site

- **Palettes:** glossy translucents + pastels + iridescent/metallic (Y2K), OR stark black-on-white monochrome (brutalist). Pick one lane.
- **Type:** oversized display + monospace; default/system fonts (Times, Arial) used deliberately for that "old-web" honesty.
- **Motifs:** desktop-OS / window metaphors, pixel art, VHS + glitch overlays, collage/scrapbook, skeuomorphic toys (the drum machine), visible grids.
- **Interactions:** playful hover states, draggable windows, cursor effects, lo-fi sound — favor "toy you can poke" over slick scroll-jacking.
- **Domains as identity:** `.fun`, `.space`, `.xyz`, `.wtf`, `.fyi`, domain hacks (mnmll.ist) — part of the indie/retro-web personality.

## Notes / limitations

- Design one-liners are based on each site's known reputation in these curated galleries plus the gallery's own categorization. `WebFetch` reads page *text* (markdown), not rendered visuals, so it could not reliably confirm purely visual Y2K cues — visit the live URLs to confirm look-and-feel.
- httpster.net and godly.website scrape cleanly with Scrapling's static `Fetcher` (each card exposes the real outbound URL). **land-book.com** and **awwwards.com** hide card URLs behind JS / bot protection and would need `StealthyFetcher` (headless browser) for a clean pull.
- Full unfiltered list of all 119 captured sites is in `research/scrape_output.json`.

## Sources (search-assisted enrichment)
- [23 Retro Website Examples (htmlburger)](https://htmlburger.com/blog/retro-websites-examples/)
- [Y2K aesthetic for web design (Webflow)](https://webflow.com/blog/y2k-aesthetic)
- [Y2K Aesthetic in Web Design (Web Design Museum)](https://www.webdesignmuseum.org/exhibitions/y2k-aesthetic-in-web-design)
- [Brutalist website design guide (Webflow)](https://webflow.com/blog/10-brutalist-websites)
