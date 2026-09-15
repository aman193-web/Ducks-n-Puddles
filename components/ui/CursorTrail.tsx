'use client'
import { useEffect, useRef } from 'react'
import styles from './CursorTrail.module.css'

const DOTS = 10
/** Per-frame catch-up. Higher = snappier. 0.55 keeps the head almost on the
 *  pointer while the chain still produces a tail. */
const CHASE = 0.55

/**
 * A liquid cursor — the reference's device, translated to water.
 *
 * coquelicots.nl runs a chain of dots through an SVG `goo` filter (heavy
 * Gaussian blur fed into a high-contrast alpha matrix) so they melt into one
 * another instead of reading as a row of circles. Same trick here, in Splash
 * Blue, so the trail behaves like a bead of water.
 *
 * It REPLACES the system cursor rather than decorating it — `cursor: none` is
 * applied to the document only once this is actually running, so a touch device
 * or a reduced-motion visitor still gets their own pointer. Over anything
 * interactive the head swells and turns yellow, which is the affordance the
 * hidden pointer would otherwise have carried.
 */
export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    root.classList.add('has-liquid-cursor')

    const dots = Array.from(host.querySelectorAll<HTMLElement>('i'))
    const xs = new Array(DOTS).fill(-100)
    const ys = new Array(DOTS).fill(-100)
    let tx = -100, ty = -100, raf = 0, awake = false

    const tick = () => {
      // Each dot chases the one ahead of it, so the lag compounds down the chain
      // and the tail drags — one lerp per dot, no easing library.
      let px = tx, py = ty
      for (let i = 0; i < DOTS; i++) {
        xs[i] += (px - xs[i]) * CHASE
        ys[i] += (py - ys[i]) * CHASE
        dots[i].style.translate = `${xs[i].toFixed(1)}px ${ys[i].toFixed(1)}px`
        px = xs[i]; py = ys[i]
      }
      raf = awake ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY
      // the affordance the hidden system cursor would have given
      const over = (e.target as Element | null)?.closest?.('a[href],button,input,label,summary,[role="radio"]')
      host.dataset.hot = over ? 'true' : 'false'
      if (!awake) { awake = true; host.dataset.on = 'true'; raf = requestAnimationFrame(tick) }
    }
    const onLeave = () => { awake = false; host.dataset.on = 'false' }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      root.classList.remove('has-liquid-cursor')
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ref} className={styles.trail} data-on="false" data-hot="false" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => (
          <i key={i} style={{ ['--i' as string]: i } as React.CSSProperties} />
        ))}
      </div>
      {/* the goo filter itself — zero-size, never painted */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <defs>
          <filter id="dnp-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}
