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
  const text = flatten(children)
  /* The viewBox is the label's own predicted PIXEL box, so the SVG's horizontal
     scale lands within a few percent of its vertical one and the puffs stay
     round. See width(). */
  const vw = width(text)
  const puffs = Math.min(16, Math.max(3, Math.round((vw - H) / PITCH) + 1))
  const step = (vw - H) / (puffs - 1)

  return (
    <span
      {...rest}
      className={`${styles.sticker} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour, ...style } as React.CSSProperties}
    >
      {/* THE CLOUD, as overlapping circles rather than an outlined path. With
          one flat fill and no stroke they union by themselves: no arc maths,
          correct at any puff count, and both ends round by construction. An
          outlined version would need the union computed, because every internal
          arc would show. */}
      <svg className={styles.shape} viewBox={`0 0 ${vw} ${H}`}
           preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {Array.from({ length: puffs }, (_, i) => {
          const { r, cy } = puff(text, i, puffs)
          return <circle key={i} cx={R + i * step} cy={cy} r={r} />
        })}
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
 * 0.56, down from 0.75: at the wider spacing the dips between puffs cut to
 * about two thirds of the height and the shape read as a row of separate
 * circles. Closer together they overlap by nearly half, the dips become the
 * gentle notches a cloud has, and the silhouette reads as one object.
 */
const PITCH = H * 0.56

/**
 * ONE PUFF — its radius and its centre height.
 *
 * A row of identical circles is a machine part, not a cloud. Real ones are
 * lumpy, so each puff is sized between 86% and 100% of the full radius and
 * nudged a little off the centre line.
 *
 * The variation is HASHED FROM THE LABEL'S OWN TEXT, not random: this component
 * renders on the server and again in the browser, and Math.random would hand
 * those two different clouds and trip hydration. Seeding from the text also
 * means every eyebrow on the site gets its own lumps rather than the same
 * silhouette thirteen times.
 *
 * The two end puffs are exempt. They are what makes the ends read as round and
 * what sets the shape's full height, so they stay at the full radius on the
 * centre line; shrinking either one pinched the end into a nose.
 */
function puff(seed: string, i: number, total: number) {
  if (i === 0 || i === total - 1) return { r: R, cy: R }
  const a = hash(seed, i * 2)
  const b = hash(seed, i * 2 + 1)
  return {
    r: R * (0.86 + 0.14 * a),
    /* Up to 5% of the height, and the SIGN ALTERNATES rather than being hashed
       too. Left free, a seed whose offsets happened to trend one way gave the
       cloud a slope — and a label that looks slightly tilted is the exact
       complaint this whole redesign came from. Alternating cannot trend. */
    cy: R + b * 0.05 * H * (i % 2 ? 1 : -1),
  }
}

/** FNV-1a over the text plus the index. Deterministic, so SSR and the browser
 *  agree, and cheap enough to run per puff. */
function hash(seed: string, salt: number) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) }
  h ^= salt; h = Math.imul(h, 16777619)
  return ((h >>> 0) % 1024) / 1024
}

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
