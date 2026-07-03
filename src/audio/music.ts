/**
 * Generated ambient score — no audio files, everything synthesized in the
 * browser with the Web Audio API. Strictly opt-in via the nav toggle.
 *
 * Three layers:
 *  - a slow, warm pad cycling an Americana progression (D · G · Bm · A)
 *  - a low root drone anchoring each chord
 *  - sparse pentatonic "sparkles" through a feedback delay, like distant bells
 */

const CHORD_SECONDS = 9
const CHORDS: number[][] = [
  // D major — frequencies in Hz (D2 A2 D3 F#3)
  [73.42, 110.0, 146.83, 185.0],
  // G major (G2 D3 G3 B3)
  [98.0, 146.83, 196.0, 246.94],
  // B minor (B2 F#3 B3 D4)
  [123.47, 185.0, 246.94, 293.66],
  // A major (A2 E3 A3 C#4)
  [110.0, 164.81, 220.0, 277.18],
]

// D major pentatonic, two high octaves
const SPARKLE_NOTES = [587.33, 659.25, 739.99, 880.0, 987.77, 1174.66, 1318.51]

export class AmbientScore {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private delaySend: GainNode | null = null
  private chordTimer: number | null = null
  private sparkleTimer: number | null = null
  private chordIndex = 0
  playing = false

  toggle(): boolean {
    if (this.playing) this.stop()
    else this.start()
    return this.playing
  }

  start() {
    if (this.playing) return
    if (!this.ctx) this.setup()
    const ctx = this.ctx!
    void ctx.resume()

    const now = ctx.currentTime
    this.master!.gain.cancelScheduledValues(now)
    this.master!.gain.setValueAtTime(0.0001, now)
    this.master!.gain.exponentialRampToValueAtTime(0.16, now + 2.5)

    this.playing = true
    this.chordIndex = 0
    this.playChord()
    this.chordTimer = window.setInterval(() => this.playChord(), CHORD_SECONDS * 1000)
    this.scheduleSparkle()
  }

  stop() {
    if (!this.playing || !this.ctx) return
    this.playing = false
    if (this.chordTimer) window.clearInterval(this.chordTimer)
    if (this.sparkleTimer) window.clearTimeout(this.sparkleTimer)
    this.chordTimer = this.sparkleTimer = null

    const now = this.ctx.currentTime
    this.master!.gain.cancelScheduledValues(now)
    this.master!.gain.setValueAtTime(this.master!.gain.value, now)
    this.master!.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)
    window.setTimeout(() => {
      if (!this.playing) void this.ctx?.suspend()
    }, 1400)
  }

  private setup() {
    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0.0001
    master.connect(ctx.destination)

    // gentle bell-delay bus
    const delay = ctx.createDelay(1.5)
    delay.delayTime.value = 0.44
    const feedback = ctx.createGain()
    feedback.gain.value = 0.34
    const wet = ctx.createGain()
    wet.gain.value = 0.3
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(wet)
    wet.connect(master)

    const delaySend = ctx.createGain()
    delaySend.gain.value = 1
    delaySend.connect(delay)

    this.ctx = ctx
    this.master = master
    this.delaySend = delaySend
  }

  private playChord() {
    const ctx = this.ctx!
    if (!this.playing) return
    const chord = CHORDS[this.chordIndex % CHORDS.length]
    this.chordIndex++

    const now = ctx.currentTime
    const dur = CHORD_SECONDS + 3 // overlap into the next chord

    // pad: two detuned triangles per note through a soft lowpass
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 720
    lp.Q.value = 0.4
    const chordGain = ctx.createGain()
    chordGain.gain.setValueAtTime(0.0001, now)
    chordGain.gain.exponentialRampToValueAtTime(0.09, now + 2.8)
    chordGain.gain.setValueAtTime(0.09, now + dur - 3.5)
    chordGain.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    lp.connect(chordGain)
    chordGain.connect(this.master!)

    for (const freq of chord) {
      for (const detune of [-4, 4]) {
        const osc = ctx.createOscillator()
        osc.type = 'triangle'
        osc.frequency.value = freq
        osc.detune.value = detune
        osc.connect(lp)
        osc.start(now)
        osc.stop(now + dur)
      }
    }

    // low root drone, one octave down
    const sub = ctx.createOscillator()
    sub.type = 'sine'
    sub.frequency.value = chord[0] / 2
    const subGain = ctx.createGain()
    subGain.gain.setValueAtTime(0.0001, now)
    subGain.gain.exponentialRampToValueAtTime(0.05, now + 3)
    subGain.gain.setValueAtTime(0.05, now + dur - 3.5)
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + dur)
    sub.connect(subGain)
    subGain.connect(this.master!)
    sub.start(now)
    sub.stop(now + dur)
  }

  private scheduleSparkle() {
    if (!this.playing) return
    const wait = 2200 + Math.random() * 4200
    this.sparkleTimer = window.setTimeout(() => {
      this.playSparkle()
      this.scheduleSparkle()
    }, wait)
  }

  private playSparkle() {
    const ctx = this.ctx!
    if (!this.playing) return
    const now = ctx.currentTime
    const freq = SPARKLE_NOTES[Math.floor(Math.random() * SPARKLE_NOTES.length)]

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.value = freq
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.045, now + 0.03)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)
    osc.connect(g)
    g.connect(this.master!)
    g.connect(this.delaySend!)
    osc.start(now)
    osc.stop(now + 2.6)
  }
}

export const ambientScore = new AmbientScore()
