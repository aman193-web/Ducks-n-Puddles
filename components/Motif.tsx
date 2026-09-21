/**
 * The three per-character motifs, hand-authored from the printed product decal
 * (see media/brand/products/three-bottles.png): VINCEY carries two water droplets,
 * CHI CHI a flower, GOOSEY a duck footprint.
 *
 * These are on the physical bottle and were previously unused anywhere in the
 * brand's digital presence. Promoting them to a UI component gives each duck an
 * identity that survives being printed in one colour.
 *
 * `splash`, `wave` and `duck` were added for the "subtle brand details" the
 * client asked for — puddles, splashes, footprints, duck silhouettes. They are
 * hand-authored in the same 24x24 / currentColor idiom as the three above,
 * NOT taken from media/brand/icons/svg-traced/: those are auto-traced from a
 * rasterised PDF and are jagged polylines (the splash alone is 13KB of line
 * segments), which reads as crude at the 1em these are used at.
 */
export type MotifName = 'droplets' | 'flower' | 'footprint' | 'splash' | 'wave' | 'duck'

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

  if (name === 'splash') {
    return (
      <svg {...common}>
        {/* a droplet landing, with two smaller ones thrown off either side */}
        <path d={teardrop} transform="translate(-1 -3) scale(0.58) translate(6 6)" />
        <circle cx="4.6" cy="9.4" r="1.9" />
        <circle cx="19.4" cy="9.4" r="1.9" />
        {/* the puddle it lands in */}
        <path d="M2.6 19.4c0-1.1 4.2-2 9.4-2s9.4.9 9.4 2-4.2 2-9.4 2-9.4-.9-9.4-2Z" />
      </svg>
    )
  }

  if (name === 'wave') {
    // The brand's own crest, at icon scale: one tall hump then a short one.
    return (
      <svg {...common}>
        <path d="M1 15.4c2.6 0 3.9-5.2 6.5-5.2s3.9 5.2 6.5 5.2 2.6-3.4 5.2-3.4c1.7 0 3 1.1 3.8 2.2v3.6c-.8-1.1-2.1-2.2-3.8-2.2-2.6 0-2.6 3.4-5.2 3.4-2.6 0-3.9-5.2-6.5-5.2S3.6 19 1 19Z" />
      </svg>
    )
  }

  if (name === 'duck') {
    // Silhouette: body, head, beak, tuft. Reads at 16px, which the bottle
    // render does not.
    return (
      <svg {...common}>
        <path d="M15.6 3.1c.5-1 1.9-.9 2.2.2l.4 1.5c1.7.4 2.9 1.9 2.9 3.7 0 .6-.1 1.1-.3 1.6l2.1.5c.6.1.9.8.5 1.3-2.1 2.9-5.6 5.9-10.2 5.9-4.3 0-7.8-2.1-9.4-4.4-.4-.6 0-1.4.7-1.4h7.5c-.4-.8-.6-1.7-.6-2.6 0-2.3 1.5-4.2 3.6-4.8ZM21 8.1c0-.5-.4-.9-.9-.9s-.9.4-.9.9.4.9.9.9.9-.4.9-.9Z" />
        <path d="M4.4 18.2c3 1.7 6.4 2.4 9.4 1.9 1.2-.2 2.3.7 2 1.5-.2.6-1.2.9-2.6 1-3.8.2-7.5-1.2-9.7-3.5-.6-.6.1-1.3.9-.9Z" />
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
