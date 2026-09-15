'use client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReduced } from './motion'

/** Below this we leave native scrolling alone — smoothing fights touch inertia. */
export const SMOOTH_MIN = 768
/** Pinned, scrubbed scenes only run where there is room for them. */
export const SCENE_MIN = 1024

let lenis: Lenis | null = null

/**
 * Lenis, driven by GSAP's ticker rather than its own rAF loop.
 *
 * Two things make this correct rather than merely working:
 *  - ScrollTrigger.update is subscribed to Lenis's scroll event, so pinned and
 *    scrubbed triggers read the interpolated position, not the native one. Skip
 *    this and every pin drifts a frame behind the content.
 *  - lagSmoothing(0) stops GSAP from "catching up" after a slow frame, which
 *    would otherwise make a scrubbed timeline jump.
 *
 * Lenis 1.3 drives native scroll rather than transforming a wrapper, so
 * position: sticky and position: fixed keep working underneath it.
 */
export function initSmooth(): (() => void) | undefined {
  if (typeof window === 'undefined') return
  if (prefersReduced()) return
  if (window.innerWidth < SMOOTH_MIN) return
  if (lenis) return

  lenis = new Lenis({
    duration: 1.2,          // the reference's own value — a glide, not a drift
    autoRaf: false,
    respectReducedMotion: true,
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    lenis?.off('scroll', onScroll)
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    lenis?.destroy()
    lenis = null
  }
}

export const getLenis = () => lenis
