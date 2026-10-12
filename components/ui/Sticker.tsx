import { Motif, type MotifName } from '@/components/Motif'
import styles from './Sticker.module.css'

type StickerProps = {
  children: React.ReactNode
  /** The label's fill. Light grounds get the default; see the table below. */
  colour?: string
} & React.HTMLAttributes<HTMLSpanElement>

/**
 * THE SECTION EYEBROW — a soft cloud, on the client's approved reference.
 *
 * Third treatment and the right one. A chip rotated two degrees read as a box
 * that had slipped; a puddle outline fixed the tilt but was not what they had
 * in mind. This is a row of overlapping circles with a flat fill and no
 * outline, which is their own artwork.
 *
 * NO BORDER AND NO SHADOW, which breaks the house rule that every panel here is
 * outlined ink on flat colour. The reference has neither and the shape holds
 * without one.
 *
 * COLOUR, by the ground the eyebrow sits on, passed per call site because a
 * section's ground is not something an element can ask about:
 *   cream / paper / field  ->  sky-soft   (the default)
 *   any blue               ->  cream
 */
export function Sticker({ children, colour = 'var(--sky-soft)', className, style, ...rest }: StickerProps) {
  /* The viewBox is the label's own predicted PIXEL box, so the SVG's horizontal
     scale lands within a few percent of its vertical one and the circles stay
     round. See width(). */
  const vw = width(flatten(children))
  const puffs = Math.min(16, Math.max(3, Math.round((vw - H) / PITCH) + 1))
  const step = (vw - H) / (puffs - 1)

  return (
    <span
      {...rest}
      className={`${styles.sticker} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour, ...style } as React.CSSProperties}
    >
      {/* THE CLOUD, as a row of EQUAL overlapping circles rather than an
          outlined path. With one flat fill and no stroke they union by
          themselves: no arc maths, correct at any count, and both ends round by
          construction. An outlined version would need the union computed,
          because every internal arc would show.

          Equal on purpose. Varying the radii and nudging them off the centre
          line was tried, to make the shape read as a lumpier cloud, and it read
          as uneven instead — the regular scallop is what makes this look drawn
          rather than wobbly. */}
      <svg className={styles.shape} viewBox={`0 0 ${vw} ${H}`}
           preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {Array.from({ length: puffs }, (_, i) => (
          <circle key={i} cx={R + i * step} cy={R} r={R} />
        ))}
      </svg>

      <span className={styles.label}>{children}</span>
    </span>
  )
}

/* ---- the geometry -------------------------------------------------------- */

/**
 * The label's height in CSS pixels, PINNED in the stylesheet rather than left
 * to the font. That is what makes the viewBox a pixel box — one user unit is
 * one pixel vertically, always — so matching the viewBox width to the label's
 * width in pixels is enough to keep the scale square.
 */
const H = 46
const R = H / 2

/**
 * Centre-to-centre spacing, as a fraction of the diameter.
 *
 * 0.66. Two other values were put in front of the client: 0.75, where the dips
 * cut to about two thirds of the height and the shape read as a row of separate
 * circles, and 0.56, which closed them up but was paired with varied puff sizes
 * and lost the clean scallop. This sits between them — the bumps still read as
 * bumps, with a shallower notch between each.
 */
const PITCH = H * 0.66

/**
 * The label's width in pixels, from its text.
 *
 * The shape has to stretch: a label's width comes from its words, and nothing
 * can know that before layout. What it must not do is stretch by an unknown
 * amount, because that turns the circles into ellipses. So the viewBox is built
 * to a PREDICTION of the width and the horizontal scale lands near 1.
 *
 * 8.0 is the average advance of an uppercase character at --fs-micro with this
 * tracking, measured across the site's labels rather than guessed — an earlier
 * 9.4 was reading 0.75-0.94, which squashed every puff. 54 is the two side
 * paddings. Measured again after: -6% to +4%, invisible on a circle.
 *
 * Puffs are then spread evenly between the two ends rather than laid at a fixed
 * pitch, so the prediction error shows up as a notch a shade deeper or
 * shallower instead of as a flat or overshot right-hand end.
 */
function width(text: string) {
  return Math.round(text.trim().length * 8.0 + 54)
}

/** Children are plain strings at every call site; this is the safety net. */
function flatten(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(flatten).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return flatten((node as { props?: { children?: React.ReactNode } }).props?.children)
  }
  return ''
}

/**
 * A sticker that sits INSIDE a headline, interrupting the words — the Koa device
 * ("POWERFUL [trophy] NUTRITION"). Decorative, so it is hidden from assistive tech
 * and the sentence still reads cleanly to a screen reader.
 *
 * Untouched by the eyebrow redesign: a glyph wedged between two words is read as
 * a deliberate interruption whichever way it sits.
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
