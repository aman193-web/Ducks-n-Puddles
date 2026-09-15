'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Kid-friendly bouncy curves. One rhythm for the whole site. */
export const EASE = {
  /** overshoot-and-settle — the default entrance */
  bounce: 'back.out(1.7)',
  /** stronger pop, for stickers and badges */
  pop: 'back.out(3)',
  /** squash-and-stretch feel for presses */
  elastic: 'elastic.out(1, 0.55)',
  out: 'power3.out',
  inOut: 'power2.inOut',
} as const

export function initGsap() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger)
  registered = true
  return gsap
}

export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * The house entrance: rise + a little counter-rotation, overshooting on arrival.
 *
 * REWRITTEN. The previous version leaned on a CSS rule that set EVERY [data-anim]
 * element to opacity 0.001 the moment JS booted, then relied on ScrollTrigger to
 * put it back. One missed trigger — a fast flick, an anchor jump, a restored
 * scroll position, a refresh while Lenis was mid-glide — left a whole section
 * permanently blank. That is the exact failure the current WordPress site has,
 * and it showed up here as an empty yellow screen and as store cards that never
 * arrived.
 *
 * Two changes make it safe:
 *   1. Nothing is hidden by CSS. Elements are measured first and only the ones
 *      BELOW the fold are set to their from-state, in JS. Anything already on
 *      screen is simply never touched.
 *   2. An IntersectionObserver runs behind the batch as a failsafe. If an element
 *      is a quarter of the way into the viewport and still faded with no tween
 *      running, the trigger was missed and it is revealed immediately.
 */
function entrance(el: HTMLElement) {
  return {
    opacity: 0,
    y: Number(el.dataset.animY ?? 40),
    rotate: Number(el.dataset.animRot ?? 0),
    scale: Number(el.dataset.animScale ?? 1),
  }
}

const land = (targets: Element[], ease = EASE.bounce) =>
  gsap.to(targets, {
    opacity: 1, y: 0, rotate: 0, scale: 1,
    duration: 0.7, ease, stagger: 0.06, overwrite: 'auto',
  })

/** Reveals anything that slipped past its trigger. Shared by both entrances. */
function failsafe(els: HTMLElement[]) {
  if (!('IntersectionObserver' in window)) return () => {}
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target as HTMLElement
        io.unobserve(el)
        if (Number(gsap.getProperty(el, 'opacity')) < 0.9 && !gsap.isTweening(el)) {
          gsap.set(el, { opacity: 1, y: 0, rotate: 0, scale: 1 })
        }
      }
    },
    // a quarter of the way in: well past where the batch should already have run
    { rootMargin: '0px 0px -25% 0px' },
  )
  els.forEach((el) => io.observe(el))
  return () => io.disconnect()
}

export function revealBatch(selector = '[data-anim]') {
  const els = gsap.utils.toArray<HTMLElement>(selector)
  if (!els.length) return
  if (prefersReduced()) {
    gsap.set(els, { opacity: 1, y: 0, rotate: 0, scale: 1 })
    return
  }

  const fold = window.innerHeight * 0.92
  const below = els.filter((el) => el.getBoundingClientRect().top > fold)
  below.forEach((el) => gsap.set(el, entrance(el)))

  ScrollTrigger.batch(below, { start: 'top 92%', once: true, onEnter: (b) => land(b) })
  return failsafe(below)
}

/**
 * Buoyancy. Near-prime periods plus a per-element phase offset, so a row of
 * identical renders never bobs in unison — the thing that makes it read as three
 * characters rather than one image repeated.
 */
export function bob(selector = '[data-bob]') {
  if (prefersReduced()) return
  gsap.utils.toArray<HTMLElement>(selector).forEach((el, i) => {
    gsap.to(el, {
      y: -12 - i * 2,
      rotate: i % 2 ? 1.6 : -1.6,
      duration: 1.9 + i * 0.31,      // 1.90 / 2.21 / 2.52 — never in phase
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: i * 0.24,
    })
  })
}

/** Sticker entrance: pops from nothing with a hard overshoot. Same safety rules
 *  as revealBatch — measured first, nothing hidden by CSS, IO behind it. */
export function popStickers(selector = '[data-pop]') {
  const els = gsap.utils.toArray<HTMLElement>(selector)
  if (!els.length) return
  if (prefersReduced()) {
    gsap.set(els, { opacity: 1, scale: 1 })
    return
  }

  const fold = window.innerHeight * 0.94
  const below = els.filter((el) => el.getBoundingClientRect().top > fold)
  below.forEach((el) => gsap.set(el, { opacity: 0, scale: 0.2, rotate: -24 }))

  ScrollTrigger.batch(below, {
    start: 'top 94%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1, scale: 1,
        rotate: (i, el: Element) => Number((el as HTMLElement).dataset.popRot ?? 0),
        duration: 0.62, ease: EASE.pop, stagger: 0.08, overwrite: 'auto',
      }),
  })
  return failsafe(below)
}
