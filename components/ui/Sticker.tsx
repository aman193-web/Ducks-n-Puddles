import { Motif, type MotifName } from '@/components/Motif'
import styles from './Sticker.module.css'

type StickerProps = {
  children: React.ReactNode
  colour?: string
} & React.HTMLAttributes<HTMLSpanElement>

/**
 * THE SECTION EYEBROW — a puddle, not a tilted pill.
 *
 * This was a rounded chip rotated two or three degrees. The client came back
 * with the reason it had to change, and it is a good one: readers were not
 * seeing a deliberate tilt, they were seeing a box that had slipped. A device
 * nobody reads as intentional is doing damage rather than nothing, because it
 * makes the whole page look slightly off-register.
 *
 * So the rotation is gone entirely and the SHAPE carries the playfulness
 * instead — an irregular puddle outline, which is the brand's own motif and
 * reads as drawn rather than as misaligned. Being a shape and not a transform,
 * it also survives `prefers-reduced-motion`, which flattens transforms site-wide
 * (global.css:155); the old tilt did not, so the eyebrows quietly straightened
 * for anyone browsing with motion reduced. One appearance for everybody now.
 *
 * The outline is an SVG laid under the text rather than a border-radius because
 * a border-radius cannot bulge — four corners can only ever be arcs, and the
 * difference between a puddle and a lozenge is the bulge between the corners.
 * `preserveAspectRatio="none"` lets one path serve labels from "FAQ" to "What
 * parents say"; `vector-effect="non-scaling-stroke"` keeps the outline an even
 * weight while it stretches, which is the part that would otherwise give it
 * away.
 */
export function Sticker({ children, colour = 'var(--sun-soft)', className, style, ...rest }: StickerProps) {
  return (
    <span
      {...rest}
      className={`${styles.sticker} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour, ...style } as React.CSSProperties}
    >
      <svg
        className={styles.blob}
        viewBox="0 0 160 52"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path vectorEffect="non-scaling-stroke" d={PUDDLE} />
      </svg>
      <span className={styles.label}>{children}</span>
    </span>
  )
}

/**
 * The puddle. Drawn once, at 160x52, and stretched to whatever the label needs.
 *
 * ONE FEATURE PER EDGE, and the two ends deliberately unequal: a broad low lobe
 * on the left tapering to a smaller, higher one on the right. That asymmetry is
 * what the eye reads as drawn — on a box 40px tall, a symmetrical wobble is
 * invisible at a glance and a wobble with several bumps pinches into a peanut
 * the moment the label is short ("FAQ" is 90px wide; "Out in the world" is
 * 210px, and one path has to hold both). Four bumps were tried first and did
 * exactly that.
 *
 * Because preserveAspectRatio is "none", every x in here is a FRACTION of the
 * final width, not a distance. Features stay where they are in the shape as it
 * stretches; what changes is how gentle they look.
 */
const PUDDLE = 'M 36 3.2'
  + ' C 70 0.6, 104 3.0, 130 8.6'        // top edge, rising gently to the right
  + ' C 150 12.9, 159.4 20, 156.8 29.4'  // the small right lobe, sitting high
  + ' C 154.4 38.2, 138 44.0, 114 46.0'
  + ' C 84 48.5, 50 48.6, 28 42.4'       // the bottom sags under the middle
  + ' C 9 37.1, 0.6 26.2, 3.4 16.6'      // the broad left lobe, sitting low
  + ' C 6.0 7.8, 18 4.6, 36 3.2 Z'

/**
 * A sticker that sits INSIDE a headline, interrupting the words — the Koa device
 * ("POWERFUL [trophy] NUTRITION"). Decorative, so it is hidden from assistive tech
 * and the sentence still reads cleanly to a screen reader.
 *
 * Still a rotated disc: the client's note was about the section eyebrows, and a
 * glyph wedged between two words is read as a deliberate interruption whichever
 * way it sits.
 */
export function Glyph({ motif, colour = 'var(--sun-soft)', rot = -6 }: {
  motif: MotifName; colour?: string; rot?: number
}) {
  return (
    <span className={styles.glyph} aria-hidden="true"
          style={{ ['--bg' as string]: colour, ['--rot' as string]: `${rot}deg` } as React.CSSProperties}>
      <Motif name={motif} size={64} />
    </span>
  )
}
