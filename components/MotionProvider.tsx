'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, revealBatch, bob, popStickers, prefersReduced } from '@/lib/motion'
import { initSmooth } from '@/lib/smooth'

/**
 * Arms the scroll animations. Adds `js-anim` to <html> only once GSAP is live, so
 * the no-JS and pre-hydration page is fully visible — the opposite of the current
 * WordPress site, where every section sits at opacity:0 until JS runs.
 *
 * ⚠️ TWO EFFECTS, AND THE SPLIT IS THE POINT.
 *
 * This component lives in the root layout, and the layout does NOT remount on a
 * client-side navigation. The scan used to sit in the mount-once effect, so it
 * ran for whichever page was loaded first and never again: every page reached
 * by a <Link> — a blog post, the FAQ, contact, a product page — kept its
 * [data-anim] and [data-pop] attributes and simply never animated. Measured on
 * /ducks/vincey: both below-the-fold stickers registered on a hard load and
 * were untouched after arriving from the homepage. And the homepage's batch
 * triggers and infinite bob tweens stayed alive against detached nodes.
 *
 *   once      Lenis, the js-anim class, scroll restoration, the font refresh.
 *   per page  the scan, inside a gsap.context, reverted when the page goes —
 *             which kills that page's triggers and its bob loops with it.
 */
export function MotionProvider() {
  const pathname = usePathname()

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

    /* Every trigger position is computed from a layout that the display-swap
       font and the lazy images can still change. Without this, every start/end
       on the page is a few hundred pixels stale and scenes fire early. */
    let refreshed = false
    const refresh = () => { if (!refreshed) ScrollTrigger.refresh() }
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh, { once: true })

    return () => {
      refreshed = true
      window.removeEventListener('load', refresh)
      stopSmooth?.()
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestore
      root.classList.remove('js-anim')
    }
  }, [])

  useEffect(() => {
    if (prefersReduced()) return
    initGsap()

    let ctx: gsap.Context | undefined
    let stopReveal: (() => void) | undefined
    let stopPop: (() => void) | undefined

    /* TWO FRAMES, not one. RouteScrollReset is mounted AFTER this component, so
       its scroll-to-top runs after this effect does. Measuring the fold on the
       first frame would use the PREVIOUS page's scroll position — 4000px down
       the homepage — and treat half the new page as already passed. */
    let r2 = 0
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          stopReveal = revealBatch()
          stopPop = popStickers()
          bob()
        })
        ScrollTrigger.refresh()
      })
    })

    /* Images on the new page arrive after the scan and push everything below
       them down. The document `load` event only ever fires once per visit, so
       a client-side navigation needs its own: one refresh, debounced, after
       the images that are landing have landed. */
    let t = 0
    const onImg = (e: Event) => {
      if ((e.target as Element)?.tagName !== 'IMG') return
      clearTimeout(t)
      t = window.setTimeout(() => ScrollTrigger.refresh(), 160)
    }
    document.addEventListener('load', onImg, true)

    return () => {
      cancelAnimationFrame(r1)
      cancelAnimationFrame(r2)
      clearTimeout(t)
      document.removeEventListener('load', onImg, true)
      stopReveal?.()
      stopPop?.()
      ctx?.revert()
    }
  }, [pathname])

  return null
}
