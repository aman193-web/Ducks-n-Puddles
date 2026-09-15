'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'

/**
 * The hero's two JS-only behaviours. Everything else in that section is CSS, so
 * the panel is composed, filled and animated before this file ever loads.
 *
 * 1. Pointer parallax. The reference runs a five-layer scrub; ours runs the same
 *    idea off the pointer, which suits a scene you are looking INTO rather than
 *    scrolling past. Each layer declares its own `data-depth`, and the value is
 *    written to `translate` — deliberately not `transform`, which the wave drift
 *    and the entrance animations already own.
 *
 * 2. The water rises as you scroll. `--water` is the single number the whole
 *    composition is hung off — waterline, headline baseline, reflection origin
 *    and where the bottles stand all derive from it — so animating that one
 *    custom property moves the entire scene coherently, with no transforms and
 *    nothing to fight.
 */
export function HeroScene() {
  useEffect(() => {
    if (prefersReduced()) return
    const panel = document.querySelector<HTMLElement>('[data-hero-panel]')
    if (!panel) return

    initGsap()
    const mm = gsap.matchMedia()

    /* ---- pointer parallax: fine pointers with room to move only ---------- */
    mm.add('(min-width: 900px) and (pointer: fine)', () => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-depth]', panel)
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

      const onMove = (e: PointerEvent) => {
        const r = panel.getBoundingClientRect()
        tx = (e.clientX - r.left) / r.width - 0.5
        ty = (e.clientY - r.top) / r.height - 0.5
        if (!raf) raf = requestAnimationFrame(tick)
      }
      const onLeave = () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(tick) }

      const tick = () => {
        cx += (tx - cx) * 0.075          // heavy damping: water, not a mouse trail
        cy += (ty - cy) * 0.075
        for (const el of layers) {
          const d = Number(el.dataset.depth) || 0
          el.style.translate = `${(cx * d * 260).toFixed(2)}px ${(cy * d * 104).toFixed(2)}px`
        }
        raf = Math.abs(tx - cx) > 0.0004 || Math.abs(ty - cy) > 0.0004
          ? requestAnimationFrame(tick)
          : 0
      }

      panel.addEventListener('pointermove', onMove)
      panel.addEventListener('pointerleave', onLeave)
      return () => {
        panel.removeEventListener('pointermove', onMove)
        panel.removeEventListener('pointerleave', onLeave)
        if (raf) cancelAnimationFrame(raf)
        for (const el of layers) el.style.translate = ''
      }
    })

    /* ---- the tide comes in ---------------------------------------------
       --water is split into --water-base (set per breakpoint in CSS) minus
       --tide (driven here), so this never has to know which breakpoint won. */
    const tide = gsap.to(panel, {
      '--tide': '9%',
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        invalidateOnRefresh: true,
        id: 'heroTide',
      },
    })

    return () => {
      mm.revert()
      tide.scrollTrigger?.kill()
      tide.kill()
      panel.style.removeProperty('--tide')
      ScrollTrigger.refresh()
    }
  }, [])

  return null
}
