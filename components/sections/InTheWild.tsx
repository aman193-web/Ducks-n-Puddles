'use client'
import { useRef, useState } from 'react'
import { Play, Pause } from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
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
 */
export function InTheWild() {
  const [active, setActive] = useState<string | null>(null)
  const refs = useRef<Record<string, HTMLVideoElement | null>>({})

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
      {/* Vincey looking over the edge of the rail — the `peek` pose is painted
          as an upper body exactly for this. */}
      <Duck who="vincey" pose="peek" className={styles.cameo} />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun-soft)" rot={-2} data-pop="" data-pop-rot="-2">Out in the world</Sticker>
          <h2 id="wild-title" className="d d-xl" data-anim="">Ducks in everyday life.</h2>
          <p className="lead measure" data-anim="">
            Real kids, real families, real afternoons. This is what a duck looks like once
            it belongs to somebody.
          </p>
        </div>
      </div>

      <ul className={styles.rail} aria-label="Clips from the duck pond">
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
              <p className={styles.cap}>{r.caption}</p>
            </li>
          )
        })}
      </ul>

      <div className="wrap">
        <div className={styles.cta}>
          <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
        </div>
      </div>
    </section>
  )
}
