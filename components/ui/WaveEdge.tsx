import { crestPath, PERIOD, TROUGH } from '@/lib/wave'
import styles from './WaveEdge.module.css'

const H = TROUGH + 60

/**
 * The brand's own wave, measured pixel-by-pixel from
 * media/brand/patterns/wave-banner.png, used as a scalloped section edge.
 *
 * It is NOT a sine wave — the brand profile alternates a WIDE TALL hump with a
 * NARROW SHORT one. Reproducing that asymmetry is what stops it reading as the
 * stock Elementor wave divider the current WordPress site uses twice.
 *
 * preserveAspectRatio="none" lets the fill stretch edge-to-edge at any viewport.
 * No outline: section transitions are pure colour change, as in the reference,
 * where a drawn seam between blocks would read as a divider.
 *
 * `above` is NOT optional in practice. The area over the crest is the edge's own
 * box, which otherwise shows the <body> ground — so a wave between a yellow
 * section and a blue one opened a cream stripe across the seam. Pass the colour
 * of the section immediately above.
 */
export function WaveEdge({
  fill, above, flip = false, periods = 5,
}: { fill: string; above?: string; flip?: boolean; periods?: number }) {
  const w = PERIOD * periods
  const crest = crestPath(0, periods)

  return (
    <div className={`${styles.edge} ${flip ? styles.flip : ''}`} aria-hidden="true"
         style={above ? { background: above } : undefined}>
      <svg viewBox={`0 0 ${w} ${H}`} preserveAspectRatio="none" role="presentation">
        <path d={`${crest} L ${w} ${H} L 0 ${H} Z`} fill={fill} />
      </svg>
    </div>
  )
}
