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
  const group = (
    <span className={styles.group} aria-hidden="true">
      {items.map((t, i) => (
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
