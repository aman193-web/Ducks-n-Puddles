'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './blog-extras.module.css'

/**
 * HOW FAR THROUGH THE ARTICLE YOU ARE — a 3px bar across the top, as the
 * reference has.
 *
 * Measured against the ARTICLE, not the document. Measuring the document counts
 * the footer, the related row and the signup band, so the bar reads about
 * two-thirds full at the last paragraph and never fills on the thing it claims
 * to be tracking.
 *
 * ⚠️ The reference also floats a "19 min left" pill bottom-right. Not brought
 * over: this site already has two floating controls in that corner — the scroll
 * duck and the back-to-top button — and a third would make a cluster of them.
 * The bar says the same thing without taking a corner.
 *
 * rAF-throttled and passive, and it writes a custom property rather than React
 * state per frame, so a scroll costs one style write and no re-render.
 */
export function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target)
    if (!el || !bar.current) return
    setReady(true)

    let frame = 0
    const read = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      /* 0 when the article's top reaches the viewport top, 1 when its bottom
         does — the span over which you are actually reading it. */
      const total = r.height - window.innerHeight
      const el2 = bar.current
      if (!el2) return
      /* An article shorter than the viewport has no progress to report — it is
         all on screen at once. Showing a bar that can never move is worse than
         showing none, so it hides itself. */
      if (total <= 0) { delete el2.dataset.track; return }
      el2.dataset.track = ''
      el2.style.setProperty('--p', String(Math.min(1, Math.max(0, -r.top / total))))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [target])

  return (
    <div
      className={styles.progress}
      ref={bar}
      data-ready={ready || undefined}
      aria-hidden="true"
    />
  )
}
