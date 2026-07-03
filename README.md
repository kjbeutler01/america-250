# America 250 · 1776–2026

A celebration website for the United States Semiquincentennial — 250 years of
American history, invention, and ideas, told as one long scroll where **the
design itself evolves era by era**: iron-gall ink on parchment for the
Founding, wood-type letterpress for Westward Expansion, WPA poster style for
the Age of Industry, atomic-age midnight for the American Century, and crisp
digital white for the Connected Age.

## Features

- **Astryx navigation** — top nav, mobile drawer, and facet switcher built
  with [Astryx](https://github.com/facebook/astryx), Meta's open-source React
  design system
- **Live year ticker** — the nav counts from 1776 to 2026 as you scroll
- **Canvas fireworks** — ambient bursts on the hero, a grand interactive
  finale (click the sky to launch your own)
- **Generated ambient score** — a synthesized Americana soundtrack via the
  Web Audio API; no audio files, strictly opt-in from the nav
- **Accessible** — semantic landmarks, keyboard navigation, WCAG AA contrast,
  full `prefers-reduced-motion` support (static starfields, no reveals)

## Develop

```bash
npm install
npm run dev
```

## Deploy

### Railway

Import the GitHub repo at [railway.com/new](https://railway.com/new) — Railway
detects the app automatically: it runs `npm run build`, then `npm start`,
which serves the static `dist/` folder on Railway's `$PORT` via
[`serve`](https://www.npmjs.com/package/serve). No configuration needed;
generate a public domain under **Settings → Networking**.

### Vercel (alternative)

```bash
npx vercel
```

Vercel auto-detects Vite: build command `npm run build`, output `dist`.
