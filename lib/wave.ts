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
