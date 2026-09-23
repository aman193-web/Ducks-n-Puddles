'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Picture } from '@/components/Picture'
import { crestY, PERIOD, SPAN } from '@/lib/wave'
import { prefersReduced } from '@/lib/motion'
import styles from './HeroSwimmers.module.css'

/* -------------------------------------------------------------------------
   THREE DUCKS ON THE WAVE

   They do not travel in a straight line. Each frame a duck's height is solved
   from the SAME curve the hero's SVG paints — `crestY` in lib/wave.ts is the
   analytic twin of `crestPath` — so the three of them trace the brand's own
   S rather than sliding across a picture of it.

   THE ONE THING THAT MAKES THIS WORK: the crest layer is itself drifting
   rightward under a 24s CSS animation, so a duck's height cannot be read from
   where it is on the SCREEN — it has to be read from where it is on the WATER.
   Every frame converts one to the other (`u = (x - drift) / scale`) and asks
   the curve. The surface under a duck is therefore always the surface it is
   drawn on, at any drift, any viewport, any moment.

   WHAT EACH MOTION IS
     glide   x advances at the water's speed plus the duck's own
     rise    y follows the curve; this is the S, and it is not decoration
     tilt    the curve's own slope, damped, so the nose lifts on a climb
     bob     +/-3px at 3.2s, the only invented motion, for a little life

   GSAP owns x/y/rotation on these elements outright. They carry no data-anim
   or data-pop and sit outside the hero's pointer-parallax set, so nothing else
   writes a transform here — see the channel note at the top of Hero.module.css.
   ------------------------------------------------------------------------- */

/** Seconds for a duck to swim one wave period. Sets the rise-and-fall rhythm. */
const RIDE = 13

/** Where the leader starts, as a fraction of the panel. Far enough over that
 *  the trailing two are both on screen behind it on the first frame. */
const ANCHOR = 0.86

/**
 * How far apart along the wave, in periods, and the fiddliest number here.
 *
 * It has two jobs that pull against each other. It must NOT be a whole period,
 * or all three sit at the same height and the S stops reading at a glance. But
 * the loop is 3 periods long (the smallest wrap that hides the jump off the
 * right edge), and at 2/3 the three of them bunched into a third of that loop
 * and left a gap behind — measured over a full cycle, the pond was down to one
 * duck twice in fourteen samples.
 *
 * 0.85 splits the difference: gaps of .85/.85/1.3 periods are near enough even
 * that two are always on screen, and the phases land on three clearly different
 * parts of the curve — a crest, a trough, and the climb between them.
 */
const SPACING = 0.85

const SWIMMERS = [
  { id: 'vincey-swim', size: 0.92 },
  { id: 'chichi-swim', size: 1 },
  { id: 'goosey-swim', size: 1.07 },
] as const

