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
export type MotifName =
  | 'droplets' | 'flower' | 'footprint' | 'splash' | 'wave' | 'duck'
  /* The two the client sent artwork for. `footprints` is the WALKING PAIR from
     media/brand/icons/footprints-*.png and `waves` the three-line mini-wave from
     mini-wave-*.png — the shapes the brand book actually uses. The singular
     `footprint` and `wave` stay: the first is the decal printed on Goosey's
     bottle, the second is the single crest lib/wave.ts draws at full size. */
  | 'footprints' | 'waves'

const teardrop = 'M12 2c0 0 7 7.6 7 12a7 7 0 0 1-14 0c0-4.4 7-12 7-12Z'

/* One webbed foot, in two pieces, so the single print and the pair are the same
   drawing rather than two that drift apart. */
const FOOT_WEB = 'M11.6 3.1c.5-.5 1.4-.3 1.6.4l1.5 5.2 4.6-2.5c.7-.4 1.4.3 1.1 1l-2.4 5.1 4.1.5c.8.1 1 1.1.3 1.5l-8.1 4.3a2 2 0 0 1-2.7-.8L8.2 11c-.4-.8.2-1.7 1-1.6l3.4.4-1.3-5.5a1 1 0 0 1 .3-1.2Z'
const FOOT_SPUR = 'M6.7 15.6c1.5-.7 3 .1 3.4 1.5.4 1.5-.5 3-2 3.4-1.6.4-3-.5-3.3-2-.3-1.3.4-2.4 1.9-2.9Z'

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
    // A droplet landing in a puddle: the drop, two thrown off either side, and
    // the ring it lands in. Drawn on the same 24x24 grid as the others so the
    // whole set shares one optical weight in the ribbon.
    return (
      <svg {...common}>
        <path d={teardrop} transform="translate(-0.6 -4.2) scale(0.55) translate(6 6)" />
        <ellipse cx="4.4" cy="10.6" rx="2" ry="2.3" transform="rotate(-20 4.4 10.6)" />
        <ellipse cx="19.6" cy="10.6" rx="2" ry="2.3" transform="rotate(20 19.6 10.6)" />
        <path d="M2.2 18.6c0-1.6 4.4-2.9 9.8-2.9s9.8 1.3 9.8 2.9-4.4 2.9-9.8 2.9-9.8-1.3-9.8-2.9Zm3.4 0c0 .7 2.9 1.3 6.4 1.3s6.4-.6 6.4-1.3-2.9-1.3-6.4-1.3-6.4.6-6.4 1.3Z" />
      </svg>
    )
  }

  if (name === 'footprints') {
    // A pair mid-stride, as the brand book prints them: one foot set back and
    // turned out, the other forward. Both are the same path as `footprint`, so
    // the single decal and the pair can never drift apart.
    return (
      <svg {...common}>
        <g transform="translate(0.4 0.2) scale(0.6) rotate(-12 12 12)">
          <path d={FOOT_WEB} /><path d={FOOT_SPUR} />
        </g>
        <g transform="translate(9.4 8.6) scale(0.6) rotate(26 12 12)">
          <path d={FOOT_WEB} /><path d={FOOT_SPUR} />
        </g>
      </svg>
    )
  }

  if (name === 'waves') {
    // The mini-wave: three stacked crests with rounded caps. Stroked, not
    // filled — the brand draws it as three lines of even weight, which a filled
    // path cannot hold at 1em.
    const crest = 'q3.1-2.2 6.2 0t6.2 0t6.2 0'
    return (
      <svg {...common} fill="none" stroke="currentColor"
           strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d={`M2.4 6.2${crest}`} />
        <path d={`M2.4 12${crest}`} />
        <path d={`M2.4 17.8${crest}`} />
      </svg>
    )
  }

  if (name === 'wave') {
    // The brand's own crest at icon scale: one tall hump, one short, the same
    // asymmetry lib/wave.ts draws at full size.
    return (
      <svg {...common}>
        <path d="M1.4 13.8c1.9 0 2.6-4.6 5.5-4.6s3.6 4.6 5.5 4.6c1.6 0 2-2.7 4-2.7 1.6 0 2.6 1 3.4 2.1l1.8 2.4-2.6 1.9-1.8-2.4c-.4-.6-.7-.8-.8-.8-.5 0-1 2.7-4 2.7-3.3 0-4.2-4.6-5.5-4.6s-2.1 4.6-5.5 4.6Z" />
      </svg>
    )
  }

  if (name === 'duck') {
    // Silhouette: body, head, beak, tuft, and the water line under it. Reads at
    // 16px, which the photographic bottle render does not.
    return (
      <svg {...common}>
        <path d="M16.1 2.4c.4-.9 1.7-.8 2 .2l.5 1.7c1.7.5 2.9 2 2.9 3.8 0 .5-.1 1-.2 1.4l1.5.4c.6.2.8.9.4 1.3-2.2 2.6-5.5 5.1-9.8 5.1-4.2 0-7.7-2-9.4-4.3-.4-.5 0-1.3.6-1.3h7.2c-.4-.8-.6-1.7-.6-2.6 0-2.3 1.6-4.3 3.7-4.9Zm4.3 4.9a.95.95 0 1 0-1.9 0 .95.95 0 0 0 1.9 0Z" />
        <path d="M2.6 18.1c3.2 1.9 6.9 2.7 10.2 2.2.9-.1 1.5.9.9 1.4-.5.4-1.5.6-2.8.7-3.9.2-7.6-1.3-9.7-3.6-.5-.6.2-1.2 1.4-.7Z" />
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
