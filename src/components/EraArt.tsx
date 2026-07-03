import type { ReactNode } from 'react'
/**
 * Era artwork — hand-drawn SVG in each era's visual language, plus the
 * "edge" dividers that hand one era's world to the next.
 */

// five-point star path centered at (cx, cy)
function starPath(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`)
  }
  return `M${pts.join('L')}Z`
}

/* ─── section edges ─────────────────────────────────────────────────────── */

const EDGE_PATHS: Record<string, string> = {
  // torn paper — irregular deckle
  torn: 'M0,60 L0,34 L48,40 L96,28 L150,38 L210,24 L268,36 L330,26 L390,40 L455,30 L520,42 L580,28 L640,38 L700,26 L760,40 L820,30 L880,42 L940,28 L1000,38 L1060,26 L1120,40 L1180,30 L1240,42 L1300,28 L1360,38 L1410,30 L1440,36 L1440,60 Z',
  // letterpress sawtooth
  saw: 'M0,60 L0,36 L36,20 L72,36 L108,20 L144,36 L180,20 L216,36 L252,20 L288,36 L324,20 L360,36 L396,20 L432,36 L468,20 L504,36 L540,20 L576,36 L612,20 L648,36 L684,20 L720,36 L756,20 L792,36 L828,20 L864,36 L900,20 L936,36 L972,20 L1008,36 L1044,20 L1080,36 L1116,20 L1152,36 L1188,20 L1224,36 L1260,20 L1296,36 L1332,20 L1368,36 L1404,20 L1440,36 L1440,60 Z',
  // stepped skyline
  steps: 'M0,60 L0,40 L120,40 L120,22 L260,22 L260,44 L400,44 L400,16 L540,16 L540,38 L700,38 L700,24 L840,24 L840,46 L980,46 L980,18 L1120,18 L1120,40 L1260,40 L1260,28 L1380,28 L1380,44 L1440,44 L1440,60 Z',
  // horizon curve
  horizon: 'M0,60 L0,48 Q720,4 1440,48 L1440,60 Z',
  // clean diagonal
  clean: 'M0,60 L0,52 L1440,20 L1440,60 Z',
}

export function EraEdge({ variant, fill }: { variant: keyof typeof EDGE_PATHS; fill: string }) {
  return (
    <svg className="era-edge" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
      <path d={EDGE_PATHS[variant]} fill={fill} />
    </svg>
  )
}

/* ─── Era I · engraved radiant sun with 13 stars ────────────────────────── */

export function FoundingSeal() {
  const rays: ReactNode[] = []
  for (let i = 0; i < 48; i++) {
    const a = (Math.PI * 2 * i) / 48
    const r1 = i % 2 === 0 ? 62 : 70
    const r2 = i % 2 === 0 ? 96 : 84
    rays.push(
      <line
        key={i}
        x1={170 + r1 * Math.cos(a)}
        y1={170 + r1 * Math.sin(a)}
        x2={170 + r2 * Math.cos(a)}
        y2={170 + r2 * Math.sin(a)}
        stroke="currentColor"
        strokeWidth="1.2"
      />,
    )
  }
  const stars: ReactNode[] = []
  for (let i = 0; i < 13; i++) {
    const a = (Math.PI * 2 * i) / 13 - Math.PI / 2
    stars.push(
      <path
        key={i}
        d={starPath(170 + 132 * Math.cos(a), 170 + 132 * Math.sin(a), 9, 3.6)}
        fill="currentColor"
        className={i === 0 ? 'seal-accent' : undefined}
      />,
    )
  }
  return (
    <svg
      className="founding-seal"
      viewBox="0 0 340 340"
      role="img"
      aria-label="An engraved radiant sun encircled by thirteen stars, one for each original colony"
    >
      <circle cx="170" cy="170" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="170" cy="170" r="114" fill="none" stroke="currentColor" strokeWidth="0.8" />
      {rays}
      <circle cx="170" cy="170" r="46" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="170" cy="170" r="40" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text
        x="170"
        y="163"
        textAnchor="middle"
        fontFamily="IM Fell English, serif"
        fontSize="22"
        fill="currentColor"
      >
        JULY 4
      </text>
      <text
        x="170"
        y="188"
        textAnchor="middle"
        fontFamily="IM Fell English, serif"
        fontSize="20"
        className="seal-accent"
        fill="currentColor"
      >
        1776
      </text>
      {stars}
    </svg>
  )
}

/* ─── Era III · WPA poster: gear-sun over a stepped skyline ─────────────── */

export function IndustryPoster() {
  const rays: ReactNode[] = []
  for (let i = 0; i < 12; i++) {
    const a = Math.PI + (Math.PI * i) / 11
    const x = 450 + 420 * Math.cos(a)
    const y = 300 + 300 * Math.sin(a)
    rays.push(
      <path key={i} d={`M450,300 L${x.toFixed(0)},${y.toFixed(0)}`} stroke="oklch(0.38 0.06 232)" strokeWidth="26" />,
    )
  }
  const teeth: ReactNode[] = []
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI * 2 * i) / 16
    teeth.push(
      <rect
        key={i}
        x={-9}
        y={-96}
        width={18}
        height={22}
        fill="oklch(0.8 0.125 85)"
        transform={`translate(450,300) rotate(${(a * 180) / Math.PI})`}
      />,
    )
  }
  return (
    <svg
      className="industry-poster"
      viewBox="0 0 900 420"
      role="img"
      aria-label="A WPA-style poster: a gear-toothed sun rising behind a stepped city skyline"
    >
      {rays}
      <g>{teeth}</g>
      <circle cx="450" cy="300" r="84" fill="oklch(0.8 0.125 85)" />
      <circle cx="450" cy="300" r="58" fill="oklch(0.63 0.175 38)" />
      {/* skyline */}
      <path
        d="M0,420 L0,340 L70,340 L70,300 L120,300 L120,352 L180,352 L180,262 L212,262 L212,240 L244,240 L244,262 L276,262 L276,352 L340,352 L340,286 L400,286 L400,330 L430,330 L430,206 L444,182 L458,206 L458,330 L500,330 L500,282 L560,282 L560,352 L620,352 L620,246 L656,246 L656,222 L692,222 L692,352 L760,352 L760,306 L820,306 L820,340 L900,340 L900,420 Z"
        fill="oklch(0.2 0.045 240)"
      />
      {/* window lights */}
      {[
        [196, 280],
        [228, 262],
        [258, 290],
        [360, 302],
        [438, 240],
        [520, 300],
        [636, 268],
        [672, 246],
        [782, 322],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="12" fill="oklch(0.8 0.125 85)" />
      ))}
      {/* banner */}
      <rect x="0" y="386" width="900" height="34" fill="oklch(0.63 0.175 38)" />
      <text
        x="450"
        y="410"
        textAnchor="middle"
        fontFamily="Big Shoulders Display, sans-serif"
        fontWeight="800"
        fontSize="26"
        letterSpacing="12"
        fill="oklch(0.97 0.01 90)"
      >
        AMERICA BUILDS
      </text>
    </svg>
  )
}

/* ─── Era IV · the moon shot ────────────────────────────────────────────── */

const MOON_STARS: [number, number, number][] = Array.from({ length: 70 }, (_, i) => {
  // deterministic golden-angle scatter
  const x = (i * 137.508) % 860
  const y = ((i * 89.73 + 40) % 340) + 10
  const r = 0.6 + ((i * 7) % 10) / 9
  return [x, y, r]
})

export function CenturyMoon() {
  return (
    <svg
      className="century-moon"
      viewBox="0 0 860 380"
      role="img"
      aria-label="A dashed trajectory arcs from Earth to the Moon, tracing the Apollo 11 flight"
    >
      {MOON_STARS.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="oklch(0.9 0.01 265)" opacity={0.25 + (i % 5) * 0.12} />
      ))}
      {/* earth limb, bottom left */}
      <circle cx="-40" cy="470" r="200" fill="oklch(0.42 0.12 250)" />
      <circle cx="-40" cy="470" r="200" fill="none" stroke="oklch(0.8 0.115 200)" strokeWidth="2" />
      {/* trajectory */}
      <path
        d="M96,330 Q400,20 690,150"
        fill="none"
        stroke="oklch(0.8 0.115 200)"
        strokeWidth="2"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      {/* capsule */}
      <g transform="translate(400,96) rotate(24)">
        <path d="M0,-9 L8,7 L-8,7 Z" fill="oklch(0.94 0.008 265)" />
        <rect x="-3" y="7" width="6" height="5" fill="oklch(0.66 0.19 25)" />
      </g>
      {/* moon */}
      <circle cx="720" cy="140" r="64" fill="oklch(0.86 0.012 90)" />
      <circle cx="700" cy="120" r="11" fill="oklch(0.76 0.015 90)" />
      <circle cx="742" cy="158" r="8" fill="oklch(0.76 0.015 90)" />
      <circle cx="716" cy="168" r="5" fill="oklch(0.76 0.015 90)" />
      <circle cx="748" cy="118" r="5" fill="oklch(0.76 0.015 90)" />
      {/* landing star */}
      <path d={starPath(700, 148, 6, 2.4)} fill="oklch(0.66 0.19 25)" />
    </svg>
  )
}

/* ─── Era V · the connected arcs ────────────────────────────────────────── */

export function ConnectedArcs() {
  const nodes = Array.from({ length: 13 }, (_, i) => 60 + i * 65)
  const arcs: ReactNode[] = []
  const pairs: [number, number][] = [
    [0, 4],
    [1, 7],
    [2, 12],
    [3, 9],
    [0, 12],
    [5, 10],
    [4, 8],
    [6, 11],
    [2, 6],
    [8, 12],
    [1, 3],
    [7, 10],
  ]
  pairs.forEach(([a, b], i) => {
    const x1 = nodes[a]
    const x2 = nodes[b]
    const rx = Math.abs(x2 - x1) / 2
    const ry = Math.min(rx * 0.62, 230)
    arcs.push(
      <path
        key={i}
        d={`M${x1},260 A${rx},${ry} 0 0 1 ${x2},260`}
        fill="none"
        stroke="currentColor"
        strokeWidth={i % 3 === 0 ? 2 : 1}
        opacity={0.25 + (i % 4) * 0.18}
      />,
    )
  })
  return (
    <svg
      className="connected-arcs"
      viewBox="0 0 900 290"
      role="img"
      aria-label="A minimal network diagram: thirteen nodes joined by arcs, the many made one"
    >
      {arcs}
      {nodes.map((x, i) => (
        <circle key={i} cx={x} cy={260} r={i % 4 === 0 ? 6 : 4} fill="currentColor" />
      ))}
      <line x1="40" y1="260" x2="860" y2="260" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

/* ─── nav star ──────────────────────────────────────────────────────────── */

export function BrandStar() {
  return (
    <svg className="nav-brand-star" viewBox="0 0 100 100" aria-hidden="true">
      <path d={starPath(50, 52, 46, 18)} fill="currentColor" />
    </svg>
  )
}
