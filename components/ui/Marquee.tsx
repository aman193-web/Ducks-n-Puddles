import { Flower, Sun, Heart, Star, Drop, Smiley } from '@phosphor-icons/react/dist/ssr'
import styles from './Marquee.module.css'

/** Kid-friendly glyph set, each with its own disc colour and rest angle. */
const GLYPHS = [
  { Icon: Flower, bg: 'var(--paper)', rot: -8 },
  { Icon: Sun, bg: 'var(--orange)', rot: 6 },
  { Icon: Drop, bg: 'var(--sky)', rot: -5 },
  { Icon: Heart, bg: 'var(--chichi)', rot: 8 },
  { Icon: Star, bg: 'var(--goosey)', rot: -7 },
  { Icon: Smiley, bg: 'var(--paper)', rot: 5 },
] as const

interface Props {
  items: string[]
  colour?: string
  rot?: number
  dir?: 'ltr' | 'rtl'
  seconds?: number
}

/**
 * Infinite rotated ticker. The track holds the items TWICE and translates exactly
 * -50%, so the loop is seamless with no JS and no measurement.
 */
export function Marquee({ items, colour = 'var(--sun)', rot = -3.2, dir = 'ltr', seconds = 32 }: Props) {
  const group = (
    <span className={styles.group} aria-hidden="true">
      {items.map((t, i) => {
        const g = GLYPHS[i % GLYPHS.length]
        return (
          <span className={styles.item} key={`${t}-${i}`}>
            {t}
            <span
              className={styles.icon}
              style={{ ['--i-bg' as string]: g.bg, ['--i-rot' as string]: `${g.rot}deg` } as React.CSSProperties}
            >
              <g.Icon weight="fill" color="var(--ink)" />
            </span>
          </span>
        )
      })}
    </span>
  )

  return (
    <div
      className={styles.band}
      data-dir={dir}
      style={{
        ['--bg' as string]: colour,
        ['--rot' as string]: `${rot}deg`,
        ['--dur' as string]: `${seconds}s`,
      } as React.CSSProperties}
    >
      {/* announced once, cleanly; the visual loop is hidden from assistive tech */}
      <p className="vh">{items.join('. ')}.</p>
      <div className={styles.track}>{group}{group}</div>
    </div>
  )
}
