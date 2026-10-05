'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { asset } from '@/lib/assets'
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
        <div className={styles.headRow}>
          <div className={styles.head}>
            <Sticker colour="var(--sun-soft)" rot={-2} data-pop="" data-pop-rot="-2">Out in the world</Sticker>
            <h2 id="wild-title" className="d d-xl" data-anim="">Where Will Your Duck Go?</h2>
            <p className="lead measure" data-anim="">
              Big adventures, little moments, and every puddle in between &mdash;
              Chi&nbsp;Chi, Vincey, and Goosey are ready to come along!
            </p>
          </div>

          {/* The rail's own controls, at the head's right-hand end and level
              with its last line — above the row they drive rather than under
              it, so the thing you reach for is in view at the same moment the
              cards are.

              Hidden from assistive tech: a screen reader moves through the
              list itself, where every card is already reachable, and two
              buttons that only scroll would be noise. */}
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
      </div>

      {/* FOUR MARKS IN THE MARGINS, drawn rather than placed: a sun, a heart and
          two little bursts of water, in the client's reference's own hand. They
          are what stops the row reading as a gallery widget — a scrapbook page
          has somebody's pen on it as well as the photographs.

          Stroked, not filled, with round caps and deliberately uneven paths, so
          they read as drawn. Decorative, so aria-hidden and pointer-events
          none; gone below 900, where the row is a swipe and the margins they
          live in do not exist. */}
      <span className={styles.doodles} aria-hidden="true">
        <svg className={styles.sun} viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="10.5" />
          <circle cx="30" cy="30" r="4.5" />
          <path d="M30 6.5v7M30 46.5v7M6.5 30h7M46.5 30h7M13.4 13.4l5 5M41.6 41.6l5 5M46.6 13.4l-5 5M18.4 41.6l-5 5" />
        </svg>
        <svg className={styles.heart} viewBox="0 0 52 46" fill="none">
          <path d="M26 42C14.5 34.2 4 27 4 16.6 4 9.6 9.4 4.5 15.9 4.5c3.9 0 7.7 2 10.1 5.3 2.4-3.3 6.2-5.3 10.1-5.3C42.6 4.5 48 9.6 48 16.6 48 27 37.5 34.2 26 42Z" />
        </svg>
        <svg className={styles.dropsA} viewBox="0 0 46 40" fill="none">
          <path d="M9 30C6 24 9.5 14 15 6M22 33c-2-7 1.5-17 7-25M35 30c-1.5-5 1-12 5-18" />
        </svg>
        <svg className={styles.dropsB} viewBox="0 0 40 36" fill="none">
          <path d="M8 27c-2.5-5 .5-13 5-19M20 30c-1.6-6 1.2-14 5.6-21" />
        </svg>
      </span>

      <ul className={styles.rail} ref={rail} aria-label="Photos and clips from the duck pond">
        {reels.map((r, i) => {
          const playing = active === r.id
          return (
            <li
              key={r.id}
              className={styles.card}
              data-i={i % 6}
              data-kind={r.kind}
              /* A photograph keeps its own proportions — no crop, which is what
                 went wrong the first time the shapes were varied: forcing a
                 shape onto vertical phone video cut the top and bottom off
                 frames that were composed full-height. The stills are already
                 landscape and portrait, so the variety comes free. */
              style={r.kind === 'photo'
                ? ({ ['--shot-aspect' as string]: String(asset(r.id).aspect) } as React.CSSProperties)
                : undefined}
            >
              {/* THE MOUNT, and the SHOT inside it. The client's reference for
                  this row is a scrapbook wall — prints of different sizes
                  taped up, photographs and clips side by side — so each item
                  sits on a paper mount with a piece of tape holding it down
                  and its own slight tilt, and the row mixes the two kinds.

                  `data-i` is what the stylesheet varies everything off: the
                  width, the tape's colour and angle, the tilt, the baseline.
                  Modulo 6 rather than 5, so the cycle does not land in step
                  with any run of the same kind.

                  The tilt is on the FRAME, never on the <li>. Two reasons, both
                  load-bearing: page() measures a card's width off
                  getBoundingClientRect to work out one scroll step, and the box
                  of a rotated element is its bounding square, which is wider
                  than the card and would make every arrow press overshoot. And
                  scroll-snap would snap to that same inflated box. The list
                  item stays square; only the picture leans. */}
              <div className={styles.frame}>
                <span className={styles.tape} aria-hidden="true" />
                <span className={styles.shot}>
                  {r.kind === 'photo' ? (
                    /* A still, and the row is better for having them: a strip
                       of nothing but play buttons reads as a video player,
                       which is the opposite of a camera roll. */
                    <Picture id={r.id} sizes="(min-width: 900px) 24vw, 70vw" alt={r.caption} />
                  ) : (
                    <>
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
                    </>
                  )}
                </span>
              </div>

              {/* A SECOND, SMALLER PRINT UNDER A WIDE ONE. A landscape
                  photograph is half the height of the clips beside it, which
                  left a hole in the wall under every one; this fills it, and
                  it brings the card back to its neighbours' height. A plain
                  print, taped like the rest — a circle and a star were tried
                  here and both were wrong. */}
              {r.kind === 'photo' && r.under && (
                <div
                  className={`${styles.frame} ${styles.under}`}
                  style={{ ['--shot-aspect' as string]: String(asset(r.under.id).aspect) } as React.CSSProperties}
                >
                  <span className={styles.tape} aria-hidden="true" />
                  <span className={styles.shot}>
                    <Picture id={r.under.id} sizes="(min-width: 900px) 14vw, 42vw" alt={r.under.caption} />
                  </span>
                </div>
              )}
              {/* The caption used to print here. Removed at the client's request
                  — "we'd like the visuals to speak for themselves" — but kept as
                  the play button's accessible name, and as a photograph's alt. */}
            </li>
          )
        })}
      </ul>

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
