'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'
import styles from './SpeechBubble.module.css'

/* -------------------------------------------------------------------------
   A DUCK SAYING SOMETHING.

   The shape is a single SVG path, not a CSS box with a pseudo-element stuck
   underneath. That matters for two reasons: the navy outline runs round the
   body AND the tail without a seam to patch over, and the silhouette can be
   genuinely organic — each quadrant bulges differently, so it reads as drawn
   rather than as a rounded rectangle. The tail curves rather than pointing,
   which is what stops it looking like a tooltip.

   The path's own geometry is load-bearing in two places:
     - the body occupies y 6..124 of a 170 viewBox, so the text sits in the top
       ~72% and never strays into the tail
     - the tail tip is at (153, 160), i.e. 77% / 94%, which is the
       transform-origin: the bubble grows OUT OF the duck's beak rather than
       scaling about its own middle
   ------------------------------------------------------------------------- */
const PATH =
  'M 99 6 C 152 6, 194 29, 192 66 C 190 98, 162 119, 127 124 '
  + 'C 132 138, 141 150, 153 160 C 129 154, 110 140, 101 125 '
  + 'C 49 123, 8 101, 8 65 C 8 27, 47 6, 99 6 Z'

export function SpeechBubble({ message, className }: { message: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const tx = text.current
    if (!el || !tx) return

    /* Composed and still for anyone who asked for less motion — the words are
       the point of this element, so they are never withheld. */
    if (prefersReduced()) {
      gsap.set([el, tx], { opacity: 1, scale: 1, y: 0 })
      return
    }

    initGsap()
    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, scale: 0.8, y: 10 })
      gsap.set(tx, { opacity: 0 })

      const tl = gsap.timeline({
        paused: true,
        defaults: { overwrite: 'auto' },
      })
      tl.to(el, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' })
        /* The words land just behind the shape, so it reads as the bubble
           arriving and then being spoken into — not as one lump appearing. */
        .to(tx, { opacity: 1, duration: 0.26, ease: 'power2.out' }, '-=0.18')

      const st = ScrollTrigger.create({
        trigger: el.closest('article') ?? el,
        start: 'top 72%',
        once: true,
        onEnter: () => tl.play(),
      })

      /* If the panel is already past that point on load — a refresh partway
         down, or an anchor jump — the trigger never fires, so play it now
         rather than leaving the bubble at opacity 0 forever. */
      if (st.progress > 0 || el.getBoundingClientRect().top < window.innerHeight * 0.72) tl.play()
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className={[styles.bubble, className].filter(Boolean).join(' ')} ref={root}>
      <svg className={styles.shape} viewBox="0 0 200 170" aria-hidden="true" focusable="false">
        <path d={PATH} />
      </svg>
      <span className={styles.text} ref={text}>{message}</span>
    </div>
  )
}
