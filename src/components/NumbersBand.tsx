import { useEffect, useRef, useState } from 'react'

interface StatDef {
  to: number
  format: (v: number) => string
  label: string
  then: string
}

const STATS: StatDef[] = [
  {
    to: 50,
    format: (v) => Math.round(v).toString(),
    label: 'states in the union',
    then: '13 in 1776',
  },
  {
    to: 340,
    format: (v) => `${Math.round(v)}M`,
    label: 'Americans',
    then: '2.5M in 1776',
  },
  {
    to: 3.8,
    format: (v) => `${v.toFixed(1)}M`,
    label: 'square miles',
    then: '0.4M in 1776',
  },
  {
    to: 250,
    format: (v) => Math.round(v).toString(),
    label: 'years of the experiment',
    then: 'and counting',
  },
]

function Stat({ stat }: { stat: StatDef }) {
  // renders the final value by default; count-up is a motion-OK enhancement
  const [display, setDisplay] = useState(stat.format(stat.to))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const dur = 1800
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / dur)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(stat.format(stat.to * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [stat])

  return (
    <div className="stat">
      <span ref={ref} className="stat-value">
        {display}
      </span>
      <span className="stat-label">{stat.label}</span>
      <span className="stat-then">{stat.then}</span>
    </div>
  )
}

export default function NumbersBand() {
  return (
    <div className="numbers-band" role="group" aria-label="The experiment, by the numbers">
      {STATS.map((s) => (
        <Stat key={s.label} stat={s} />
      ))}
    </div>
  )
}
