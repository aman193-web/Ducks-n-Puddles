'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getLenis } from '@/lib/smooth'

/**
 * EVERY NAVIGATION STARTS AT THE TOP.
 *
 * Next already scrolls the window on a route change, and on this site it mostly
 * works — I could not reproduce the reported case in a browser. But "mostly" is
 * the wrong word for it, and the reason it is only mostly is identifiable:
 * Lenis keeps its OWN scroll position (`animatedScroll`) and does not learn
 * about a scroll the framework performed behind it. When the two disagree, the
 * next wheel tick snaps the page back to wherever Lenis still believed it was —
 * which is exactly the symptom reported, on a footer link clicked from the
 * bottom of a long page.
 *
 * MotionProvider also sets `history.scrollRestoration = 'manual'`, which hands
 * the whole question to us, so answering it here rather than hoping is right
 * either way.
 *
 * Not on a hash: /#squad and the Journal's anchors are navigations too, and
 * forcing those to the top would break every in-page link on the site.
 */
export function RouteScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.location.hash) return
    /* Tell Lenis first. Its `immediate` jump also writes the native position,
       so the window call below is the fallback for the cases Lenis is not
       running at all — under 768px, and under reduced motion. */
    getLenis()?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
