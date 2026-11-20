'use client'
import { useRef, useState } from 'react'
import { NameSticker } from '@/components/NameSticker'
import type { DuckSlug } from '@/content/brand'
import styles from './MeetTheBottle.module.css'

/** The client's 360° exports, the same files the duck pages spin. */
const MODELS: Record<DuckSlug, string> = {
  vincey: '/3d/vincey-bottle.html',
  'chi-chi': '/3d/chichi-bottle.html',
  goosey: '/3d/goosey-bottle.html',
}

export interface Callout {
  key: string
  n: number
  label: string
  value: string
  side: 'l' | 'r'
  /** Height on the stage, 0-100: where that part of the bottle sits in the
   *  model's frame — lid ~24, body ~44, sleeve ~66. The model fills its frame
   *  by height and spins about its vertical axis, so a part's height holds
   *  however far round it has turned. */
  y: number
}

interface Props {
  ducks: { slug: DuckSlug; name: string; colour: string; soft: string }[]
  callouts: Callout[]
}

/**
 * THE BOTTLE, IN THE ROUND — the client's 360° model at the centre, its parts
 * called out around it on drawn leader lines, a duck switcher under it, and
 * the sleeve button that hands the reader on to the Puddle section below.
 *
 * The spotlight behind the bottle takes the chosen duck's colour, and that
 * duck's name sits huge and quiet behind it, as on the duck pages.
 */
export function BottleStage({ ducks, callouts }: Props) {
  const [slug, setSlug] = useState<DuckSlug>('chi-chi')
  const [sleeveOff, setSleeveOff] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const duck = ducks.find((d) => d.slug === slug)!

  const post = (msg: string) => frame.current?.contentWindow?.postMessage(msg, window.location.origin)
  const flipSleeve = () => {
    const off = !sleeveOff
    setSleeveOff(off)
    post(off ? 'sleeve-off' : 'sleeve-on')
  }

  return (
    <div className={styles.stageWrap}
         style={{ ['--spot' as string]: duck.soft, ['--spot-ink' as string]: duck.colour } as React.CSSProperties}>
      <div className={styles.stage}>
        <span className={styles.spotlight} aria-hidden="true" />
        <span className={`d ${styles.ghost}`} aria-hidden="true">{duck.name}</span>
        <iframe
          ref={frame}
          className={styles.frame}
          src={`${MODELS[slug]}?button=0&hint=0`}
          title={`The ${duck.name} bottle in 3D. Drag, or use the arrow keys, to spin it.`}
          loading="lazy"
          onLoad={() => { if (sleeveOff) post('sleeve-off') }}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.picker} role="radiogroup" aria-label="Choose a bottle">
          {ducks.map((d) => (
            <NameSticker
              key={d.slug}
              as="button"
              role="radio"
              ariaChecked={slug === d.slug}
              name={d.name}
              colour={d.soft}
              size="m"
              className={styles.pick}
              onClick={() => setSlug(d.slug)}
            />
          ))}
        </div>
        <button type="button" className={styles.sleeve} aria-pressed={sleeveOff} onClick={flipSleeve}>
          {sleeveOff ? 'Put the sleeve on' : 'Take the sleeve off'}
        </button>
      </div>

      {/* After the controls in the source, so on a phone they list under
          the bottle; from 1024 they are laid over the stage, level with the
          parts they name. */}
      <ol className={styles.callouts}>
        {callouts.map((c) => (
          <li key={c.key} className={styles.callout} data-side={c.side}
              style={{ ['--y' as string]: `${c.y}%` } as React.CSSProperties}
              data-anim="" data-anim-y="12">
            <span className={styles.calloutNum} aria-hidden="true">{c.n}</span>
            <span className={styles.calloutText}>
              <span className={styles.calloutLabel}>{c.label}</span>
              <span className={styles.calloutValue}>{c.value}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
