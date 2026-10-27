import styles from './PuddleShape.module.css'

interface Props {
  /** The silicone's colour. Defaults to Vincey blue, which is the sleeve on the
   *  render this was drawn from. */
  colour?: string
  /** Draw snacks sitting in it. They are painted BEHIND the sleeve, so the front
   *  wall covers their lower halves and they read as being inside rather than
   *  stuck on. */
  snacks?: boolean
  /** A child's name lettered across the front — the personalisation concept. */
  name?: string
  className?: string
  /** Give it an accessible name. Omit for decoration. */
  alt?: string
}

/**
 * THE PUDDLE, drawn rather than photographed.
 *
 * ⚠️ READ THIS BEFORE REPLACING IT. The client asked for "an image of the Puddle
 * removed from the bottle and filled with snacks" and for a concept image of one
 * with a child's name on it. NEITHER PHOTOGRAPH EXISTS. The only product art we
 * hold is media/brand/products/*-bottle.png, which shows the sleeve ON the
 * bottle and cannot be cut free of it — the sleeve is lit, shaded and occluded
 * as part of the whole object.
 *
 * So this is a diagram, deliberately and visibly: flat fill, one ink outline, no
 * shading, in exactly the idiom the rest of the site already uses for Motif,
 * Sticker and WaveEdge. It does not pretend to be the product. A retouched
 * photograph that faked a detached sleeve would be a picture of something that
 * has never been made, on a page selling it to parents.
 *
 * The silhouette is traced from the render: a tall wall either side falling into
 * one wide shallow valley across the front, over a deeply rounded base. That
 * valley is the brand's own puddle-splash curve, which is presumably why the
 * part is called a Puddle.
 *
 * REPLACE IT the moment real photography of the detached sleeve arrives — the
 * section is written so that swapping <PuddleShape> for a <Picture> is a
 * one-line change in each of its three call sites.
 */

/* viewBox 200 × 250 — a 0.8 ratio, which is the sleeve's own (626 × 804 of the
   render, measured). Walls crest at y≈14 into narrow rounded horns, the valley
   runs wide and bottoms at y=60, and the base carries a deep radius.
   The dip is DEEPER than the product's (18% of the height against a measured
   10.5%). Drawn true it is a shallow scallop with nowhere for anything to sit,
   and the one thing this drawing has to say at 200px is that things go in it. */
const SLEEVE = 'M12 196 L12 44 C12 24 18 16 30 14 C52 20 56 60 100 60 '
             + 'C144 60 148 20 170 14 C182 16 188 24 188 44 L188 196 '
             + 'C188 230 168 242 140 242 L60 242 C32 242 12 230 12 196 Z'

/* Crackers and berries, in warm palette colours. Positioned so their tops clear
   the valley (y=60) and their bottoms fall behind the front wall. */
const SNACKS = [
  { s: 'circle', cx: 64, cy: 34, r: 20, fill: 'var(--sun)' },
  { s: 'rect', x: 84, y: 4, w: 38, h: 38, rx: 9, rot: -12, fill: 'var(--warm-orange)' },
  { s: 'circle', cx: 136, cy: 26, r: 19, fill: 'var(--chichi)' },
  { s: 'circle', cx: 108, cy: 46, r: 13, fill: 'var(--orange)' },
] as const

export function PuddleShape({ colour = 'var(--vincey)', snacks, name, className, alt }: Props) {
  return (
    <svg
      viewBox="0 0 200 250"
      className={[styles.puddle, className].filter(Boolean).join(' ')}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
    >
      {alt && <title>{alt}</title>}

      {snacks && (
        <g className={styles.snacks}>
          {SNACKS.map((k, i) =>
            /* data-snack: the product pages pop these in one at a time as the
               Puddle arrives — "fill it with snacks", acted out. */
            k.s === 'circle' ? (
              <circle key={i} data-snack="" cx={k.cx} cy={k.cy} r={k.r} fill={k.fill} />
            ) : (
              <rect
                key={i} data-snack="" x={k.x} y={k.y} width={k.w} height={k.h} rx={k.rx} fill={k.fill}
                transform={`rotate(${k.rot} ${k.x + k.w / 2} ${k.y + k.h / 2})`}
              />
            ),
          )}
        </g>
      )}

      <path d={SLEEVE} fill={colour} className={styles.body} />

      {name && (
        <text x="100" y="174" className={styles.name} textAnchor="middle">
          {name}
        </text>
      )}
    </svg>
  )
}
