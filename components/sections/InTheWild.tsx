'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { brand } from '@/content/brand'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { reels } from '@/content/brand'
import styles from './InTheWild.module.css'

/**
 * Ducks in Everyday Life — the reels rail.
 *
 * Renamed from "Spotted in the wild" at the client's suggestion, and the lead no
 * longer ends on "this is the whole marketing department": they want real kids,
 * real families and real adventures, not a joke about how small the operation is.
 *
 * Real clips off the family's own camera roll, transcoded from HEVC .MOV to
 * H.264 by scripts/build-video.mjs (Safari plays the originals; Chrome and
 * Firefox largely do not).
 *
 * Every clip is poster-first with preload="none", so the rail costs a handful of
 * JPEGs until somebody taps one, and nothing here is ever the LCP element. Only
 * one plays at a time — five autoplaying videos is a phone-melting pattern and
 * the reason so many "reels" sections are the heaviest thing on a page.
 *
 * A horizontal scroll-snap rail rather than a carousel library: it is keyboard
 * and trackpad native, needs no JS to scroll, and degrades to a plain scroller.
 *
 * ARROWS, because a trackpad is not the only input. On macOS the scrollbar is an
 * overlay that fades away, so the rail looked self-explanatory in testing; on
 * Windows it is a permanent grey bar under the cards, which is both ugly and the
 * ONLY affordance a mouse user gets — there is no two-finger swipe to discover.
 * So the bar is hidden on every platform and replaced by two buttons that page
 * the rail by one card. They disable themselves at each end, they are real
 * <button>s so the keyboard and screen readers get them, and the rail still
 * scrolls natively if the JS never arrives.
 */
export function InTheWild() {
  const [active, setActive] = useState<string | null>(null)
  const refs = useRef<Record<string, HTMLVideoElement | null>>({})

  const rail = useRef<HTMLUListElement>(null)
  /* `null` until the rail has been measured, so the buttons are not rendered
     disabled-looking for a frame before anyone can use them. */
  const [ends, setEnds] = useState<{ start: boolean; end: boolean } | null>(null)

  const measure = useCallback(() => {
    const el = rail.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    /* 2px of slack: sub-pixel layout means scrollLeft rarely lands exactly on
       the maximum, and a button that never enables at the end is worse than
       one that enables a pixel early. */
    setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
  }, [])

  useEffect(() => {
    const el = rail.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', measure); ro.disconnect() }
  }, [measure])

  /* One card plus one gap per press, read off the DOM rather than hard-coded —
     the card is a clamp() and the gap is a token, so neither is a number this
     file should know. */
  const page = (dir: 1 | -1) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card
      ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || '0')
      : el.clientWidth * 0.8
    el.scrollBy({ left: step * dir, behavior: 'smooth' })
  }

  const toggle = (id: string) => {
    const v = refs.current[id]
    if (!v) return
    if (v.paused) {
      for (const [key, other] of Object.entries(refs.current)) {
        if (key !== id && other && !other.paused) other.pause()
      }
      void v.play()
    } else {
      v.pause()
    }
  }

  return (
    <section className={styles.section} id="wild" aria-labelledby="wild-title">
      <BrandDetail preset="wake" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun-soft)" rot={-2} data-pop="" data-pop-rot="-2">Out in the world</Sticker>
          <h2 id="wild-title" className="d d-xl" data-anim="">Where Will Your Duck Go?</h2>
          <p className="lead measure" data-anim="">
            Big adventures, little moments, and every puddle in between &mdash;
            Chi&nbsp;Chi, Vincey, and Goosey are ready to come along!
          </p>
        </div>
      </div>

      <ul className={styles.rail} ref={rail} aria-label="Clips from the duck pond">
        {reels.map((r) => {
          const playing = active === r.id
          return (
            <li key={r.id} className={styles.card}>
              <div className={styles.frame}>
                <video
                  ref={(el) => { refs.current[r.id] = el }}
                  playsInline muted loop preload="none"
                  poster={`/img/${r.poster}-1080.jpg`}
                  onPlay={() => setActive(r.id)}
                  onPause={() => setActive((a) => (a === r.id ? null : a))}
                >
                  <source src={`/media/video/${r.id}-1080.mp4`} type="video/mp4" media="(min-width: 900px)" />
                  <source src={`/media/video/${r.id}-540.mp4`} type="video/mp4" />
                </video>

                <button type="button" className={styles.play} onClick={() => toggle(r.id)}>
                  <span className="vh">{playing ? 'Pause' : 'Play'} &mdash; {r.caption}</span>
                  {playing
                    ? <Pause size={22} weight="fill" aria-hidden="true" />
                    : <Play size={22} weight="fill" aria-hidden="true" />}
                </button>
              </div>
              {/* The caption used to print here. Removed at the client's request
                  — "we'd like the visuals to speak for themselves" — but kept as
                  the play button's accessible name above, because a video
                  control still has to say which clip it controls. */}
            </li>
          )
        })}
      </ul>

      {/* The rail's own controls, on the content edge under it. Hidden from
          assistive tech: a screen reader moves through the list itself, where
          every card is already reachable, and two buttons that only scroll
          would be noise. */}
      <div className="wrap">
        <div className={styles.controls} aria-hidden="true">
          <button type="button" className={styles.arrow} onClick={() => page(-1)}
                  disabled={ends?.start ?? false} tabIndex={-1}>
            <CaretLeft size={20} weight="bold" />
          </button>
          <button type="button" className={styles.arrow} onClick={() => page(1)}
                  disabled={ends?.end ?? false} tabIndex={-1}>
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
      </div>

      <div className="wrap">
        <div className={styles.cta}>
          {/* Social, not the signup: the client asked for this section to send
              people to where the pictures keep coming from. */}
          <Btn href={brand.instagram} colour="var(--sun-soft)">Follow along on Instagram</Btn>
        </div>
      </div>
    </section>
  )
}
