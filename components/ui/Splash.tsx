/**
 * Droplets framing the hero — the water-theme stand-in for the reference's
 * photographed hands reaching in from each edge.
 *
 * Two earlier attempts are worth recording so they are not repeated: a
 * hand-authored splash crown read as a spiky starburst rather than water, and the
 * brand's own wave profile rotated on its side exposed its flat back as a hard
 * diagonal wedge. A droplet is unambiguous at any size, trivial to get right, and
 * is already a brand motif (it is Vincey's, and it sits in the logo).
 *
 * Flat cream with an ink outline so it carries real contrast on the sky ground —
 * the brand's blue splash artwork washed out to a smudge there.
 */
const DROP = 'M50 4C50 4 92 48 92 72a42 42 0 0 1-84 0C8 48 50 4 50 4Z'

interface Drop { x: number; y: number; size: number; rot: number; fill: string }

const LEFT: Drop[] = [
  { x: 4, y: 18, size: 118, rot: -18, fill: 'var(--cream)' },
  { x: 30, y: 62, size: 66, rot: 14, fill: 'var(--paper)' },
  { x: 1, y: 76, size: 42, rot: -8, fill: 'var(--cream)' },
]
const RIGHT: Drop[] = [
  { x: 58, y: 8, size: 96, rot: 22, fill: 'var(--cream)' },
  { x: 20, y: 48, size: 54, rot: -14, fill: 'var(--paper)' },
  { x: 66, y: 70, size: 70, rot: 10, fill: 'var(--cream)' },
]

export function Splash({ className, flip = false }: { className?: string; flip?: boolean }) {
  const drops = flip ? RIGHT : LEFT
  return (
    <div className={className} aria-hidden="true">
      {drops.map((d, i) => (
        <svg
          key={i}
          viewBox="0 0 100 116"
          fill="none"
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            rotate: `${d.rot}deg`,
          }}
        >
          <path d={DROP} fill={d.fill} stroke="var(--ink)" strokeWidth="6" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  )
}
