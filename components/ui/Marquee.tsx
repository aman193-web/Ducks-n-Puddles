import { Motif, type MotifName } from '@/components/Motif'
import styles from './Marquee.module.css'

/** Rotating brand marks, in place of the six Phosphor glyphs in outlined discs
 *  the client asked to remove. Puddle, splash, footprint, wave, duck — the
 *  "little splashes/puddles or another subtle brand element" they suggested,
 *  cycled so the band does not repeat one mark all the way across. */
const MARKS: MotifName[] = ['droplets', 'splash', 'footprint', 'wave', 'duck']

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
 * The separator used to be a set of six Phosphor glyphs, each in its own outlined
 * colour disc. The client asked for the band to feel lighter and less "in your
 * face", and named the symbols specifically — so it is now the brand's own
 * droplet motif, drawn in ink at low opacity. One mark, no disc, no outline, and
 * it is already on the physical bottle.
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
          <Motif name={MARKS[i % MARKS.length]} className={styles.mark} />
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
