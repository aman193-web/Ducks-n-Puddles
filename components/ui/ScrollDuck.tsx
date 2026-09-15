'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'
import styles from './ScrollDuck.module.css'

/**
 * The duck swims left -> right as the page scrolls, so its position IS the read
 * position. Scrubbed rather than tweened, so it tracks the scrollbar exactly and
 * swims backwards when you scroll up.
 *
 * Its manners:
 *  - waits until you are past the first screen, and steps aside at the footer
 *  - pointer-events: none + aria-hidden, so it can never eat a click or a tab stop
 *  - the waddle lives on an inner element while the scroll-driven x lives on the
 *    outer one: two elements, so the two transforms can never overwrite each other
 *  - does not exist at all under prefers-reduced-motion
 */
export function ScrollDuck() {
  const rail = useRef<HTMLDivElement>(null)
  const duck = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLSpanElement>(null)
  const wake = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReduced()) return
    const railEl = rail.current, duckEl = duck.current
    const bodyEl = body.current, wakeEl = wake.current
    if (!railEl || !duckEl || !bodyEl || !wakeEl) return

    initGsap()
    const ctx = gsap.context(() => {
      const travel = () => Math.max(0, railEl.clientWidth - duckEl.offsetWidth - 24)

      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 0.35,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = 12 + self.progress * travel()
          gsap.set(duckEl, { x })
          // the wake trails behind and strengthens the faster you are moving
          const speed = Math.min(1, Math.abs(self.getVelocity()) / 2200)
          gsap.set(wakeEl, { x: x - 16, opacity: 0.25 + speed * 0.5 })
        },
      })

      ScrollTrigger.create({
        start: () => window.innerHeight * 0.9,
        end: () => ScrollTrigger.maxScroll(window) - window.innerHeight * 0.55,
        onToggle: (self) => railEl.setAttribute('data-on', String(self.isActive)),
      })

      // Waddle. On the inner element only — putting it on duckEl would fight the
      // scroll-driven x, and putting it on the <img> would clobber its scaleX flip.
      gsap.to(bodyEl, {
        rotate: 7, y: -3,
        duration: 0.62, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })
    }, railEl)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.rail} ref={rail} aria-hidden="true" data-on="false">
      <span className={styles.water} />
      <span className={styles.wake} ref={wake} />
      <div className={styles.duck} ref={duck}>
        <span className={styles.body} ref={body}>
          <img src="/img/mascot-140.webp" width={46} height={52} alt="" />
        </span>
      </div>
    </div>
  )
}
