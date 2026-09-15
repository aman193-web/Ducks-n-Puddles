'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { initGsap, prefersReduced } from '@/lib/motion'
import { SCENE_MIN } from '@/lib/smooth'

/**
 * Pinned, scrubbed scenes.
 *
 * Driven from here off data attributes so the sections themselves stay server
 * components. Everything lives inside gsap.matchMedia, so below SCENE_MIN the
 * pins are never created — and are properly reverted on resize, pin-spacers and
 * all. Pinning on a short viewport traps the reader, so it is desktop-only.
 *
 * `ease: 'power2.out'` on a SCRUBBED timeline front-loads the motion: things
 * snap apart early in the scroll then drift, which is what stops it feeling
 * like a slider being dragged.
 */
export function ScrollScenes() {
  useEffect(() => {
    if (prefersReduced()) return
    initGsap()

    const mm = gsap.matchMedia()

    mm.add(`(min-width: ${SCENE_MIN}px)`, () => {
      // The hero no longer lives here. It is a self-contained window with its
      // own scene file (HeroScene), and pinning a panel that already fills the
      // fold only delays the reader from reaching the rest of the page.
      // ---- STORE: three cards fan into place ----
      // Previously this PINNED the section at 'top top' and scrubbed the cards in
      // from +-106 xPercent. Two things went wrong with that:
      //   - the pin engaged the moment the section's top reached the viewport top,
      //     which is long before the cards are on screen, so the reader was held
      //     still watching a heading;
      //   - at that point the cards were still at their `from` values, i.e. thrown
      //     off both edges and overlapping, which read as broken rather than as
      //     an animation waiting to happen.
      // No pin now, and the trigger is the CARD ROW rather than the section, so
      // the movement happens exactly while the cards are crossing the fold.
      const cards = gsap.utils.toArray<HTMLElement>('[data-store-card]')
      const row = cards[0]?.parentElement
      if (row && cards.length === 3) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 92%',
            end: 'top 42%',
            scrub: 0.6,
            invalidateOnRefresh: true,
            id: 'storeScene',
          },
        })
        tl.from(cards[0], { xPercent: 34, yPercent: 10, rotate: 6, ease: 'power2.out' }, 0)
          .from(cards[1], { yPercent: 16, scale: 0.94, ease: 'power2.out' }, 0)
          .from(cards[2], { xPercent: -34, yPercent: 12, rotate: -5, ease: 'power2.out' }, 0)
      }
    })

    return () => mm.revert()
  }, [])

  return null
}
