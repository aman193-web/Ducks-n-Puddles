'use client'
import { useEffect, useRef, useState } from 'react'
import { Clock } from '@phosphor-icons/react/dist/ssr'
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
 * IT ALSO DRIVES THE "X MIN" PILL bottom-right, which the client asked for and
 * which I had left out on the grounds that the corner already holds the scroll
 * duck and the back-to-top button. Their reference answers that: the pill is
 * not a third floating thing, it is ATTACHED to the back-to-top button and
 * tucks behind it, so the corner still reads as one control.
 *
 * Both come from this one component because both come from one number. A second
 * scroll listener computing the same thing is how two indicators end up
 * disagreeing.
 *
 * rAF-throttled and passive. The bar is a custom property, so a scroll costs one
 * style write and no re-render; the pill is React state but only changes when
 * the WHOLE minute changes, which is a handful of renders across an article.
 */
export function ReadingProgress({ target, minutes }: { target: string; minutes: number }) {
  const bar = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [left, setLeft] = useState<number | null>(null)
  /* Whether the back-to-top button is on screen beside it. State, not a dataset
     write — the pill has no ref, and the first version of this set the attribute
     on the PROGRESS BAR's ref by mistake, so the pill never moved. It flips once
     per article, so a re-render costs nothing. */
  const [paired, setPaired] = useState(false)

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
      if (total <= 0) { delete el2.dataset.track; setLeft(null); return }
      el2.dataset.track = ''
      const p = Math.min(1, Math.max(0, -r.top / total))
      el2.style.setProperty('--p', String(p))
      /* VISIBLE FROM THE START OF THE ARTICLE, at the client's call. It was
         gated on ScrollTop appearing, so it only turned up after 150vh.
         It still goes once the article is all but finished — "0 min" is not
         worth a pill, and a reader at the last paragraph does not need telling.
         ⚠️ The 1.5 below is ScrollTop's own sentinel height, and it is used only
         to decide WHERE the pill sits: alone it takes the corner, and it slides
         left to make room when the button arrives. The two numbers have to
         agree and there is no shared token for it. */
      setPaired(window.scrollY > window.innerHeight * 1.5)
      setLeft(p >= 0.97 ? null : Math.max(1, Math.ceil(minutes * (1 - p))))
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
  }, [target, minutes])

  return (
    <>
      <div
        className={styles.progress}
        ref={bar}
        data-ready={ready || undefined}
        aria-hidden="true"
      />
      {/* aria-hidden: the reading time is already stated in the byline at the
          top of the article, where it is useful for deciding whether to start.
          This is a glance, not a second announcement. */}
      <div
        className={styles.timeLeft}
        data-show={left !== null || undefined}
        data-paired={paired ? '' : undefined}
        aria-hidden="true"
      >
        <Clock size={16} weight="bold" />
        <span>{left ?? 1} min</span>
      </div>
    </>
  )
}
