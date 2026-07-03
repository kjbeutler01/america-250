import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number // 0 = red, 1 = white-gold, 2 = blue-violet
}

interface Rocket {
  x: number
  y: number
  vy: number
  targetY: number
  hue: number
}

const COLORS = [
  (a: number) => `oklch(0.68 0.21 22 / ${a})`, // glory red
  (a: number) => `oklch(0.92 0.06 95 / ${a})`, // white-gold
  (a: number) => `oklch(0.72 0.17 285 / ${a})`, // indigo-violet
]

interface Props {
  mode: 'ambient' | 'grand'
  interactive?: boolean
  className?: string
  label: string
}

/**
 * Canvas fireworks. "ambient" launches a sparse shell every few seconds;
 * "grand" is finale density and (optionally) launches where you click.
 * Under prefers-reduced-motion it renders a static starfield instead.
 */
export default function Fireworks({ mode, interactive = false, className, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // static starfield — always drawn; the only mode under reduced motion
    const stars: { x: number; y: number; r: number; a: number }[] = []
    const seedStars = () => {
      stars.length = 0
      const n = Math.round((width * height) / 9000)
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.2 + 0.3,
          a: Math.random() * 0.5 + 0.15,
        })
      }
    }
    seedStars()

    const drawStars = () => {
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.95 0.01 279 / ${s.a})`
        ctx.fill()
      }
    }

    if (reduceMotion) {
      ctx.clearRect(0, 0, width, height)
      drawStars()
      const onResize = () => {
        resize()
        seedStars()
        ctx.clearRect(0, 0, width, height)
        drawStars()
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const particles: Particle[] = []
    const rockets: Rocket[] = []
    let raf = 0
    let running = false
    let lastLaunch = 0
    let launchWait = 0
    let last = performance.now()

    const nextWait = () =>
      mode === 'grand' ? 900 + Math.random() * 1600 : 3200 + Math.random() * 3000

    const launch = (x?: number, ty?: number) => {
      rockets.push({
        x: x ?? width * (0.15 + Math.random() * 0.7),
        y: height + 8,
        vy: -(height * (0.55 + Math.random() * 0.25)) / 1.4,
        targetY: ty ?? height * (0.18 + Math.random() * 0.3),
        hue: Math.floor(Math.random() * 3),
      })
    }

    const burst = (x: number, y: number, hue: number) => {
      const n = mode === 'grand' ? 130 : 70
      const power = mode === 'grand' ? 340 : 220
      for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 * i) / n + Math.random() * 0.12
        const speed = power * (0.3 + Math.random() * 0.7)
        const maxLife = 1.4 + Math.random() * 1.4
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          size: 1.6 + Math.random() * 2,
          hue,
        })
      }
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)
      drawStars()

      if (now - lastLaunch > launchWait) {
        launch()
        lastLaunch = now
        launchWait = nextWait()
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.y += r.vy * dt
        if (r.y <= r.targetY) {
          burst(r.x, r.y, r.hue)
          rockets.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'oklch(0.95 0.04 95 / 0.9)'
        ctx.fill()
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= dt
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        p.vy += 60 * dt // gravity
        p.vx *= 1 - 0.65 * dt // drag
        p.vy *= 1 - 0.35 * dt
        p.x += p.vx * dt
        p.y += p.vy * dt
        const t = p.life / p.maxLife
        const color = COLORS[p.hue]
        // halo + core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2)
        ctx.fillStyle = color(0.1 * t)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * t, 0, Math.PI * 2)
        ctx.fillStyle = color(0.9 * t)
        ctx.fill()
      }

      if (running) raf = requestAnimationFrame(frame)
    }

    let volleyDone = false
    const volleyTimers: number[] = []
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
      lastLaunch = last
      launchWait = mode === 'grand' ? 2600 : 1400
      raf = requestAnimationFrame(frame)
      // grand finales open with a five-rocket salute
      if (mode === 'grand' && !volleyDone) {
        volleyDone = true
        for (let i = 0; i < 5; i++) {
          volleyTimers.push(
            window.setTimeout(() => {
              if (running) launch(width * (0.14 + 0.18 * i), height * (0.14 + Math.random() * 0.22))
            }, 250 + i * 260),
          )
        }
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
      for (const t of volleyTimers) window.clearTimeout(t)
      volleyTimers.length = 0
    }

    // only animate while on screen and tab visible
    let onScreen = false
    const sync = () => (onScreen && !document.hidden ? start() : stop())
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)
    const onVisibility = () => sync()
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => {
      resize()
      seedStars()
    }
    window.addEventListener('resize', onResize)

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      launch(e.clientX - rect.left, Math.max(40, e.clientY - rect.top))
    }
    if (interactive) canvas.addEventListener('click', onClick)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      if (interactive) canvas.removeEventListener('click', onClick)
    }
  }, [mode, interactive])

  return <canvas ref={canvasRef} className={className} role="img" aria-label={label} />
}
