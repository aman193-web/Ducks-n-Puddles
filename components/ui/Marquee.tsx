import { asset, fallbackSrc } from '@/lib/assets'
import styles from './Marquee.module.css'

/** The client's OWN artwork, as files — not a redraw of it.
 *
 *  This separator has been three things. Six Phosphor glyphs in outlined colour
 *  discs, which the client asked to remove. Then Phosphor without the discs,
 *  which was still wrong: their PawPrint is a cat's pad and their Bird a
 *  songbird, while this brand walks on a three-toed WEBBED foot. Then a
 *  hand-drawn SVG of the real shapes, which was the right subject but read as a
 *  smudge at ribbon size — two 15px feet inside a 30px box.
 *
 *  So: the actual files from media/brand/icons/, at full resolution, trimmed of
 *  their transparent margin so the mark fills its box. Two marks alternating,
 *  not four — the footprint pair and the mini-wave are the two the brand book
 *  gives in a flat single colour, and they are the two that read in ink on a
 *  tinted band.
 *
 *  Plain <img>, not <Picture>: one band renders ~60 of these, and 60 <picture>
 *  elements with two <source> children each is a lot of DOM for one cached 3KB
 *  file. Resolved through the manifest so the pipeline still owns the path. */
const MARKS = ['mark-footprints', 'mark-wave'] as const

const MARK_IMGS = MARKS.map((id) => {
  const a = asset(id)
  const w = a.widths[a.widths.length - 1]
  return { src: fallbackSrc(id), w, h: Math.round(w / a.aspect) }
})

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
/* 50s, up from 32. The client asked for it to be slower: at 32 the band moved
   fast enough to read as an alert rather than as atmosphere, and the marks
   blurred past before you could see what they were. */
export function Marquee({ items, colour = 'var(--sun-soft)', rot = -3.2, dir = 'ltr', seconds = 50 }: Props) {
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
            const m = MARK_IMGS[i % MARK_IMGS.length]
            return (
              <img src={m.src} width={m.w} height={m.h} alt="" aria-hidden="true"
                   className={styles.mark} loading="lazy" decoding="async" />
            )
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
