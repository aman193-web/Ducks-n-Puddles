'use client'
import { useEffect, useRef } from 'react'
import styles from './HeaderChrome.module.css'

/**
 * Flips `data-stuck` on the header once the page has scrolled past the top.
 *
 * Driven by an IntersectionObserver on a 64px sentinel at the document origin
 * rather than a scroll listener: it costs nothing per frame, it cannot fight
 * Lenis's interpolated scroll position, and it never reads layout on the main
 * thread mid-scroll. The sentinel's height IS the threshold — the background
 * arrives once 64px has gone by, not on the first pixel, so a trackpad nudge
 * does not make the bar flicker.
 */
export function HeaderChrome() {
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinel.current
    const header = document.querySelector('header')
    if (!el || !header) return

    const io = new IntersectionObserver(
      ([entry]) => { header.dataset.stuck = String(!entry.isIntersecting) },
      { threshold: 0 },
    )
    io.observe(el)
    return () => { io.disconnect(); delete header.dataset.stuck }
  }, [])

  return <div ref={sentinel} className={styles.sentinel} aria-hidden="true" />
}
