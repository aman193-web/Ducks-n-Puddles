'use client'
import { quack } from '@/lib/sound'
import styles from './Quacker.module.css'

/**
 * Wraps a character so clicking it quacks.
 *
 * A real <button>, not a click handler on the image: this is an interactive
 * control, so it has to be reachable by keyboard and announced as something you
 * can press. The <Duck> inside stays decorative — `aria-hidden` and
 * `pointer-events: none` — and the button carries the whole accessible name,
 * which is why the duck's own alt is left empty rather than duplicated here.
 *
 * `pointer-events: none` on the image is not a problem: a target that does not
 * hit-test simply passes the click through to this button behind it.
 *
 * Client-only so <Duck> can stay a server component — it renders on every
 * section and there is no reason to ship it, or <Picture>, to the browser.
 */
export function Quacker({
  name, className, density, children,
}: {
  name: string
  className?: string
  /** Mirrors <Duck>'s own density rule — see the note there for why it lives on
   *  the button rather than on the picture. */
  density?: 'always' | 'desktop'
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className={[styles.quacker, className].filter(Boolean).join(' ')}
      data-density={density}
      onClick={() => void quack()}
      aria-label={`Hear ${name} quack`}
    >
      {children}
    </button>
  )
}
