import { Drop, PawPrint, Waves, Bird } from '@phosphor-icons/react/dist/ssr'
import styles from './Marquee.module.css'

/** The separator set, from Phosphor — the same library Specs, the FAQ, the
 *  Journal and the reels rail already draw from, so the site speaks one icon
 *  language instead of keeping a hand-drawn set alive for the ribbon alone.
 *
 *  What the client asked to remove was the outlined COLOUR DISC around each
 *  glyph, not icons as such: they suggested "little splashes/puddles or another
 *  subtle brand element". These are drop, pawprint, waves and bird — water and
 *  ducks — drawn in ink with no disc, and cycled so the band never repeats one
 *  mark across its width. Filled weight, because at ~1em a hairline outline
 *  disappears against the tinted band. */
const MARKS = [Drop, PawPrint, Waves, Bird] as const

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
 *
 * The separators were six Phosphor glyphs in outlined colour discs, which the
 * client named specifically as too "in your face". What went was the DISC —
 * these are Phosphor again, in ink at full opacity, no disc and no outline,
 * cycling through four water-and-duck marks rather than repeating one.
 */
export function Marquee({ items, colour = 'var(--sun-soft)', rot = -3.2, dir = 'ltr', seconds = 32 }: Props) {
  /* The loop is seamless only when HALF the track is at least as wide as the
     band, because the animation translates exactly -50%. The band is 118vw and
     keeps growing with the viewport, while the item text stops growing once
     --fs caps out — so a short list opens a gap on the right that gets worse the
     wider the screen. Measured at 1440: five items covered 909px of a 1703px
     band (794px short) and three items covered 611px (1092px short).
     Repeating the list to a floor of 26 entries puts half the track past 5000px.
     The band is 118vw, so the requirement scales with the display: 20 entries
     cleared 2560 with 702px to spare but would have fallen ~330px short on a
     3440 ultrawide. 26 covers that with room. */
  const loop = Array.from(
    { length: Math.max(2, Math.ceil(26 / items.length)) },
    () => items,
  ).flat()

  const group = (
    <span className={styles.group} aria-hidden="true">
      {loop.map((t, i) => (
        <span className={styles.item} key={`${t}-${i}`}>
          {t}
          {(() => {
            const Mark = MARKS[i % MARKS.length]
            return <Mark weight="fill" className={styles.mark} />
          })()}
        </span>
      ))}
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
