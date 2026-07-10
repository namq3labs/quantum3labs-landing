# Quantum3labs — Landing Page Redesign

Landing page redesign for Quantum3labs, art-directed after the technical/HUD aesthetic
of [noartmusic.com](https://www.noartmusic.com/) and recolored with the Quantum3labs
brand color **`#4D58FF`**. All copy is placeholder — final content TBD. Every image
slot is a flat light-gray placeholder (`.ph`) waiting for real imagery.

## Stack

Static site, no build step and no JS dependencies:

- Plain HTML / CSS / vanilla JS
- Canvas 2D for the rotating globe
- Fonts: Helvetica Neue / Inter Tight (display), Chivo Mono (UI — same as reference),
  Nanum Pen Script (handwritten logo)

## Run locally

Any static server works:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Structure

```
index.html        page markup (all sections)
css/style.css     design system + layout + interaction transitions
js/main.js        carousels, live clock, mobile menu
js/globe.js       orthographic wireframe globe with pulsing brand markers
```

## Sections & effects

Animation philosophy matches the reference site: **no load or scroll-triggered
animations** — only interaction transitions, all on the `cubic-bezier(0.16, 1, 0.3, 1)`
expo-out easing used by the reference.

| Section | Behavior |
| --- | --- |
| Hero | full-bleed image slot, handwritten logo with corner brackets, mission text + NEXT UP card |
| About | display headline + justified mono paragraphs |
| Work carousel | drag/snap scrolling, tick progress bar, prev/next, hover zoom on image slot |
| Globe | rotating wireframe globe (canvas), pulsing `#4D58FF` markers, live local time + rotating lat/lon readout |
| Labs carousel | product-style cards with `+` marks |
| Footer | framed grid with `[BRACKETED]` column heads |

Global: fixed viewport HUD corner brackets (blend-mode difference), brand square
markers, brand-blue text selection, mono uppercase type system.

## Swapping in real imagery

Replace any `<div class="ph"></div>` with an `<img>` (or set a `background-image`
on the same element). Slots: `.hero_media`, `.hero_next-thumb`, `.card_media .ph`,
`.product_frame .ph`.
