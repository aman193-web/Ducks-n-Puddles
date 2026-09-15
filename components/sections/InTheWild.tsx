'use client'
import { useRef, useState } from 'react'
import { Play, Pause, InstagramLogo } from '@phosphor-icons/react/dist/ssr'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { reels, brand } from '@/content/brand'
import styles from './InTheWild.module.css'

/**
 * Spotted in the wild — the reels rail.
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
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun)" rot={-2} data-pop="" data-pop-rot="-2">Out in the world</Sticker>
          <h2 id="wild-title" className="d d-xl" data-anim="">Spotted in the wild.</h2>
          <p className="lead" data-anim="">
            Real afternoons, filmed on a phone, no crew. This is the whole marketing
            department.
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
        <div className={styles.foot} data-anim="">
          <p className={styles.handle}>
            <InstagramLogo size={22} weight="regular" aria-hidden="true" />
            <span>More of these, most days, on Instagram.</span>
          </p>
          <Btn href={brand.instagram} colour="var(--sun)">Follow @ducksnpuddles</Btn>
        </div>
      </div>
    </section>
  )
}
