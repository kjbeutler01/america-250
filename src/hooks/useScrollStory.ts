import { useEffect, useState } from 'react'

/**
 * Tracks the scrolling narrative: which era section is active (for nav
 * highlighting) and the interpolated "current year" (for the nav ticker).
 * Sections declare data-year-start / data-year-end; the year interpolates
 * across each section's height at the viewport's reading line.
 */
export function useScrollStory() {
  const [activeId, setActiveId] = useState<string>('')
  const [year, setYear] = useState(1776)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-year-start]'),
    )
    if (sections.length === 0) return

    let raf = 0
    const update = () => {
      raf = 0
      const readingLine = window.innerHeight * 0.45
      let current: HTMLElement | null = null

      for (const s of sections) {
        const r = s.getBoundingClientRect()
        if (r.top <= readingLine && r.bottom > readingLine) {
          current = s
          break
        }
      }

      if (!current) {
        const first = sections[0].getBoundingClientRect()
        if (first.top > readingLine) {
          // above the timeline (hero)
          setActiveId('')
          setYear(1776)
        } else {
          // past the last era (why / finale)
          const last = sections[sections.length - 1]
          const why = document.getElementById('why')
          const inWhy = why ? why.getBoundingClientRect().top <= readingLine : false
          setActiveId(inWhy ? 'why' : last.id)
          setYear(Number(last.dataset.yearEnd))
        }
        return
      }

      const r = current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (readingLine - r.top) / r.height))
      const y0 = Number(current.dataset.yearStart)
      const y1 = Number(current.dataset.yearEnd)
      setYear(Math.round(y0 + (y1 - y0) * progress))
      setActiveId(current.id)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return { activeId, year }
}

/**
 * Arms [data-reveal] elements for a scroll-in reveal. Content is fully
 * visible without JS or under prefers-reduced-motion; this only adds the
 * entrance for motion-OK visitors.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    for (const el of els) {
      // skip anything already in view on load — no pop-in on arrival
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) continue
      el.classList.add('reveal-armed')
      io.observe(el)
    }
    return () => io.disconnect()
  }, [])
}
