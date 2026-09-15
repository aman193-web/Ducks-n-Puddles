/**
 * The Ducks 'n Puddles waterline, measured pixel-by-pixel from
 * media/brand/patterns/wave-banner.png (2852x550) and normalised to a 1000-unit period.
 *
 * It is NOT a sine wave. The brand profile alternates a WIDE TALL hump with a
 * NARROW SHORT one, and it carries three stacked bands of constant thickness.
 * Reproducing that asymmetry is what stops it reading as a stock wave divider.
 *
 *   period            1000
 *   tall crest        t=0.00   height 168 above the trough line
 *   trough            t=0.33
 *   short crest       t=0.50   height  88 above the trough line
 *   trough            t=0.67
 *   navy band          59 thick     sky band  60 thick     splash body fills below
 */
export const PERIOD = 1000
export const CREST_TALL = 9.5
export const CREST_SHORT = 89.8
export const TROUGH = 177.6
export const BAND_NAVY = 59
export const BAND_SKY = 60
export const VIEW_H = 420

/** Cubic with horizontal tangents at both ends — the closest Bezier fit to a half-cosine. */
const seg = (x0, y0, x1, y1) => {
  const k = (x1 - x0) / 2
  return `C ${x0 + k} ${y0} ${x1 - k} ${y1} ${x1} ${y1}`
}

/** One period of the crest line, starting at a tall crest. */
export function crestPath(offsetY = 0, periods = 1) {
  const o = (y) => (y + offsetY).toFixed(2)
  let d = `M 0 ${o(CREST_TALL)}`
  for (let p = 0; p < periods; p++) {
    const b = p * PERIOD
    d += ` ${seg(b + 0, CREST_TALL + offsetY, b + 330, TROUGH + offsetY)}`
    d += ` ${seg(b + 330, TROUGH + offsetY, b + 500, CREST_SHORT + offsetY)}`
    d += ` ${seg(b + 500, CREST_SHORT + offsetY, b + 670, TROUGH + offsetY)}`
    d += ` ${seg(b + 670, TROUGH + offsetY, b + PERIOD, CREST_TALL + offsetY)}`
  }
  return d
}

/** A closed shape: the crest line at `offsetY`, filled down to the bottom of the box. */
export function bandPath(offsetY, periods = 1) {
  return `${crestPath(offsetY, periods)} L ${periods * PERIOD} ${VIEW_H} L 0 ${VIEW_H} Z`
}

export const bands = (periods = 1) => [
  { fill: 'navy', d: bandPath(0, periods) },
  { fill: 'sky', d: bandPath(BAND_NAVY, periods) },
  { fill: 'splash', d: bandPath(BAND_NAVY + BAND_SKY, periods) },
]
