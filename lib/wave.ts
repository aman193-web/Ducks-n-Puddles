/**
 * The waterline geometry, measured pixel-by-pixel from
 * media/brand/patterns/wave-banner.png and normalised to a 1000-unit period.
 *
 * It is NOT a sine wave. The brand profile alternates a WIDE TALL hump with a
 * NARROW SHORT one, and carries three stacked bands of constant thickness.
 * Reproducing that asymmetry is what stops it reading as a stock wave divider —
 * and the current WordPress site uses Elementor's stock "waves" shape divider
 * twice, which is the single most recognisable template tell there is.
 */
export const PERIOD = 1000
export const CREST_TALL = 9.5
export const CREST_SHORT = 89.8
export const TROUGH = 177.6
export const BAND_NAVY = 59
export const BAND_SKY = 60
export const VIEW_H = 420

/** Cubic with horizontal tangents at both ends — the closest Bézier fit to a half-cosine. */
const seg = (x0: number, y0: number, x1: number, y1: number) => {
  const k = (x1 - x0) / 2
  return `C ${x0 + k} ${y0} ${x1 - k} ${y1} ${x1} ${y1}`
}

export function crestPath(offsetY = 0, periods = 1): string {
  let d = `M 0 ${(CREST_TALL + offsetY).toFixed(2)}`
  for (let p = 0; p < periods; p++) {
    const b = p * PERIOD
    d += ` ${seg(b, CREST_TALL + offsetY, b + 330, TROUGH + offsetY)}`
    d += ` ${seg(b + 330, TROUGH + offsetY, b + 500, CREST_SHORT + offsetY)}`
    d += ` ${seg(b + 500, CREST_SHORT + offsetY, b + 670, TROUGH + offsetY)}`
    d += ` ${seg(b + 670, TROUGH + offsetY, b + PERIOD, CREST_TALL + offsetY)}`
  }
  return d
}

/** The curve at `offsetY`, closed down to `bottom` — a filled body of water. */
export const bandPath = (offsetY: number, periods = 1, bottom = VIEW_H) =>
  `${crestPath(offsetY, periods)} L ${periods * PERIOD} ${bottom} L 0 ${bottom} Z`

/** The segment list of `crestPath`, walked right-to-left with the control points
 *  swapped — the reverse of the same curve. */
function crestPathReversed(offsetY: number, periods: number): string {
  const pts: [number, number][] = []
  for (let p = 0; p < periods; p++) {
    const b = p * PERIOD
    pts.push([b, CREST_TALL + offsetY], [b + 330, TROUGH + offsetY],
             [b + 500, CREST_SHORT + offsetY], [b + 670, TROUGH + offsetY])
  }
  pts.push([periods * PERIOD, CREST_TALL + offsetY])

  let d = ''
  for (let i = pts.length - 1; i > 0; i--) {
    const [x1, y1] = pts[i]
    const [x0, y0] = pts[i - 1]
    const k = (x1 - x0) / 2
    d += ` C ${x1 - k} ${y1} ${x0 + k} ${y0} ${x0} ${y0}`
  }
  return d
}

/**
 * A constant-thickness BAND between two copies of the curve — the thing the
 * brand banner actually is.
 *
 * Needed because stacking three `bandPath` fills paints every band all the way
 * to the bottom of the box, so the lowest one has a visible flat edge wherever
 * the box ends. A true ribbon is transparent below itself, which lets the
 * product sit BETWEEN the crest and the body of the same wave.
 */
export const ribbonPath = (top: number, bottom: number, periods = 1) =>
  `${crestPath(top, periods)} L ${periods * PERIOD} ${CREST_TALL + bottom}` +
  `${crestPathReversed(bottom, periods)} Z`

/**
 * The viewBox height the hero draws the curve into. Lives here rather than in
 * the component because the swimmers have to solve the same curve the SVG
 * paints, and two copies of 640 would drift apart the first time one changed.
 */
export const SPAN = 640

/**
 * Solve `x(t) = u` for the cubic laid down by `seg`.
 *
 * Both control points sit at the segment's horizontal midpoint, so in local
 * units x(t)/L is t^3 - 1.5t^2 + 1.5t — monotonic (its derivative 3t^2-3t+1.5
 * has no real roots), which is what makes Newton safe from any start.
 */
function tForX(u: number): number {
  let t = u
  for (let i = 0; i < 5; i++) {
    const f = t * t * t - 1.5 * t * t + 1.5 * t - u
    const d = 3 * t * t - 3 * t + 1.5
    t -= f / d
  }
  return t < 0 ? 0 : t > 1 ? 1 : t
}

/** [x0, x1, y0, y1] for the four segments `crestPath` emits, in one period. */
const SEGMENTS: [number, number, number, number][] = [
  [0, 330, CREST_TALL, TROUGH],
  [330, 500, TROUGH, CREST_SHORT],
  [500, 670, CREST_SHORT, TROUGH],
  [670, PERIOD, TROUGH, CREST_TALL],
]

/**
 * The height of the crest curve at any x, in the same units `crestPath` draws.
 *
 * This is the analytic twin of the path in the DOM: same segment table, same
 * Bézier. It exists so the swimming ducks can sit ON the wave at whatever x
 * they have reached, rather than on a straight line that the water crosses.
 * The y within a segment is the cubic's own 3t^2-2t^3 — control points share
 * their endpoints' y, which is what gives the profile horizontal tangents at
 * every crest and trough.
 */
export function crestY(x: number, offsetY = 0): number {
  const u = ((x % PERIOD) + PERIOD) % PERIOD
  for (const [x0, x1, y0, y1] of SEGMENTS) {
    if (u <= x1) {
      const t = tForX((u - x0) / (x1 - x0))
      return offsetY + y0 + (y1 - y0) * (3 * t * t - 2 * t * t * t)
    }
  }
  return offsetY + CREST_TALL
}
