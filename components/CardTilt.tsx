'use client'
import { useEffect } from 'react'

/**
 * Cursor-reactive cards.
 *
 * Each card leans a degree or two toward the pointer and lifts its icon a little
 * further than its body, which is what sells the parallax — a flat rotation on
 * its own just looks like a wobble.
 *
 * One listener on the grid rather than one per card, and the work happens in a
 * single rAF: a pointermove handler that writes style on every move is the
 * classic way to make a page feel worse, not better.
 *
 * Fine pointers only, and never under reduced motion.
 */
export function CardTilt() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const grids = [...document.querySelectorAll<HTMLElement>('[data-tilt-grid]')]
    if (!grids.length) return

    let raf = 0
    let pending: { card: HTMLElement; x: number; y: number } | null = null

    const apply = () => {
      raf = 0
      if (!pending) return
      const { card, x, y } = pending
      card.style.setProperty('--tilt-x', `${(y * -5).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`)
      card.style.setProperty('--tilt-px', `${(x * 10).toFixed(1)}px`)
      card.style.setProperty('--tilt-py', `${(y * 10).toFixed(1)}px`)
    }

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('[data-tilt]')
      if (!card) return
      const r = card.getBoundingClientRect()
      pending = {
        card,
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      }
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const reset = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('[data-tilt]')
      if (!card) return
      for (const p of ['--tilt-x', '--tilt-y', '--tilt-px', '--tilt-py']) card.style.removeProperty(p)
    }

    for (const g of grids) {
      g.addEventListener('pointermove', onMove)
      g.addEventListener('pointerout', reset)
    }
    return () => {
      for (const g of grids) {
        g.removeEventListener('pointermove', onMove)
        g.removeEventListener('pointerout', reset)
      }
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
