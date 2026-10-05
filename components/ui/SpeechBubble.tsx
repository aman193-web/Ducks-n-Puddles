'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'
import styles from './SpeechBubble.module.css'

/* -------------------------------------------------------------------------
   A DUCK HAVING A THOUGHT.

   THE SHAPE IS A CLOUD, and its tail is a chain of circles rather than a
   drawn point — the classic thought bubble, which is what the client's
   reference shows.

   The body is the HULL OF NINE OVERLAPPING CIRCLES, generated rather than
   drawn by hand: walk the bumps in order, and for each consecutive pair run an
   arc from one outer intersection to the next. Where two neighbours overlap
   the hull takes a small concave notch, and those notches are the whole
   difference between a cloud and a blob. The radii are deliberately uneven
   (23-29 against an ellipse of 66 x 45) so it reads as drawn rather than as
   nine identical circles on a circle. The ellipse is deliberately rounder than
   a cloud usually is: the bumps eat into the interior from every side, and a
   flatter body left no rectangle inside it tall enough for two lines of type.

   THE TAIL IS THE ENTRANCE, which is the part worth getting right. In the
   reference the smallest circle arrives first, then the middle one, then the
   largest, and only then does the cloud puff out from behind the largest. The
   smallest is the one nearest the duck's head — so the thought visibly rises
   off the character instead of appearing beside it. That ordering is why the
   dots are part of this SVG and not a separate indicator: they are the tail,
   they stay on screen, and the cloud grows out of the last one.

   Geometry that other files depend on:
     - the body occupies y 5.7..147.3 of a 200 viewBox, so the text sits in the
       top ~70% and never strays into the tail
     - the largest tail circle is at (152, 152), which is the transform-origin
       (`svgOrigin`): the cloud grows OUT OF the thought rather than swelling
       from its own middle
   ------------------------------------------------------------------------- */
const BODY =
  'M 22.8 103.3 A 26 26 0 0 1 24.7 54 A 23 23 0 0 1 57.9 29.7 '
  + 'A 29 29 0 0 1 113.3 23.7 A 24 24 0 0 1 154.8 37.1 A 27 27 0 0 1 179.5 82.2 '
  + 'A 23 23 0 0 1 159 117.4 A 28 28 0 0 1 108 134 A 24 24 0 0 1 62.9 127.5 '
  + 'A 25 25 0 0 1 22.8 103.3 Z'

/** Nearest the duck first. Stroke scales with the circle so a 3.8px dot is not
 *  mostly outline. */
const TAIL = [
  { cx: 177, cy: 189, r: 3.8, sw: 2.3 },
  { cx: 166, cy: 175, r: 6.5, sw: 3 },
  { cx: 152, cy: 152, r: 11,  sw: 3.9 },
]

export function SpeechBubble({ message, className }: { message: string; className?: string }) {
  const root = useRef<SVGSVGElement>(null)
  const body = useRef<SVGPathElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const svg = root.current
    const bd = body.current
    const tx = text.current
    if (!svg || !bd || !tx) return
    const dots = Array.from(svg.querySelectorAll<SVGCircleElement>('[data-dot]'))

    /* Composed and still for anyone who asked for less motion — the words are
       the point of this element, so they are never withheld. */
    if (prefersReduced()) {
      gsap.set([bd, ...dots], { opacity: 1, scale: 1 })
      gsap.set(tx, { opacity: 1 })
      return
    }

    initGsap()
    const ctx = gsap.context(() => {
      /* `svgOrigin` in the SVG's own user units, not percentages: a percentage
         origin on an SVG child resolves against that child's bounding box, so
         each circle would scale about itself and the cloud about its own
         middle — which is precisely what this sequence is not. */
      gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
      gsap.set(bd, { opacity: 0, scale: 0.12, svgOrigin: '152 152' })
      gsap.set(tx, { opacity: 0 })

      const tl = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } })

      /* Smallest first, which is the one by the duck's head: the thought rises
         off the character rather than arriving beside it. */
      tl.to(dots, {
        opacity: 1, scale: 1,
        duration: 0.26,
        ease: 'back.out(2.4)',
        stagger: 0.16,
      })
        /* Out of the largest circle, not out of nothing. */
        .to(bd, {
          opacity: 1, scale: 1,
          duration: 0.52,
          ease: 'back.out(1.4)',
        }, '-=0.04')
        /* The words land just behind the shape, so it reads as the thought
           arriving and then being filled in — not as one lump appearing. */
        .to(tx, { opacity: 1, duration: 0.26, ease: 'power2.out' }, '-=0.18')

      const st = ScrollTrigger.create({
        trigger: svg.closest('article') ?? svg,
        start: 'top 72%',
        once: true,
        /* A beat before the first dot, so the character has visibly arrived and
           settled before it starts thinking. */
        onEnter: () => tl.delay(0.25).play(),
      })

      /* If the panel is already past that point on load — a refresh partway
         down, or an anchor jump — the trigger never fires, so play it now
         rather than leaving the bubble at opacity 0 forever. */
      if (st.progress > 0 || svg.getBoundingClientRect().top < window.innerHeight * 0.72) {
        tl.delay(0.25).play()
      }
    }, svg)

    return () => ctx.revert()
  }, [])

  return (
    <div className={[styles.bubble, className].filter(Boolean).join(' ')}>
      <svg className={styles.shape} viewBox="0 0 200 200" ref={root}
           aria-hidden="true" focusable="false">
        {TAIL.map((c) => (
          <circle key={c.cx} data-dot="" cx={c.cx} cy={c.cy} r={c.r} strokeWidth={c.sw} />
        ))}
        <path d={BODY} ref={body} />
      </svg>
      <span className={styles.text} ref={text}>{message}</span>
    </div>
  )
}
