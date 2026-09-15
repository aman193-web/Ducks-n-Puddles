/**
 * The three per-character motifs, hand-authored from the printed product decal
 * (see media/brand/products/three-bottles.png): VINCEY carries two water droplets,
 * CHI CHI a flower, GOOSEY a duck footprint.
 *
 * These are on the physical bottle and were previously unused anywhere in the
 * brand's digital presence. Promoting them to a UI component gives each duck an
 * identity that survives being printed in one colour.
 */
export type MotifName = 'droplets' | 'flower' | 'footprint'

const teardrop = 'M12 2c0 0 7 7.6 7 12a7 7 0 0 1-14 0c0-4.4 7-12 7-12Z'

export function Motif({ name, size = 24, className }: { name: MotifName; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor',
    className, 'aria-hidden': true as const, focusable: 'false' as const }

  if (name === 'droplets') {
    return (
      <svg {...common}>
        <path d={teardrop} transform="translate(-3.5 -1.5) scale(0.62) translate(4 4)" />
        <path d={teardrop} transform="translate(9.5 6) scale(0.52) translate(2 2)" />
      </svg>
    )
  }

  if (name === 'flower') {
    const petals = [0, 72, 144, 216, 288]
    return (
      <svg {...common}>
        {petals.map((a) => (
          <ellipse key={a} cx="12" cy="5.6" rx="3.5" ry="4.6" transform={`rotate(${a} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="3.1" fill="var(--sticker-bg, #EF538E)" />
      </svg>
    )
  }

  // Duck footprint — three webbed toes plus the rear spur.
  return (
    <svg {...common}>
      <path d="M11.6 3.1c.5-.5 1.4-.3 1.6.4l1.5 5.2 4.6-2.5c.7-.4 1.4.3 1.1 1l-2.4 5.1 4.1.5c.8.1 1 1.1.3 1.5l-8.1 4.3a2 2 0 0 1-2.7-.8L8.2 11c-.4-.8.2-1.7 1-1.6l3.4.4-1.3-5.5a1 1 0 0 1 .3-1.2Z" />
      <path d="M6.7 15.6c1.5-.7 3 .1 3.4 1.5.4 1.5-.5 3-2 3.4-1.6.4-3-.5-3.3-2-.3-1.3.4-2.4 1.9-2.9Z" />
    </svg>
  )
}
