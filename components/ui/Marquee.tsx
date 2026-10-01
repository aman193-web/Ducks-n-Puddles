import { Motif, type MotifName } from '@/components/Motif'
import styles from './Marquee.module.css'

/** Three marks, all the brand's own, all inline SVG on `currentColor`.
 *
 *  The footprints were a raster here until now, and mixing the two is what made
 *  the row look inconsistent: the PNG is painted brand navy #294F96 while the
 *  splash and wave take --ink #10264A, so one mark of the three read visibly
 *  bluer — and its box was 41.6px against their 36.4, because a raster of a
 *  different aspect cannot share their square. On one colour contract and one
 *  square, all three now match on both ribbons.
 */
/* The splash is out — the client's call: as a filled starburst it read as a
   blot beside two open, linear marks rather than as one of a set. */
/** The three of them, in the order the client's line-up reads. */
const FACES = ['vincey-swim', 'chichi-swim', 'goosey-swim'] as const

const MARKS: MotifName[] = ['footprints', 'waves']

interface Props {
  items: string[]
  colour?: string
  rot?: number
  dir?: 'ltr' | 'rtl'
  seconds?: number
  /** Render the three characters beside each phrase instead of a brand mark —
   *  the pink band's "playful branded moment". */
  faces?: boolean
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
export function Marquee({ items, colour = 'var(--sun-soft)', rot = -3.2, dir = 'ltr', seconds = 74, faces = false }: Props) {
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
  /* `faces` items are roughly three times the width of a text item — three
     characters plus the line — so they reach the same track length in far fewer
     repeats. At 26 the character band rendered 156 <img> elements (three per
     item, two groups) to fill a track that eight repeats covers: 8 x ~700px is
     5600px of half-track against the 4060px a 3440 ultrawide asks for. */
  const floor = faces ? 8 : 26
  const loop = Array.from(
    { length: Math.max(2, Math.ceil(floor / items.length)) },
    () => items,
  ).flat()

  /* `faces`: the client's Option 2 for the pink band — "instead of the current
     scrolling text, could we feature Chi Chi, Goosey, and Vincey together with
     'A Friend for Every Adventure'? We'd like it to feel more like a playful
     branded moment rather than another text-heavy element."

     Same track, same loop maths; what repeats is the three characters and one
     line rather than a list of phrases and a brand mark. */
  const group = faces ? (
    <span className={styles.group} aria-hidden="true">
      {loop.map((t, i) => (
        <span className={`${styles.item} ${styles.faceItem}`} key={`${t}-${i}`}>
          <span className={styles.faces}>
            {FACES.map((f) => (
              <img key={f} src={`/img/${f}-240.webp`} alt="" width={240} height={278}
                   className={styles.face} loading="lazy" decoding="async" />
            ))}
          </span>
          {t}
        </span>
      ))}
    </span>
  ) : (
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
        /* A straight band has no rotated corners to absorb, so it keeps its
           own box instead of being pulled up into the section above. */
        ...(rot === 0 ? { ['--bleed' as string]: '0px' } : {}),
      } as React.CSSProperties}
    >
      {/* announced once, cleanly; the visual loop is hidden from assistive tech */}
      <p className="vh">{items.join('. ')}.</p>
      <div className={styles.track}>{group}{group}</div>
    </div>
  )
}
