import { useEffect, useRef, useState } from 'react'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { facets } from '../data/eras'
import NumbersBand from './NumbersBand'

/**
 * "What Makes America" — six facets of the country explained, switched with
 * an Astryx SegmentedControl.
 */
export default function WhyAmerica() {
  const [facetId, setFacetId] = useState(facets[0].id)
  const [anim, setAnim] = useState<'in' | ''>('')
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setAnim('in')
    const t = window.setTimeout(() => setAnim(''), 550)
    return () => window.clearTimeout(t)
  }, [facetId])

  const facet = facets.find((f) => f.id === facetId) ?? facets[0]

  return (
    <section id="why" className="era era-why" aria-labelledby="why-title">
      <div className="era-inner">
        <header data-reveal>
          <p className="era-years">1776 – FOREVER</p>
          <h2 id="why-title">What Makes America, America</h2>
          <p className="era-lede">
            Beyond the timeline — six threads that run through all 250 years, and explain why
            this particular experiment turned out unlike any other. Each one older than it
            looks.
          </p>
        </header>

        <NumbersBand />

        <div className="why-switcher" data-reveal>
          <div className="why-tabs-scroll">
            <SegmentedControl
              value={facetId}
              onChange={setFacetId}
              label="Choose a facet of America to explore"
              size="lg"
            >
              {facets.map((f) => (
                <SegmentedControlItem key={f.id} value={f.id} label={f.label} />
              ))}
            </SegmentedControl>
          </div>

          <div className="why-panel" data-anim={anim} key={facet.id}>
            <h3>{facet.heading}</h3>
            {facet.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul className="why-facts">
              {facet.facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
