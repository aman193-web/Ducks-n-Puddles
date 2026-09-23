'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Picture } from '@/components/Picture'
import { prefersReduced } from '@/lib/motion'
import styles from './HeroDucks.module.css'

/**
 * The pond, with something living in it.
 *
 * Three additions, no change to the hero's layout, colour, type or CTAs:
 *   - a duck that swims the width of the pond, left to right, with a wake
 *   - one duck leaning in from each side wall, on a long offset cycle
 *
 * WHERE THEY SIT, and why it is safe. Everything here is z-index 4: above the
 * water (3) so it is not lost in it, below the bottles (5) so the swimmer
 * passes BEHIND the product rather than in front of it, and below the near wave
 * crest (6) so the crest swallows each duck's lower half — the same trick that
 * already makes the bottles look like they are standing in water rather than on
 * it. Nothing is added above the waterline, which is where all the text lives,
 * so no duck can reach the headline or the buttons at any width.
 *
 * WHICH ART. The side ducks use the `-peeking` set, which is cut off at the
 * left edge — drawn to emerge from behind something, so a panel wall is exactly
 * what they want to be behind. The right-hand one is mirrored in CSS. The
 * swimmer is `vincey-peek`, painted as an upper body, so a duck showing only
 * its top above the waterline needs no masking to look half-submerged.
 *
 * TRANSFORM DISCIPLINE. This hero runs four motion systems and the module
 * comment is explicit that each element belongs to exactly one. These elements
 * are new and belong to GSAP: nothing here carries `data-depth` (which would
 * make the pointer parallax write `translate`), a `data-bob`, or a CSS
 * entrance. GSAP owns their `transform` alone.
 */
const SWIM_SECONDS = 26

export function HeroDucks() {
  const root = useRef<HTMLDivElement>(null)
  const swimmer = useRef<HTMLSpanElement>(null)
  const wake = useRef<HTMLSpanElement>(null)
  const left = useRef<HTMLSpanElement>(null)
  const right = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    /* Reduced motion keeps the scene, drops the movement: the swimmer parks
       mid-pond where it reads as a duck floating, and the wall ducks — which
       only make sense as an arrival — stay out. */
    if (prefersReduced()) {
      if (swimmer.current) gsap.set(swimmer.current, { x: el.clientWidth * 0.34 })
      return
    }

    const ctx = gsap.context(() => {
      const width = () => el.clientWidth
      const small = window.matchMedia('(max-width: 899px)').matches

      if (swimmer.current && wake.current) {
        /* One crossing, then a pause before the next — a duck every few seconds
           would read as traffic. `none` easing because a swim is a constant
           speed; anything eased looks like it is being pushed. */
        const cross = gsap.timeline({ repeat: -1, repeatDelay: 7 })
        cross.fromTo(
          [swimmer.current, wake.current],
          { x: -180 },
          { x: () => width() + 180, duration: SWIM_SECONDS, ease: 'none' },
        )
        /* Buoyancy and a lazy heading change, both independent of the crossing
           so they keep running at the same rate however wide the panel is. */
        gsap.to(swimmer.current, {
          y: -7, rotate: 1.6, duration: 2.4,
          ease: 'sine.inOut', yoyo: true, repeat: -1,
        })
        gsap.to(wake.current, {
          opacity: 0.5, scaleX: 1.15, duration: 1.9,
          ease: 'sine.inOut', yoyo: true, repeat: -1,
        })
      }

      /* The wall ducks are desktop-only: on a portrait panel the bottles come
         back to the centre and there is no margin left for anything to lean
         into without crowding them. */
      if (!small) {
        for (const [ref, delay] of [[left, 2.5], [right, 13]] as const) {
          if (!ref.current) continue
          gsap.fromTo(
            ref.current,
            { xPercent: ref === left ? -104 : 104 },
            {
              xPercent: ref === left ? -14 : 14,
              duration: 2.2, ease: 'power3.out',
              repeat: -1, repeatDelay: 9, yoyo: true, delay,
            },
          )
        }
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.pond} ref={root} aria-hidden="true">
      <span className={styles.wake} ref={wake} />
      <span className={styles.swimmer} ref={swimmer}>
        <Picture id="vincey-peek" sizes="120px" alt="" />
      </span>

      <span className={`${styles.wall} ${styles.wallLeft}`} ref={left}>
        <Picture id="chichi-peeking" sizes="110px" alt="" />
      </span>
      <span className={`${styles.wall} ${styles.wallRight}`} ref={right}>
        <Picture id="goosey-peeking" sizes="110px" alt="" />
      </span>
    </div>
  )
}
