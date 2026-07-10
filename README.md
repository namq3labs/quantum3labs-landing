# Quantum3labs — Landing Page Redesign

Landing page redesign for Quantum3labs, art-directed after the technical/HUD aesthetic
of [noartmusic.com](https://www.noartmusic.com/) and recolored with the Quantum3labs
brand color **`#4D58FF`**. All copy and imagery are placeholders — final content TBD.

## Stack

Static site, no build step:

- Plain HTML / CSS / vanilla JS
- [GSAP + ScrollTrigger](https://gsap.com/) (CDN) for intro and scroll animations
- Canvas 2D for the hero particle field, rotating globe, and generative placeholder art
- Google Fonts: Archivo (display), Chivo Mono (UI), Permanent Marker (script logo)

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
css/style.css     design system + layout + effects
js/main.js        preloader, hero canvas, carousels, GSAP reveals, live clock
js/globe.js       orthographic wireframe globe with pulsing brand markers
js/art.js         deterministic generative placeholder art for cards
```

## Sections & effects

| Section | Effects |
| --- | --- |
| Preloader | counter `[000]→[100]`, slide-up exit |
| Hero | particle field + cursor-reactive brand glow, film grain, perspective grid, script logo with corner brackets, parallax on scroll |
| About | masked headline line-reveals, justified mono paragraphs |
| Work carousel | drag/snap scrolling, tick progress bar, prev/next, hover zoom |
| Globe | rotating wireframe globe (canvas), pulsing `#4D58FF` markers, live local time + rotating lat/lon readout |
| Labs carousel | product-style cards with `+` corner marks |
| Footer | framed grid with `[BRACKETED]` column heads |

Global: fixed viewport HUD corner brackets (blend-mode difference), blinking square
markers, brand-blue text selection, mono uppercase type system.
