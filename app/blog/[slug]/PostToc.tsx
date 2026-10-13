'use client'
import { useEffect, useRef, useState } from 'react'
import styles from '../blog.module.css'

/**
 * "ON THIS PAGE", and the current heading marked.
 *
 * The same reading-line technique the legal pages use, and for the same reason:
 * sections here vary from one paragraph to four, so an IntersectionObserver
 * gives either nothing intersecting the band or three at once. A reading line
 * does not care how tall a section is — the current one is the last whose top
 * has passed it.
 *
 * rAF-throttled and passive, and it survives an EMPTY list: the client asked
 * for the contents section to appear on their own three posts too, and those
 * have no headings, so `items` is []. The effect bails on an empty list, the
 * track has no height to draw, and the <ol> renders with nothing in it.
 */
export function PostToc({ items }: { items: { id: string; title: string }[] }) {
  const [here, setHere] = useState(items[0]?.id)
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id))
                     .filter((e): e is HTMLElement => e !== null)
    if (!els.length) return

    let frame = 0
    const read = () => {
      frame = 0
      const headerH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      ) || 108
      const line = headerH + 56
      let id = items[0].id
      for (let i = 0; i < els.length; i++) {
        if (els[i].getBoundingClientRect().top <= line) id = items[i].id
        else break
      }
      setHere(id)
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
  }, [items])

  const at = Math.max(0, items.findIndex((i) => i.id === here))

  return (
    <ol className={styles.toc} ref={list}>
      {items.map((it, i) => (
        <li key={it.id}>
          <a href={`#${it.id}`} aria-current={here === it.id ? 'true' : undefined}
             data-done={i < at ? '' : undefined}>
            <span className={styles.tocDot} aria-hidden="true" />
            <span>{it.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}
