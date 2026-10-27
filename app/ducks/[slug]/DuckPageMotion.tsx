'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced, EASE } from '@/lib/motion'

/**
 * THE PRODUCT PAGE'S OWN MOTION — everything the shared system cannot express.
 *
 * The plain entrances are NOT here: headings, cards and stickers carry the
 * site's own [data-anim] / [data-pop], which MotionProvider runs exactly as it
 * does on every other page, so a heading on /ducks/vincey rises with the same
 * curve and stagger as one on the homepage. This file is only the four things
 * that are specific to this page:
 *
 *   1. Hero pointer parallax — HeroScene's algorithm and vocabulary
 *      ([data-depth], damped, written to `translate`), scaled down for a hero
 *      that is a product, not a scene.
 *   2. The decal scatter drifts up as the hero scrolls away.
 *   3. The Puddle lands: it drops in, squashes on the floor, and the duck
 *      steps up beside it.
 *   4. The other two ducks peek up out of their cards, and hop on hover.
 *
 * The hero's FIRST-FRAME entrance is CSS (duck.module.css, "the arrival"), for
 * the reason the homepage hero's is: it is on screen at load, and a JS entrance
 * on content that is already painted makes the server-rendered page appear,
 * vanish when hydration runs, and animate back in.
 *
 * SAFETY, the same rules lib/motion lives by:
 *   - nothing is hidden by CSS; a from-state is only set in JS, and only on
 *     something that is actually below the fold;
 *   - anything already in view when this runs plays immediately instead of
 *     waiting for a trigger that will never fire;
 *   - reduced motion gets none of it, and the page is fully composed without.
 *
 * Mounted by the page, so it runs again on every client-side visit and
 * `ctx.revert()` tears it down when the visitor leaves.
 */
export function DuckPageMotion() {
  useEffect(() => {
    if (prefersReduced()) return
    const page = document.querySelector<HTMLElement>('[data-duck-page]')
    if (!page) return

    initGsap()
    const mm = gsap.matchMedia()
    const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.85

    const ctx = gsap.context(() => {
      /* ---- 2. the scatter drifts as the hero leaves ---------------------- */
      const hero = page.querySelector<HTMLElement>('[data-duck-hero]')
      const scatter = page.querySelector<HTMLElement>('[data-scatter]')
      if (hero && scatter) {
        gsap.to(scatter, {
          yPercent: -16,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 },
        })
      }

      /* ---- 3. the Puddle lands ------------------------------------------- */
      const art = page.querySelector<HTMLElement>('[data-puddle-art]')
      if (art) {
        const floor = art.querySelector('[data-puddle-floor]')
        const duck = art.querySelector('[data-puddle-duck]')
        const shape = art.querySelector('[data-puddle-shape]')

        const tl = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } })
        if (floor) tl.fromTo(floor, { scaleX: 0.3, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, ease: EASE.out }, 0)
        if (shape) tl.fromTo(shape, { y: -46, rotate: 7, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 0.75, ease: EASE.bounce }, 0.05)
        if (duck) tl.fromTo(duck, { xPercent: 26, y: 26, rotate: -9, opacity: 0 }, { xPercent: 0, y: 0, rotate: 0, opacity: 1, duration: 0.7, ease: EASE.bounce }, 0.28)
        /* The landing squash, about its base — the full Puddle settling. */
        if (shape) {
          tl.fromTo(shape,
            { scaleY: 0.9, scaleX: 1.06, transformOrigin: '50% 100%' },
            { scaleY: 1, scaleX: 1, duration: 0.5, ease: EASE.pop, immediateRender: false },
            0.55)
        }

        if (below(art)) {
          tl.progress(0) // applies the from-states, now that we know it is unseen
          ScrollTrigger.create({ trigger: art, start: 'top 80%', once: true, onEnter: () => tl.play() })
        } else {
          tl.progress(1)  // already on screen — arrive composed, do not replay
        }
      }

      /* ---- 4. the other two peek up ---------------------------------------- */
      gsap.utils.toArray<HTMLElement>('[data-peek-card]', page).forEach((card) => {
        const peek = card.querySelector<HTMLElement>('[data-peek-art]')
        if (!peek) return
        const pop = gsap.fromTo(peek,
          { yPercent: 38, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: EASE.bounce, paused: true })
        if (below(card)) {
          pop.progress(0)
          /* A beat after the card's own [data-anim] arrival, so the card lands
             and THEN the duck looks up out of it. */
          ScrollTrigger.create({ trigger: card, start: 'top 85%', once: true, onEnter: () => pop.delay(0.25).play() })
        } else {
          pop.progress(1)
        }
      })
    }, page)

    /* ---- 1 + hover: fine pointers with room to move only ----------------- */
    mm.add('(min-width: 900px) and (pointer: fine)', () => {
      const hero = page.querySelector<HTMLElement>('[data-duck-hero]')
      const layers = hero ? gsap.utils.toArray<HTMLElement>('[data-depth]', hero) : []
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

      const tick = () => {
        cx += (tx - cx) * 0.08     // HeroScene's damping: water, not a mouse trail
        cy += (ty - cy) * 0.08
        for (const el of layers) {
          const d = Number(el.dataset.depth) || 0
          el.style.translate = `${(cx * d * 70).toFixed(2)}px ${(cy * d * 34).toFixed(2)}px`
        }
        raf = Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004 ? requestAnimationFrame(tick) : 0
      }
      const onMove = (e: PointerEvent) => {
        if (!hero) return
        const r = hero.getBoundingClientRect()
        tx = (e.clientX - r.left) / r.width - 0.5
        ty = (e.clientY - r.top) / r.height - 0.5
        if (!raf) raf = requestAnimationFrame(tick)
      }
      const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick) }
      hero?.addEventListener('pointermove', onMove)
      hero?.addEventListener('pointerleave', onLeave)

      /* The hop: the INNER span, so it never competes with the peek tween on
         the wrapper. A quick up and a bounced landing — the same curve as
         every entrance on the site, played small. */
      const cards = gsap.utils.toArray<HTMLElement>('[data-peek-card]', page)
      const hops = cards.map((card) => {
        const duck = card.querySelector<HTMLElement>('[data-peek-art] > *')
        const onEnter = () => {
          if (!duck) return
          gsap.timeline({ defaults: { overwrite: 'auto' } })
            .to(duck, { y: -16, rotate: -4, duration: 0.2, ease: 'power2.out' })
            .to(duck, { y: 0, rotate: 0, duration: 0.55, ease: EASE.bounce })
        }
        card.addEventListener('pointerenter', onEnter)
        return () => card.removeEventListener('pointerenter', onEnter)
      })

      return () => {
        hero?.removeEventListener('pointermove', onMove)
        hero?.removeEventListener('pointerleave', onLeave)
        if (raf) cancelAnimationFrame(raf)
        for (const el of layers) el.style.translate = ''
        hops.forEach((off) => off())
      }
    })

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return null
}
