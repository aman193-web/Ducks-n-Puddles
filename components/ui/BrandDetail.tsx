import { Motif, type MotifName } from '@/components/Motif'
import styles from './BrandDetail.module.css'

interface Mark {
  name: MotifName
  /** px at the widest breakpoint; scales down with the viewport. */
  size: number
  /** % of the section box. */
  x: number
  y: number
  rot?: number
}

/** Named arrangements, so adding a detail to a section is one prop rather than
 *  five magic numbers. Each is tuned to sit in a section's margins, clear of
 *  the text column. */
const PRESETS: Record<string, Mark[]> = {
  /* Footprints walking in from the edge — used where a character has just left. */
  trail: [
    { name: 'footprint', size: 30, x: 3, y: 74, rot: -16 },
    { name: 'footprint', size: 26, x: 8, y: 83, rot: 6 },
    { name: 'footprint', size: 22, x: 13, y: 91, rot: -8 },
  ],
  /* Droplets thrown across the upper corners. */
  droplets: [
    { name: 'droplets', size: 46, x: 92, y: 14, rot: 14 },
    { name: 'droplets', size: 30, x: 86, y: 30, rot: -10 },
    { name: 'splash', size: 38, x: 5, y: 20, rot: -6 },
  ],
  /* The brand crest, repeated small along the bottom. */
  crests: [
    { name: 'wave', size: 52, x: 7, y: 88, rot: 0 },
    { name: 'wave', size: 40, x: 90, y: 82, rot: 0 },
  ],
  /* A duck silhouette and a splash — for a section a character has swum past. */
  wake: [
    { name: 'duck', size: 44, x: 96, y: 70, rot: 8 },
    { name: 'splash', size: 30, x: 90, y: 80, rot: -12 },
    /* was x:4 y:64, which landed on a reel caption */
    { name: 'droplets', size: 24, x: 3, y: 40, rot: 10 },
  ],
}

interface Props {
  preset: keyof typeof PRESETS | (string & {})
  /** Override the ink opacity. Default .12 — visible on a light ground, never
   *  competing with the copy. */
  opacity?: number
  className?: string
}

/**
 * The client's "little Ducks 'n Puddles elements throughout the site — puddles,
 * splashes, footprints, feathers, duck silhouettes — used subtly rather than
 * relying on heavy graphic elements. We want the site to feel like you are
 * entering their world."
 *
 * Built from the marks already printed on the physical bottles (`Motif`), not
 * from new artwork, and generalised from the arrangement Foundation proved.
 *
 * Always decorative, never interactive, and absent below 900px: on a phone the
 * copy already fills the screen and these would only crowd it — which is the
 * opposite of what the client asked for on mobile.
 *
 * The host section needs `position: relative` and, usually, `overflow: clip`.
 */
export function BrandDetail({ preset, opacity, className }: Props) {
  const marks = PRESETS[preset]
  if (!marks) return null

  return (
    <span
      className={[styles.field, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={opacity !== undefined ? ({ ['--detail-opacity' as string]: opacity } as React.CSSProperties) : undefined}
    >
      {marks.map((m, i) => (
        <span
          key={`${m.name}-${i}`}
          className={styles.mark}
          style={{
            ['--m-size' as string]: `${m.size}px`,
            ['--m-x' as string]: `${m.x}%`,
            ['--m-y' as string]: `${m.y}%`,
            rotate: `${m.rot ?? 0}deg`,
          } as React.CSSProperties}
        >
          <Motif name={m.name} />
        </span>
      ))}
    </span>
  )
}
