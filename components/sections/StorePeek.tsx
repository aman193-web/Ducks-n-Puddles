'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { initGsap, prefersReduced } from '@/lib/motion'

/**
 * The peek: on each range card, the bottle leans aside and its character slides
 * out from behind its RIGHT edge as the card comes into view.
 *
 * Why the character can hide at all now. The `turn` poses this replaces are
 * whole ducks — 204px wide against a 129px bottle — so "hidden behind the
 * bottle" was geometrically impossible and the old card just had a duck parked
 * beside a bottle. The supplied peeking art is cut off at the left edge: a
 * half-duck 70-88px wide at this size, which genuinely fits behind the product.
 *
 * Where the final state lives, and why it matters. The character's RESTING CSS
 * is its finished, peeking position — GSAP animates it FROM hidden, not TO
 * visible. That way the composition a reduced-motion visitor sees is the same
 * one the CSS already describes, rather than something this file has to
 * reconstruct. Only the bottle's lean has to be set explicitly for them.
 *
 * It does not fight the fan. ScrollScenes already scrubs the three .cardWrap
 * elements into place on desktop; this touches the bottle and the character
 * INSIDE each figure, which are different elements on a different trigger.
 */
export function StorePeek() {
  useEffect(() => {
    const figures = gsap.utils.toArray<HTMLElement>('[data-peek-figure]')
    if (!figures.length) return

    /* Smaller move on a phone: the cards are in a snap rail at 78vw, and the
       full 30px shift plus 5deg reads as the bottle falling over at that size. */
    const small = window.matchMedia('(max-width: 819px)').matches
    const SHIFT = small ? -16 : -30
    const TILT = small ? -2.5 : -5

    if (prefersReduced()) {
      figures.forEach((fig) => {
        const bottle = fig.querySelector('[data-peek-bottle]')
        if (bottle) gsap.set(bottle, { x: SHIFT, rotate: TILT })
      })
      return
    }

    initGsap()
    const ctx = gsap.context(() => {
      figures.forEach((fig) => {
        const bottle = fig.querySelector('[data-peek-bottle]')
        const duck = fig.querySelector('[data-peek-duck]')
        if (!bottle || !duck) return

        gsap
          .timeline({
            defaults: { duration: 0.85, ease: 'power2.out' },
            scrollTrigger: {
              trigger: fig,
              start: 'top 88%',
              /* Plays in, and reverses when you scroll back up past it. */
              toggleActions: 'play none none reverse',
            },
          })
          .fromTo(bottle, { x: 0, rotate: 0 }, { x: SHIFT, rotate: TILT }, 0)
          /* xPercent, not x: -100% of the CHARACTER's own width puts it exactly
             behind the bottle whatever that character's silhouette is, and the
             three differ (aspect 0.34 to 0.43). A fixed px value would hide one
             and leave another sticking out. */
          .fromTo(duck, { xPercent: -100 }, { xPercent: 0 }, 0.1)
      })
    })
    return () => ctx.revert()
  }, [])

  return null
}