export function HeroSwimmers() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = root.current
    if (!layer) return
    const lanes = Array.from(layer.querySelectorAll<HTMLElement>('[data-lane]'))
    if (!lanes.length) return

    /* The wave's own box, measured rather than recomputed from --water and
       --wave-drop: one source of truth, and it survives any later change to
       either of those without this file knowing. */
    const band = document.querySelector<HTMLElement>('[data-hero-wave]')
    const svg = band?.querySelector('svg') ?? null
    if (!band) return

    let sx = 0, sy = 0, top = 0, width = 0, seat = 0
    let periodPx = 0, wrapPeriods = 1
    const heights: number[] = []
    const widths: number[] = []

    function measure() {
      const layerBox = layer!.getBoundingClientRect()
      const bandBox = band!.getBoundingClientRect()
      /* The band is 200% of the panel and holds four periods across a 4000-unit
         viewBox; preserveAspectRatio="none" scales the two axes independently,
         so they need separate factors. */
      sx = bandBox.width / (PERIOD * 4)
      sy = bandBox.height / SPAN
      top = bandBox.top - layerBox.top
      width = layerBox.width
      periodPx = PERIOD * sx
      /* Sit the hull a little into the navy band rather than balanced on the
         hairline: these render in FRONT of the crest now, so this is the only
         thing left saying the duck is in the water and not above it. */
      seat = 0.45 * (59 / SPAN) * bandBox.height
      lanes.forEach((l, i) => {
        const img = l.querySelector('img')!
        heights[i] = img.getBoundingClientRect().height
        widths[i] = img.getBoundingClientRect().width
      })
      const margin = 1.4 * (heights[0] || 90)
      wrapPeriods = Math.max(1, Math.ceil((width + 2 * margin) / (periodPx || 1)))
    }

    /** The crest layer's current horizontal offset, in px. Read from the CSS
     *  animation itself so there is no second clock to keep in step — and no
     *  per-frame layout read, which measuring the element would cost. */
    function drift(): number {
      const anim = svg?.getAnimations?.()[0]
      if (!anim || anim.currentTime == null) return 0
      const ms = Number(anim.currentTime)
      const p = ((ms / 24000) % 1 + 1) % 1
      /* `reverse`, so the effect runs 1 -> 0 and the layer moves right. The
         keyframe is translateX(-50%) of a box twice the panel's width. */
      return -(width * (1 - p))
    }

    measure()

    /* State is the duck's SCREEN x, not its position along the wave, and the
       wave coordinate is derived from it. That ordering matters: the crest's
       CSS loop restarts every 24s, so `drift` jumps a whole panel width at the
       seam. Driving x from drift would teleport the ducks at that instant —
       driving the lookup from x instead only jumps `u`, by exactly two periods,
       which crestY cannot tell apart from where it already was. */
    const place = (i: number, x: number) => {
      const h = heights[i] || 0
      /* The duck rides the curve at its CENTRE, not its left edge: anchoring on
         the edge leaves it visibly off the water wherever the slope is steep,
         by half its width times the gradient. */
      const u = (x + (widths[i] || 0) / 2 - drift()) / sx
      const y = top + crestY(u) * sy - h + seat
      /* The tilt is the curve's own gradient, sampled either side of where the
         duck is and damped: the raw slope peaks near 25deg, which on a face
         this round reads as capsizing. */
      const d = periodPx * 0.04
      const slope = ((crestY(u + d / sx) - crestY(u - d / sx)) * sy) / (2 * d)
      return { x, y, rot: Math.atan(slope) * (180 / Math.PI) * 0.38 }
    }

    const setters = lanes.map((l) => ({
      x: gsap.quickSetter(l, 'x', 'px') as (v: number) => void,
      y: gsap.quickSetter(l, 'y', 'px') as (v: number) => void,
      r: gsap.quickSetter(l, 'rotation', 'deg') as (v: number) => void,
    }))

    /* Start spread across the panel, the leader already three quarters of the
       way over, so the first frame is a composition rather than an empty pond.
       The gaps are SPACING periods wide, which is what puts the three of them
       on three different parts of the curve. */
    let xs = lanes.map((_, i) => ANCHOR * width - i * SPACING * periodPx)

    const paint = (bob: number[]) => {
      xs.forEach((x, i) => {
        const p = place(i, x)
        setters[i].x(p.x)
        setters[i].y(p.y + bob[i])
        setters[i].r(p.rot)
      })
    }

    if (prefersReduced()) {
      /* Composed and still: on the curve, at three different heights, no clock. */
      paint([0, 0, 0])
      const onResize = () => {
        measure()
        xs = lanes.map((_, i) => ANCHOR * width - i * SPACING * periodPx)
        paint([0, 0, 0])
      }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    /* The hero is one screen of a page about twenty long, so for most of a visit
       this is off screen. Gate the ticker on visibility rather than running the
       maths into a panel nobody can see. */
    let onScreen = true
    const io = new IntersectionObserver(
      ([e]) => { onScreen = e.isIntersecting },
      { rootMargin: '120px' },
    )
    io.observe(layer)

    let t = 0
    const tick = (_time: number, delta: number) => {
      if (!onScreen) return
      t += delta / 1000
      /* Ground speed is the water's plus the duck's own. The drift carries it
         one panel width every 24s whether it swims or not; RIDE only says how
         fast it works its way ALONG the swell, which is what sets the rhythm of
         the rise and fall. */
      const speed = width / 24 + (PERIOD / RIDE) * sx
      const margin = 1.4 * Math.max(...heights)
      for (let i = 0; i < xs.length; i++) {
        xs[i] += (speed * delta) / 1000
        /* Wrap by whole periods only — the height is periodic, so the duck
           re-enters on identical water and the seam is invisible. */
        while (xs[i] > width + margin) xs[i] -= wrapPeriods * periodPx
      }
      paint(xs.map((_, i) => Math.sin((t / 3.2 + i * 0.37) * Math.PI * 2) * 3))
    }

    gsap.ticker.add(tick)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className={styles.layer} ref={root} aria-hidden="true">
      {SWIMMERS.map((s) => (
        <span
          key={s.id}
          className={styles.lane}
          data-lane=""
          style={{ ['--size' as string]: s.size }}
        >
          <Picture id={s.id} sizes="9vw" priority />
        </span>
      ))}
    </div>
  )
}
