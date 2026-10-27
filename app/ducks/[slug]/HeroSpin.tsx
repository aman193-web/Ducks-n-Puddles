'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced, EASE } from '@/lib/motion'
import styles from './HeroSpin.module.css'

type Mode = 'classic' | 'spin'

interface Props {
  /** The client's 360° export, in public/3d. */
  src: string
  name: string
}

/**
 * CLASSIC / 360° — the switch, and the stage the model turns on.
 *
 * The model is the client's own file (public/3d), served exactly as delivered
 * and shown in an iframe. Nothing about it is rebuilt here, so a new export
 * drops straight in. It is mounted only while the 360° view is on: the normal
 * page never downloads three.js or the 1 MB of textures, and switching back
 * unmounts it, which stops its render loop outright.
 *
 * The file's own "Take the sleeve off" button and "Drag to spin" label are
 * turned off (?button=0&hint=0) and drawn here instead, in the site's own pill,
 * with the file's own wording. The button drives the model through the
 * messages the file already listens for: 'sleeve-off' / 'sleeve-on'.
 *
 * THE LAYOUT CHANGE IS CSS (duck.module.css, "the 360° view"): this sets
 * data-hero-mode on the section and the existing hero rearranges itself around
 * the bottle. This file only adds the motion — the old arrangement slips out,
 * the new one comes in from the sides on the site's bounce.
 *
 * ?view=360 opens straight into it, and the switch keeps the address in step,
 * so the view can be sent to someone as a link.
 */
export function HeroSpin({ src, name }: Props) {
  const [mode, setMode] = useState<Mode>('classic')
  const [sleeveOff, setSleeveOff] = useState(false)
  const [spun, setSpun] = useState(false)
  const toggle = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const busy = useRef(false)
  const mounted = useRef(false)

  const hero = () => toggle.current?.closest<HTMLElement>('[data-duck-hero]') ?? null

  const go = (next: Mode) => {
    const h = hero()
    if (next === mode || busy.current || !h) return
    h.setAttribute('data-hero-touched', '')
    if (prefersReduced()) { setMode(next); return }

    initGsap()
    busy.current = true
    const leaving = h.querySelectorAll(next === 'spin'
      ? '[data-hero-main], [data-hero-more], [data-hero-figure]'
      : '[data-hero-main], [data-hero-more], [data-hero-character], [data-spin-stage]')
    gsap.to(leaving, {
      opacity: 0, y: 14, duration: 0.22, ease: 'power2.in', stagger: 0.03,
      onComplete: () => setMode(next),
    })
  }

  /* Open in the 360° view when the address asks for it. No exit animation:
     there is nothing on screen yet worth watching leave. */
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('view') === '360') {
      hero()?.setAttribute('data-hero-touched', '')
      setMode('spin')
    }
  }, [])

  /* After the swap has committed and before it paints: re-place, then bring
     the new arrangement in. */
  useLayoutEffect(() => {
    const h = hero()
    if (!h) return
    if (mode === 'spin') h.setAttribute('data-hero-mode', 'spin')
    else h.removeAttribute('data-hero-mode')

    if (!mounted.current) { mounted.current = true; return }

    const url = new URL(window.location.href)
    if (mode === 'spin') url.searchParams.set('view', '360')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
    if (mode === 'classic') { setSleeveOff(false); setSpun(false) }

    const q = (sel: string) => h.querySelector<HTMLElement>(sel)
    const main = q('[data-hero-main]')
    const more = q('[data-hero-more]')
    const figure = q('[data-hero-figure]')
    const character = q('[data-hero-character]')
    const all = [main, more, figure, character, stage.current].filter(Boolean) as HTMLElement[]
    gsap.set(all, { clearProps: 'transform,opacity' })

    /* Everything below the hero moved; every trigger down the page is stale. */
    const refresh = () => ScrollTrigger.refresh()
    if (prefersReduced()) { busy.current = false; refresh(); return }

    const done = () => {
      busy.current = false
      gsap.set(all, { clearProps: 'transform,opacity' })
      refresh()
    }
    const tl = gsap.timeline({ onComplete: done })
    if (mode === 'spin') {
      if (main) tl.fromTo(main, { x: -56, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: EASE.bounce }, 0)
      if (stage.current) tl.fromTo(stage.current, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.6, ease: EASE.out }, 0.05)
      if (character) tl.fromTo(character, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: EASE.bounce }, 0.15)
      if (more) tl.fromTo(more, { x: 56, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: EASE.bounce }, 0.22)
    } else {
      if (main) tl.fromTo(main, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: EASE.bounce }, 0)
      if (more) tl.fromTo(more, { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: EASE.bounce }, 0.1)
      if (figure) tl.fromTo(figure, { x: 64, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: EASE.bounce }, 0.12)
    }
    return () => { tl.kill() }
  }, [mode])

  /* "Drag to spin" stands down once the bottle has been touched. A press
     inside the iframe moves focus into it, which this page sees as its own
     window losing focus — the one signal that crosses the frame boundary. */
  useEffect(() => {
    if (mode !== 'spin') return
    const onBlur = () => {
      window.setTimeout(() => { if (document.activeElement === frame.current) setSpun(true) }, 0)
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [mode])

  const post = (msg: string) => frame.current?.contentWindow?.postMessage(msg, window.location.origin)
  const flipSleeve = () => {
    const off = !sleeveOff
    setSleeveOff(off)
    post(off ? 'sleeve-off' : 'sleeve-on')
  }

  return (
    <>
      <div className={styles.toggle} role="group" aria-label={`How to view the ${name} bottle`} ref={toggle}>
        {(['classic', 'spin'] as const).map((m) => (
          <button
            key={m}
            type="button"
            className={styles.btn}
            aria-pressed={mode === m}
            onClick={() => go(m)}
          >
            {m === 'classic' ? 'Classic' : '360°'}
          </button>
        ))}
      </div>

      {mode === 'spin' && (
        <div className={styles.stage} ref={stage} data-spin-stage="">
          {/* The name, huge and quiet, behind the bottle. */}
          <span className={`d ${styles.ghost}`} aria-hidden="true">{name}</span>
          <iframe
            ref={frame}
            className={styles.frame}
            src={`${src}?button=0&hint=0`}
            title={`The ${name} bottle in 3D. Drag, or use the arrow keys, to spin it.`}
            onLoad={() => { if (sleeveOff) post('sleeve-off') }}
          />
          <div className={styles.controls}>
            <span className={styles.hint} data-gone={spun || undefined} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round" focusable="false">
                <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
              </svg>
              Drag to spin
            </span>
            <button type="button" className={styles.sleeve} aria-pressed={sleeveOff} onClick={flipSleeve}>
              {sleeveOff ? 'Put the sleeve on' : 'Take the sleeve off'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
