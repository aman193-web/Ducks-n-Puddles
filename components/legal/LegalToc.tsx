'use client'
import { useEffect, useRef, useState } from 'react'
import type { LegalSection } from '@/content/legal'
import styles from './LegalPage.module.css'

/**
 * THE CONTENTS LIST, WITH THE CURRENT SECTION MARKED.
 *
 * The marking is the point. A seventeen-item index that does not move is a list
 * of links; one that follows you is the only thing on a document this long that
 * answers "where am I and how much is left".
 *
 * Read on scroll rather than with an IntersectionObserver, deliberately. These
 * sections vary from three paragraphs to eleven, so several are taller than the
 * viewport and several are shorter — with an observer that means either none
 * intersecting the band or three at once, and the rules for picking between
 * them end up longer than this. A reading line does not care how tall a section
 * is: the current section is simply the last one whose top has passed it.
 *
 * rAF-throttled, passive, and it does nothing at all until the sections exist.
 */
export function LegalToc({ sections, onPick }: {
  sections: LegalSection[]
  /** The mobile <details> closes itself after a pick. */
  onPick?: () => void
}) {
  const [here, setHere] = useState(sections[0]?.n)
  const list = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(`s-${s.n}`))
      .filter((e): e is HTMLElement => e !== null)
    if (!els.length) return

    let frame = 0
    const read = () => {
      frame = 0
      /* The reading line: just below the fixed header, where a reader's eye
         actually is. --header-h is the same source the header itself uses. */
      const headerH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
      ) || 108
      const line = headerH + 56

      let n = sections[0].n
      for (let i = 0; i < els.length; i++) {
        if (els[i].getBoundingClientRect().top <= line) n = sections[i].n
        else break
      }
      /* At the very bottom the last section may never cross the line — a short
         final clause cannot push itself that far up — so the end of the page
         counts as being in it. */
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 4) {
        n = sections[sections.length - 1].n
      }
      setHere(n)
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
  }, [sections])

  /* Seventeen items is taller than the rail, so by the late sections the marked
     one has scrolled out of its own list. Keep it in view — but only by moving
     the rail's own scrollTop, never scrollIntoView, which would drag the PAGE
     while the reader is scrolling it. */
  useEffect(() => {
    const box = list.current?.parentElement
    const link = list.current?.querySelector<HTMLElement>('a[aria-current]')
    if (!box || !link || box.scrollHeight <= box.clientHeight) return
    /* From rects, not offsetTop: .rail is `position: sticky`, so it is itself
       the links' offsetParent and offsetTop is ALREADY rail-relative — the
       obvious `link.offsetTop - box.offsetTop` subtracts the rail's own 8800px
       down the page and sends every value negative. */
    const top = link.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop
    const pad = 48
    if (top < box.scrollTop + pad) box.scrollTop = Math.max(0, top - pad)
    else if (top + link.offsetHeight > box.scrollTop + box.clientHeight - pad) {
      box.scrollTop = top + link.offsetHeight - box.clientHeight + pad
    }
  }, [here])

  /* Everything above the current clause is marked read, which is what makes the
     track show progress rather than just position. */
  const at = Math.max(0, sections.findIndex((s) => s.n === here))

  return (
    <ol className={styles.toc} ref={list}>
      {sections.map((s, i) => (
        <li key={s.n}>
          <a
            href={`#s-${s.n}`}
            aria-current={here === s.n ? 'true' : undefined}
            data-done={i < at ? '' : undefined}
            onClick={onPick}
          >
            <span className={styles.tocDot} aria-hidden="true" />
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

/**
 * The same list on a phone, folded away and closed by default — a seventeen-item
 * index sitting above the first paragraph is worse there than no index at all.
 * It shuts itself after a pick, because a <details> left open pushes the section
 * you just jumped to back off the screen.
 */
export function MobileToc({ sections }: { sections: LegalSection[] }) {
  const [open, setOpen] = useState(false)

  return (
    <details
      className={styles.fold}
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary>Jump to a section</summary>
      <LegalToc sections={sections} onPick={() => setOpen(false)} />
    </details>
  )
}
