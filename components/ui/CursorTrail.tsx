'use client'
import { useEffect, useRef } from 'react'
import styles from './CursorTrail.module.css'

const DOTS = 14

/**
 * A liquid cursor — the reference's device, translated to water.
 *
 * coquelicots.nl runs ~20 dots that trail the pointer through an SVG `goo`
 * filter (a heavy Gaussian blur fed into a high-contrast alpha matrix), so the
 * dots melt into one another instead of reading as a row of circles. Same trick
 * here, in Splash Blue, which makes the trail behave like a bead of water rather
 * than a UI affordance — the right register for a site about puddles.
 *
 * Runs ONLY on a device with a fine pointer and no reduced-motion preference:
 * on a touchscreen there is no cursor to decorate, and the rAF loop would burn
 * battery for nothing. Pointer-events are off throughout, so it can never
 * intercept a click.
 */
export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return
    const fine = window.matchMedia('(pointer: fine)').matches
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || still) return

    const dots = Array.from(host.querySelectorAll<HTMLElement>('i'))
    const xs = new Array(DOTS).fill(-100)
    const ys = new Array(DOTS).fill(-100)
    let tx = -100, ty = -100, raf = 0, awake = false

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY
      if (!awake) { awake = true; host.dataset.on = 'true'; raf = requestAnimationFrame(tick) }
    }
    const onLeave = () => { awake = false; host.dataset.on = 'false' }

    const tick = () => {
      // Each dot chases the one in front of it, so the lag compounds down the
      // chain and the tail drags — one lerp per dot, no easing library.
      let px = tx, py = ty
      for (let i = 0; i < DOTS; i++) {
        xs[i] += (px - xs[i]) * 0.32
        ys[i] += (py - ys[i]) * 0.32
        dots[i].style.translate = `${xs[i].toFixed(1)}px ${ys[i].toFixed(1)}px`
        px = xs[i]; py = ys[i]
      }
      raf = awake ? requestAnimationFrame(tick) : 0
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={ref} className={styles.trail} data-on="false" aria-hidden="true">
        {Array.from({ length: DOTS }, (_, i) => (
          <i key={i} style={{ ['--i' as string]: i } as React.CSSProperties} />
        ))}
      </div>
      {/* the goo filter itself — zero-size, never painted */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <defs>
          <filter id="dnp-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}
