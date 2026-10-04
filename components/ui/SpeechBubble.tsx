'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'
import styles from './SpeechBubble.module.css'

/* -------------------------------------------------------------------------
   A DUCK SAYING SOMETHING — and, first, thinking about it.

   THE SHAPE is a single SVG path, not a CSS box with a pseudo-element stuck
   underneath. That matters for two reasons: the navy outline runs round the
   body AND the tail without a seam to patch over, and the silhouette can be
   genuinely organic — each quadrant bulges differently, so it reads as drawn
   rather than as a rounded rectangle. The tail curves rather than pointing,
   which is what stops it looking like a tooltip.

   The path's own geometry is load-bearing in two places:
     - the body occupies y 6..124 of a 170 viewBox, so the text sits in the top
       ~72% and never strays into the tail
     - the tail tip is at (153, 160), i.e. 77% / 94%, which is where the
       balloon scales FROM and where the dots gather BEFORE it

   THE SEQUENCE, which is the point of this file:
     1. the character is already there — the panel brought it in
     2. three dots arrive one at a time, by the duck's head
     3. they collapse into the same point the balloon grows out of
     4. the words land just behind the shape

   Steps 2 and 3 are why the root element is no longer the animated one. The
   dots must NOT scale with the balloon — they are a separate thought that
   hands over to it — so the root is now a still frame and `.balloon` inside it
   is what GSAP drives.
   ------------------------------------------------------------------------- */
const PATH =
  'M 99 6 C 152 6, 194 29, 192 66 C 190 98, 162 119, 127 124 '
  + 'C 132 138, 141 150, 153 160 C 129 154, 110 140, 101 125 '
  + 'C 49 123, 8 101, 8 65 C 8 27, 47 6, 99 6 Z'

export function SpeechBubble({ message, className }: { message: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const balloon = useRef<HTMLDivElement>(null)
  const think = useRef<HTMLSpanElement>(null)
  const text = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const bl = balloon.current
    const th = think.current
    const tx = text.current
    if (!el || !bl || !th || !tx) return

    const dots = Array.from(th.querySelectorAll<HTMLElement>('i'))

    /* Composed and still for anyone who asked for less motion — the words are
       the point of this element, so they are never withheld. The thinking beat
       is pure motion and has nothing to say, so it simply does not happen. */
    if (prefersReduced()) {
      gsap.set(bl, { opacity: 1, scale: 1, y: 0 })
      gsap.set(tx, { opacity: 1 })
      gsap.set(th, { display: 'none' })
      return
    }

    initGsap()
    const ctx = gsap.context(() => {
      gsap.set(bl, { opacity: 0, scale: 0.75, y: 8 })
      gsap.set(tx, { opacity: 0 })
      gsap.set(dots, { opacity: 0, scale: 0.3 })

      const tl = gsap.timeline({
        paused: true,
        defaults: { overwrite: 'auto' },
      })

      /* THE THINKING. One dot at a time, each with a little overshoot, which is
         what makes them read as arriving rather than as a loading spinner
         fading up. 0.14s apart: slower and the duck looks stuck, faster and the
         three of them read as one event. */
      tl.to(dots, {
        opacity: 1, scale: 1,
        duration: 0.16,
        ease: 'back.out(2.2)',
        stagger: 0.14,
      })
        /* The thought collapses INTO the point the balloon grows out of, so the
           two are one movement rather than a swap. */
        .to(th, {
          opacity: 0, scale: 0.55,
          duration: 0.22,
          ease: 'power2.in',
        }, '+=0.2')
        .to(bl, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
        }, '-=0.08')
        /* The words land just behind the shape, so it reads as the bubble
           arriving and then being spoken into — not as one lump appearing. */
        .to(tx, { opacity: 1, duration: 0.26, ease: 'power2.out' }, '-=0.2')

      const st = ScrollTrigger.create({
        trigger: el.closest('article') ?? el,
        start: 'top 72%',
        once: true,
        /* A beat before the first dot, so the character has visibly arrived and
           settled before it starts thinking. */
        onEnter: () => tl.delay(0.25).play(),
      })

      /* If the panel is already past that point on load — a refresh partway
         down, or an anchor jump — the trigger never fires, so play it now
         rather than leaving the bubble at opacity 0 forever. */
      if (st.progress > 0 || el.getBoundingClientRect().top < window.innerHeight * 0.72) {
        tl.delay(0.25).play()
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className={[styles.bubble, className].filter(Boolean).join(' ')} ref={root}>
      {/* The thought, before the words. Three dots on the balloon's own
          material — cream with a navy outline — so what arrives afterwards is
          visibly the same object grown up rather than a different one. */}
      <span className={styles.think} ref={think} aria-hidden="true">
        <i /><i /><i />
      </span>

      <div className={styles.balloon} ref={balloon}>
        <svg className={styles.shape} viewBox="0 0 200 170" aria-hidden="true" focusable="false">
          <path d={PATH} />
        </svg>
        <span className={styles.text} ref={text}>{message}</span>
      </div>
    </div>
  )
}
