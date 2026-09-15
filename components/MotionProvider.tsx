'use client'
import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, revealBatch, bob, popStickers, prefersReduced } from '@/lib/motion'
import { initSmooth } from '@/lib/smooth'

/**
 * Arms the scroll animations. Adds `js-anim` to <html> only once GSAP is live, so
 * the no-JS and pre-hydration page is fully visible — the opposite of the current
 * WordPress site, where every section sits at opacity:0 until JS runs.
 */
export function MotionProvider() {
  useEffect(() => {
    const root = document.documentElement
    if (prefersReduced()) return

    /* With pinned sections, the browser restoring a mid-pin scroll position on
       reload drops the visitor into a half-played scene that looks broken. Take
       ownership of it so a reload always starts at the top. */
    const prevRestore = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    initGsap()
    const stopSmooth = initSmooth()
    root.classList.add('js-anim')

    let stopReveal: (() => void) | undefined
    let stopPop: (() => void) | undefined
    // next frame, so layout is settled before anything is measured
    const id = requestAnimationFrame(() => {
      stopReveal = revealBatch()
      stopPop = popStickers()
      bob()
    })

    /* Every trigger position is computed from a layout that the display-swap
       font and the lazy images can still change. Without this, every start/end
       on the page is a few hundred pixels stale and scenes fire early. */
    let refreshed = false
    const refresh = () => { if (!refreshed) ScrollTrigger.refresh() }
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })

    return () => {
      refreshed = true
      cancelAnimationFrame(id)
      stopReveal?.()
      stopPop?.()
      window.removeEventListener('load', refresh)
      stopSmooth?.()
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestore
      root.classList.remove('js-anim')
    }
  }, [])

  return null
}
