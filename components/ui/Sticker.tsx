import { Motif, type MotifName } from '@/components/Motif'
import styles from './Sticker.module.css'

type StickerProps = {
  children: React.ReactNode
  /** The label's fill. Light grounds get the default; see the table below. */
  colour?: string
  /** The sun-ray accent. */
  ray?: string
} & React.HTMLAttributes<HTMLSpanElement>

/**
 * THE SECTION EYEBROW — a scalloped cloud with sun rays, on the client's
 * approved reference.
 *
 * Two treatments preceded it: a chip rotated two degrees, which readers took
 * for a box that had slipped rather than a deliberate tilt, and a puddle
 * outline that fixed the tilt but was not what the client had in mind. This is
 * their own artwork: a soft horizontal scallop, flat fill, no outline, with
 * three yellow rays off the top-right corner.
 *
 * NO BORDER AND NO SHADOW, which is a deliberate break from the rest of the
 * site — every other panel here is outlined ink on flat colour. The reference
 * has neither and the shape carries itself without one, so this follows the
 * reference rather than the house rule.
 *
 * COLOUR, by the ground the eyebrow sits on. Both keep the reference's own
 * relationship — a PALE label with yellow rays — rather than inverting it:
 *   cream / paper / field  ->  sky-soft label, sun rays   (the default)
 *   any blue               ->  cream label, sun rays
 * A sun-soft label with cream rays was tried first for the blue grounds and the
 * rays disappeared into them; cream carries further on blue than soft yellow
 * does, and full sun is the only accent that reads on all three of this site's
 * blues (--sky-soft, --sky and --vincey-soft).
 * Passed per call site rather than sniffed, because a section's ground is not
 * something an element can ask about.
 */
export function Sticker({
  children, colour = 'var(--sky-soft)', ray = 'var(--sun)', className, style, ...rest
}: StickerProps) {
  /* The viewBox is built to the label's own predicted PIXEL width, and the
     bumps are spread evenly across it — so the SVG's horizontal scale lands
     within a few percent of its vertical one and the circles stay circles.
     See width(). */
  const vw = width(flatten(children))
  const bumps = Math.min(10, Math.max(3, Math.round((vw - H) / PITCH) + 1))
  const step = (vw - H) / (bumps - 1)

  return (
    <span
      {...rest}
      className={`${styles.sticker} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour, ['--ray' as string]: ray, ...style } as React.CSSProperties}
    >
      {/* THE SCALLOP, as a row of overlapping circles rather than one outlined
          path. With a single flat fill and no stroke they union into the shape
          by themselves — no arc maths, correct at any bump count, and both ends
          round by construction. An outlined version would need the union
          computed, because the internal arcs would show. */}
      <svg className={styles.shape} viewBox={`0 0 ${vw} ${H}`}
           preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {Array.from({ length: bumps }, (_, i) => (
          <circle key={i} cx={R + i * step} cy={R} r={R} />
        ))}
      </svg>

      {/* THE RAYS, in their own SVG because this one must NOT stretch — they
          are the one part of the mark with a fixed size, and sharing the
          scallop's viewBox would shear them by the label's width. */}
      <svg className={styles.rays} viewBox="0 0 34 34" aria-hidden="true" focusable="false">
        <line x1="6.5" y1="23.5" x2="11.5" y2="9.5" />
        <line x1="11.5" y1="26.5" x2="20.5" y2="17.5" />
        <line x1="15" y1="30" x2="28" y2="26" />
      </svg>

      <span className={styles.label}>{children}</span>
    </span>
  )
}

/* ---- the geometry -------------------------------------------------------- */

/**
 * The label's height in CSS pixels, PINNED in the stylesheet rather than left to
 * the font. That is what makes the viewBox below a pixel box: one user unit is
 * one pixel vertically, always, so matching the viewBox width to the label's
 * width in pixels is enough to keep the scale square.
 */
const H = 46
const R = H / 2

/**
 * Centre-to-centre spacing, as 0.75 of the diameter — measured off the client's
 * reference, where five bumps span about 3.8 diameters. It sets how deep the
 * dips are: at this pitch the waist between two bumps is about two thirds of
 * the full height, which is the reference's scallop. It is a target rather than
 * a constant, because the bumps are spread evenly across the real width.
 */
const PITCH = H * 0.75

/**
 * The label's width in pixels, from its text.
 *
 * The shape has to stretch: a label's width comes from its words, and nothing
 * can know that before layout. What it must not do is stretch by an unknown
 * amount, because that turns the circles into ellipses and the scallop stops
 * reading. So the viewBox is built to a PREDICTION of the width and the
 * horizontal scale lands near 1.
 *
 * 8.0 is the average advance of an uppercase character at --fs-micro with this
 * tracking, measured off the thirteen labels on the site rather than guessed —
 * an earlier 9.4 was reading 0.75-0.94, which squashed every bump. 54 is the two
 * side paddings. Across those thirteen the prediction now lands between -6% and
 * +4%, which is not visible on a circle.
 *
 * Bumps are then spread evenly between the two ends rather than laid at a fixed
 * pitch, so the prediction error shows up as a dip a shade deeper or shallower
 * instead of as a flat or overshot right-hand end.
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
 * a deliberate interruption whichever way it sits, and the client's note was
 * about the section labels.
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
