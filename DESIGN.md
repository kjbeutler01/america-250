# Design

## Concept

**The design is the timeline.** Each era of American history is its own
visual world; scrolling through the site is scrolling through 250 years of
American graphic design. Era transitions are handled by shaped SVG edges
(torn paper → sawtooth → stepped skyline → horizon curve → clean diagonal).

## Color

All color in OKLCH. Site chrome (nav, hero, finale) runs dark on deep
federal indigo; each era carries its own palette:

| Surface | Background | Ink | Accent |
| --- | --- | --- | --- |
| Chrome / hero / finale | `oklch(0.135 0.02 279)` night indigo | `oklch(0.965 0.005 279)` star white | `oklch(0.445–0.68 0.17–0.21 279)` brand violet-indigo; `oklch(0.58 0.2 22)` glory red |
| Founding (1775–1800) | `oklch(0.91 0.032 88)` parchment | `oklch(0.26 0.03 55)` iron-gall brown | `oklch(0.43 0.14 27)` oxblood |
| Expansion (1800–1870) | `oklch(0.235 0.03 55)` dark walnut | `oklch(0.91 0.04 85)` aged paper | `oklch(0.78 0.125 82)` gold leaf |
| Industry (1870–1945) | `oklch(0.33 0.062 232)` petrol blue | `oklch(0.95 0.012 90)` poster white | `oklch(0.63 0.175 38)` poster red · `oklch(0.8 0.125 85)` mustard |
| American Century (1945–1991) | `oklch(0.165 0.045 265)` space navy | `oklch(0.94 0.008 265)` | `oklch(0.8 0.115 200)` atomic aqua · `oklch(0.66 0.19 25)` |
| Connected Age (1991–2026) | `oklch(1 0 0)` pure white | `oklch(0.18 0.02 279)` | brand indigo |

Red, white, and blue appear as deliberate accents (nav star, hero
misregistration, firework hues) — never as wallpaper.

## Typography

One era, one voice:

- **IM Fell English** — Founding display (a literal 17th–18th c. face)
- **EB Garamond** — Founding & Expansion body
- **Bevan** — Expansion wood-type slab headlines
- **Big Shoulders Display** — Industry poster headlines, hero "250" numeral
- **Archivo** (variable 400–900) — Century/Connected/chrome UI and body

The finale wordmark spells AMERICA with one letter per era typeface.

## Components & tokens

Astryx (`@astryxdesign/core` + built neutral theme, dark mode) supplies
TopNav, MobileNav/SideNavItem, SegmentedControl, Button, IconButton,
ToggleButton. Brand tokens are overridden in plain (unlayered) CSS on
`[data-astryx-theme]` in `src/index.css` — no runtime theme injection.

Astryx's reset paints `:where(p)` with theme text color; era sections restore
inheritance via an unlayered `color: inherit; font-family: inherit` rule.

## Motion

- Scroll reveals: opacity + 26px translate, `cubic-bezier(0.16,1,0.3,1)`,
  armed only via JS when motion is allowed (content visible by default)
- Canvas fireworks pause off-screen and on hidden tabs; static starfield
  under `prefers-reduced-motion`
- Facet panel crossfade 0.5s; disabled under reduced motion

## Signature elements

- Nav year ticker (1776→2026, interpolated per-section by scroll)
- Hero "250" with red/blue screen-print misregistration (pseudo-elements,
  `isolation: isolate`)
- Per-era SVG artwork: 13-star engraved seal, growth bars, WPA gear-sun
  skyline, Apollo trajectory, connected arcs
- Generated Web Audio score: triangle-wave pads cycling D–G–Bm–A, sine sub
  root, pentatonic bell sparkles through feedback delay
