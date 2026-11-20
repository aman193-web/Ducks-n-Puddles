'use client'
import { useEffect, useRef, useState } from 'react'
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
   *  model's frame — lid ~27, body ~45, sleeve ~64. The model fills its frame
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
 * called out around it, a duck switcher under it, and the sleeve button.
 *
 * MOTION, all of it CSS keyed off two attributes this sets:
 *   data-inview   once the stage first scrolls into view: the callouts slide
 *                 in from their side, their leader lines draw themselves in
 *                 towards the bottle, and the dots at the bottle start to pulse
 *   data-loading  while a newly chosen duck's model loads: the frame fades
 *                 out and back in, so the switch is a crossfade, not a pop
 * Bubbles rise from the pond, decorative; reduced motion stills them.
 */
export function BottleStage({ ducks, callouts }: Props) {
  const [slug, setSlug] = useState<DuckSlug>('chi-chi')
  const [sleeveOff, setSleeveOff] = useState(false)
  /* false to start: only a SWITCH fades. Starting true would hide the model
     for good if it loaded before hydration and its load event was missed. */
  const [loading, setLoading] = useState(false)
  const [inView, setInView] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const duck = ducks.find((d) => d.slug === slug)!

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const post = (msg: string) => frame.current?.contentWindow?.postMessage(msg, window.location.origin)
  const flipSleeve = () => {
    const off = !sleeveOff
    setSleeveOff(off)
    post(off ? 'sleeve-off' : 'sleeve-on')
  }
  const choose = (next: DuckSlug) => {
    if (next === slug) return
    setLoading(true)
    setSlug(next)
  }

  return (
    <div ref={wrap} className={styles.stageWrap}
         data-inview={inView || undefined}
         style={{ ['--spot' as string]: duck.soft, ['--spot-ink' as string]: duck.colour } as React.CSSProperties}>
      <div className={styles.stage}>
        <span className={styles.spotlight} aria-hidden="true" />
        {/* Keyed, so a new name rises in rather than just changing. */}
        <span key={duck.slug} className={`d ${styles.ghost}`} aria-hidden="true">{duck.name}</span>

        {/* Bubbles rising off the pond, behind the bottle. */}
        <span className={styles.bubbles} aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </span>

        <iframe
          ref={frame}
          className={styles.frame}
          data-loading={loading || undefined}
          src={`${MODELS[slug]}?button=0&hint=0`}
          title={`The ${duck.name} bottle in 3D. Drag, or use the arrow keys, to spin it.`}
          loading="lazy"
          onLoad={() => { setLoading(false); if (sleeveOff) post('sleeve-off') }}
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
              onClick={() => choose(d.slug)}
            />
          ))}
        </div>
        <button type="button" className={styles.sleeve} aria-pressed={sleeveOff} onClick={flipSleeve}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {sleeveOff
              ? <path d="M12 19V7M6 13l6-6 6 6" />
              : <path d="M12 5v12M6 11l6 6 6-6" />}
          </svg>
          {sleeveOff ? 'Put the sleeve on' : 'Take the sleeve off'}
        </button>
      </div>

      {/* After the controls in the source, so on a phone they list under
          the bottle; from 1024 they are laid over the stage, level with the
          parts they name. */}
      <ol className={styles.callouts}>
        {callouts.map((c, i) => (
          <li key={c.key} className={styles.callout} data-side={c.side}
              style={{ ['--y' as string]: `${c.y}%`, ['--i' as string]: i } as React.CSSProperties}>
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
