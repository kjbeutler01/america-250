import { useState, type CSSProperties, type ReactNode } from 'react'
import { Button } from '@astryxdesign/core/Button'
import Nav from './components/Nav'
import Fireworks from './components/Fireworks'
import WhyAmerica from './components/WhyAmerica'
import {
  BrandStar,
  CenturyMoon,
  ConnectedArcs,
  EraEdge,
  FoundingSeal,
  IndustryPoster,
} from './components/EraArt'
import { eras, type EraDef } from './data/eras'
import { useRevealOnScroll, useScrollStory } from './hooks/useScrollStory'
import { ambientScore } from './audio/music'

const ERA_CHROME: Record<
  string,
  { edge: 'torn' | 'saw' | 'steps' | 'horizon' | 'clean'; fill: string }
> = {
  founding: { edge: 'torn', fill: 'oklch(0.91 0.032 88)' },
  expansion: { edge: 'saw', fill: 'oklch(0.235 0.03 55)' },
  industry: { edge: 'steps', fill: 'oklch(0.33 0.062 232)' },
  century: { edge: 'horizon', fill: 'oklch(0.165 0.045 265)' },
  connected: { edge: 'clean', fill: 'oklch(1 0 0)' },
}

function EraSection({
  era,
  art,
  afterMoments,
}: {
  era: EraDef
  art?: ReactNode
  afterMoments?: ReactNode
}) {
  const chrome = ERA_CHROME[era.id]
  return (
    <section
      id={era.id}
      className={`era era-${era.id}`}
      data-year-start={era.yearStart}
      data-year-end={era.yearEnd}
      aria-labelledby={`${era.id}-title`}
    >
      <EraEdge variant={chrome.edge} fill={chrome.fill} />
      <div className="era-inner">
        <header data-reveal>
          <p className="era-years">{era.years}</p>
          <h2 id={`${era.id}-title`}>{era.title}</h2>
          <p className="era-lede">{era.lede}</p>
        </header>
        {art}
        <ol className="moments">
          {era.moments.map((m, i) => (
            <li
              key={m.year + m.title}
              className={m.flag ? 'moment moment-flag' : 'moment'}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 0.08}s` } as CSSProperties}
            >
              <span className="moment-year" aria-hidden="true">
                {m.year}
              </span>
              <div>
                <h3>
                  <span className="visually-hidden">{m.year} — </span>
                  {m.title}
                </h3>
                <p>{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
        {afterMoments}
        {era.quote && (
          <blockquote className="era-quote" data-reveal>
            <p>{era.quote.text}</p>
            <cite>{era.quote.cite}</cite>
          </blockquote>
        )}
      </div>
    </section>
  )
}

function GrowthFigure() {
  const rows = [
    { label: 'The original union', year: 1790, sqmi: '891,000 sq mi', pct: 25 },
    { label: 'Louisiana Purchase', year: 1803, sqmi: '1.72M sq mi', pct: 48 },
    { label: 'Sea to shining sea', year: 1848, sqmi: '2.99M sq mi', pct: 83 },
    { label: 'Alaska joins', year: 1867, sqmi: '3.6M sq mi', pct: 100 },
  ]
  return (
    <figure className="growth-figure" data-reveal>
      <figcaption>How the nation grew</figcaption>
      <div className="growth-rows">
        {rows.map((r) => (
          <div className="growth-row" key={r.year}>
            <div className="growth-label">
              <span>
                <strong>{r.year}</strong> · {r.label}
              </span>
              <span>{r.sqmi}</span>
            </div>
            <div className="growth-bar">
              <i style={{ '--pct': r.pct } as CSSProperties} />
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

export default function App() {
  const { activeId, year } = useScrollStory()
  const [musicOn, setMusicOn] = useState(false)
  useRevealOnScroll()

  const toggleMusic = () => setMusicOn(ambientScore.toggle())

  const beginJourney = () => {
    document.getElementById('founding')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const [founding, expansion, industry, century, connected] = eras

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to the story
      </a>
      <Nav activeId={activeId} year={year} musicOn={musicOn} onToggleMusic={toggleMusic} />

      <main id="main">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section id="top" className="hero" aria-label="America 250 — introduction">
          <Fireworks
            mode="ambient"
            className="hero-canvas"
            label="Fireworks blooming quietly over a night sky"
          />
          <div className="hero-content">
            <p className="hero-dates">1776 · 2026</p>
            <div className="hero-num" aria-hidden="true">
              250
            </div>
            <h1>Two and a half centuries of the American experiment</h1>
            <p className="hero-sub">
              A history, a birthday card, and an owner's manual — the whole improbable story of
              America, told era by era, from a room in Philadelphia to the edge of the future.
            </p>
            <div className="hero-cta">
              <Button label="Begin in 1776" variant="primary" size="lg" onClick={beginJourney} />
            </div>
          </div>
          <div className="hero-scroll-hint" aria-hidden="true">
            SCROLL ↓
          </div>
        </section>

        {/* ───────────────────────── ERAS ───────────────────────── */}
        <EraSection era={founding} art={<FoundingSeal />} />
        <EraSection era={expansion} afterMoments={<GrowthFigure />} />
        <EraSection era={industry} art={<IndustryPoster />} />
        <EraSection era={century} art={<CenturyMoon />} />
        <EraSection era={connected} afterMoments={<ConnectedArcs />} />

        {/* ──────────────────── WHAT MAKES AMERICA ─────────────── */}
        <WhyAmerica />

        {/* ───────────────────────── FINALE ─────────────────────── */}
        <section id="finale" className="finale" aria-labelledby="finale-title">
          <Fireworks
            mode="grand"
            interactive
            className="finale-canvas"
            label="A grand fireworks finale — click or tap anywhere to launch your own"
          />
          <div className="finale-content">
            <div className="finale-wordmark" aria-hidden="true">
              <span className="l-founding">A</span>
              <span className="l-garamond">M</span>
              <span className="l-slab">E</span>
              <span className="l-poster">R</span>
              <span className="l-poster">I</span>
              <span className="l-modern">C</span>
              <span className="l-modern">A</span>
            </div>
            <h2 id="finale-title">Happy 250th, America.</h2>
            <p className="finale-quote">
              “We shall nobly save, or meanly lose, the last best hope of earth.”
              <cite>Abraham Lincoln · 1862</cite>
            </p>
            <p className="finale-hint">CLICK OR TAP THE SKY TO LAUNCH A FIREWORK</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          <BrandStar /> Made for the Semiquincentennial · July 4, 2026. Navigation built with{' '}
          <a href="https://github.com/facebook/astryx" target="_blank" rel="noreferrer">
            Astryx by Meta
          </a>
          . The ambient score is generated live in your browser — no recordings, just math.
        </p>
      </footer>
    </>
  )
}
