'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReduced } from '@/lib/motion'
import styles from './PuddleFace.module.css'

/**
 * Cursor-tracking eyes.
 *
 * Pupils are constrained to an ELLIPSE rather than a bounding box, so they never
 * park in a corner of the eye — normalising by sqrt(ellipseFactor) pulls any
 * out-of-bounds position back onto the rim. Movement lags the pointer by 0.2s with
 * power3.out, which is what makes it read as looking rather than as snapping.
 *
 * Pointer-driven only: on touch, and under reduced-motion, the eyes simply rest
 * centred and the face still reads.
 */
export function PuddleFace({ colour = 'var(--sun)', className }: { colour?: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReduced()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const pupils = Array.from(el.querySelectorAll<HTMLElement>(`.${styles.pupil}`))
    let raf = 0
    let last = 0

    const onMove = (e: PointerEvent) => {
      const now = e.timeStamp
      if (now - last < 16) return          // ~60fps is plenty for an eye
      last = now

      for (const p of pupils) {
        const eye = p.parentElement!
        const r = eye.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const maxX = (r.width - p.offsetWidth) / 2
        const maxY = (r.height - p.offsetHeight) / 2

        // normalise pointer offset against a generous boundary, then clamp to the ellipse
        let x = ((e.clientX - cx) / (r.width * 1.9)) * 2 * maxX
        let y = ((e.clientY - cy) / (r.height * 1.9)) * 2 * maxY
        const k = (x / maxX) ** 2 + (y / maxY) ** 2
        if (k > 1) { const s = 1 / Math.sqrt(k); x *= s; y *= s }

        gsap.to(p, { x, y, duration: 0.2, ease: 'power3.out', overwrite: true })
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      gsap.killTweensOf(pupils)
    }
  }, [])

  return (
    <div
      ref={root}
      className={`${styles.face} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className={styles.eyes}>
        <span className={styles.eye}><span className={styles.pupil} /></span>
        <span className={styles.eye}><span className={styles.pupil} /></span>
      </div>
      <span className={styles.smile} />
    </div>
  )
}
