'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from '@phosphor-icons/react/dist/ssr'
import styles from './ScrollTop.module.css'

/**
 * Back to top.
 *
 * Appears only once there is a page's worth of scroll behind you — a button that
 * is visible at the top of the page is a button pointing at where you already
 * are. Uses the native smooth scroll rather than Lenis so it still works on the
 * breakpoints where Lenis is deliberately not initialised, and it respects
 * prefers-reduced-motion for free.
 */
export function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:150vh;pointer-events:none;visibility:hidden'
    document.body.prepend(sentinel)
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 })
    io.observe(sentinel)
    return () => { io.disconnect(); sentinel.remove() }
  }, [])

  return (
    <button
      type="button"
      className={styles.btn}
      data-show={show}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className="vh">Back to top</span>
      <ArrowUp size={22} weight="bold" aria-hidden="true" />
    </button>
  )
}
