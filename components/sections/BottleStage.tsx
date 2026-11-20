'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
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
 * THE BOTTLES, IN THE ROUND — and a camera that PANS between them.
 *
 * All three of the client's 360° models stand on one strip, a screen's width
 * apart. The camera never moves in or tilts: the arrows (at the page's edges,
 * each naming the duck it goes to on hover) or the name chips glide the
 * strip across with GSAP, so the next bottle slides into the frame the way a
 * camera panning along a shelf would show it. The callouts stay put — the
 * parts are the same on every bottle — while the duck's name behind the
 * bottle drifts at a slower rate than the strip, which is what makes the pan
 * read as depth rather than as a slide.
 *
 * In view, the callouts slide in and draw their leader lines (CSS, keyed off
 * data-inview). Reduced motion makes the pan a cut.
 */
export function BottleStage({ ducks, callouts }: Props) {
  const [index, setIndex] = useState(1) // Chi Chi
  const [sleeveOff, setSleeveOff] = useState(false)
  const [inView, setInView] = useState(false)
  /* Load all three once the section is near, so the next bottle is ready
     the moment the camera pans to it. */
  const [near, setNear] = useState(false)
  /* Which bottles are RENDERING. Only the one in frame, plus the ones a pan
     passes over while it runs: three WebGL scenes spinning at once, two of
     them off screen, is real work for a phone. The rest are display:none,
     which stops their frames without unloading them. */
  const [live, setLive] = useState<number[]>([1])
  /* The name behind the bottle, which changes mid-pan rather than with the
     index, so it is its own state. */
  const [ghostName, setGhostName] = useState(ducks[1].name)
  const wrap = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const ghost = useRef<HTMLSpanElement>(null)
  const frames = useRef<(HTMLIFrameElement | null)[]>([])
  const duck = ducks[index]
  const prev = ducks[(index - 1 + ducks.length) % ducks.length]
  const next = ducks[(index + 1) % ducks.length]

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.25 })
    io.observe(el)
    const near = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setNear(true); near.disconnect() }
    }, { rootMargin: '800px 0px' })
    near.observe(el)
    return () => { io.disconnect(); near.disconnect() }
  }, [])

  /* One screen's width between bottles, so the neighbours wait off-frame. */
  const gap = () => window.innerWidth
  const place = useCallback((i: number) => {
    if (strip.current) gsap.set(strip.current, { x: -i * gap() })
  }, [])
  /* Placed once, and again on resize — NOT on every change of index, which
     snapped the strip to its end mid-pan and fought the tween. */
  const indexRef = useRef(index)
  indexRef.current = index
  useEffect(() => {
    place(indexRef.current)
    let t = 0
    const onResize = () => {
      window.clearTimeout(t)
      t = window.setTimeout(() => {
        if (strip.current && !gsap.isTweening(strip.current)) place(indexRef.current)
      }, 120)
    }
    window.addEventListener('resize', onResize)
    return () => { window.clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [place])

  const go = (to: number) => {
    const target = (to + ducks.length) % ducks.length
    if (target === index) return
    const dir = Math.sign(to - index) || 1
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !strip.current) {
      setGhostName(ducks[target].name)
      setLive([target])
      setIndex(target); return
    }

    gsap.killTweensOf([strip.current, ghost.current])
    const lo = Math.min(index, target), hi = Math.max(index, target)
    setLive(Array.from({ length: hi - lo + 1 }, (_, k) => lo + k))
    /* The pan: the whole strip, eased in and out like a dolly on a track. */
    gsap.to(strip.current, {
      x: -target * gap(), duration: 1.1, ease: 'power3.inOut',
      /* Settle the name for certain: a second click can cut the drift
         below short before it swaps the text. */
      onComplete: () => {
        setLive([target])
        setGhostName(ducks[target].name)
        if (ghost.current) gsap.to(ghost.current, { x: 0, opacity: .8, duration: .3, clearProps: 'transform' })
      },
    })
    /* The name behind drifts the same way at a fraction of the distance and
       changes at the midpoint — the far layer of the parallax. */
    if (ghost.current) {
      const g = ghost.current
      gsap.timeline()
        .to(g, { x: -dir * 120, opacity: 0, duration: .5, ease: 'power2.in' })
        .add(() => setGhostName(ducks[target].name))
        .fromTo(g, { x: dir * 120 }, { x: 0, opacity: .8, duration: .6, ease: 'power2.out', clearProps: 'transform' })
    }
    /* The callouts bow out and back as the bottle passes behind them. */
    const items = wrap.current?.querySelectorAll('[data-callout-num]')
    if (items?.length) {
      gsap.timeline()
        .to(items, { scale: .5, duration: .3, ease: 'power2.in', stagger: .04 })
        .to(items, { scale: 1, duration: .6, ease: 'back.out(3)', stagger: .06, clearProps: 'scale,transform' }, '+=.45')
    }
    /* The spotlight's colour eases over in CSS; set it now so it travels
       with the pan. */
    setIndex(target)
  }

  const post = (msg: string) => frames.current.forEach((f) => f?.contentWindow?.postMessage(msg, window.location.origin))
  const flipSleeve = () => {
    const off = !sleeveOff
    setSleeveOff(off)
    post(off ? 'sleeve-off' : 'sleeve-on')
  }

  return (
    <div ref={wrap} className={styles.stageWrap}
         data-inview={inView || undefined}
         style={{ ['--spot' as string]: duck.soft, ['--spot-ink' as string]: duck.colour } as React.CSSProperties}>
      <div className={styles.stage}>
        <span className={styles.spotlight} aria-hidden="true" />
        <span ref={ghost} className={`d ${styles.ghost}`} aria-hidden="true">{ghostName}</span>

        {/* Bubbles rising off the pond, behind the bottle. */}
        <span className={styles.bubbles} aria-hidden="true">
          <i /><i /><i /><i /><i /><i /><i />
        </span>

        {/* THE STRIP: the three bottles, a screen apart. */}
        <div ref={strip} className={styles.strip}>
          {ducks.map((d, i) => (
            <iframe
              key={d.slug}
              ref={(el) => { frames.current[i] = el }}
              className={styles.frame}
              style={{ ['--slot' as string]: i, display: live.includes(i) ? undefined : 'none' } as React.CSSProperties}
              src={near ? `${MODELS[d.slug]}?button=0&hint=0` : undefined}
              title={`The ${d.name} bottle in 3D. Drag, or use the arrow keys, to spin it.`}
              tabIndex={i === index ? 0 : -1}
              aria-hidden={i === index ? undefined : true}
              onLoad={() => { if (sleeveOff) frames.current[i]?.contentWindow?.postMessage('sleeve-off', window.location.origin) }}
            />
          ))}
        </div>
      </div>

      {/* The camera's controls, at the page's edges. Each says on hover which
          duck it is heading to. */}
      <button type="button" className={`${styles.pan} ${styles.panPrev}`}
              onClick={() => go(index - 1)} aria-label={`Meet ${prev.name}`}
              style={{ ['--pan-bg' as string]: prev.soft } as React.CSSProperties}>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7" /></svg>
        <span className={styles.panLabel} aria-hidden="true">Meet {prev.name}</span>
      </button>
      <button type="button" className={`${styles.pan} ${styles.panNext}`}
              onClick={() => go(index + 1)} aria-label={`Meet ${next.name}`}
              style={{ ['--pan-bg' as string]: next.soft } as React.CSSProperties}>
        <span className={styles.panLabel} aria-hidden="true">Meet {next.name}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className={styles.controls}>
        <div className={styles.picker} role="radiogroup" aria-label="Choose a bottle">
          {ducks.map((d, i) => (
            <NameSticker
              key={d.slug}
              as="button"
              role="radio"
              ariaChecked={index === i}
              name={d.name}
              colour={d.soft}
              size="m"
              className={styles.pick}
              onClick={() => go(i)}
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
            <span className={styles.calloutNum} aria-hidden="true" data-callout-num="">{c.n}</span>
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
