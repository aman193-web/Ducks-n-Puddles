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
    // The client's own splash file (media/brand/icons/splash-icon.svg), path
    // lifted verbatim and recoloured to currentColor. Replaces a hand-drawn
    // one; supplied artwork beats an approximation of it every time.
    return (
      <svg {...common} viewBox="0 0 48 48">
        <path d="M10 42c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3m6.444-31.167a1 1 0 0 0 1.536-.64c.563-2.877.744-4.89.003-6.669a3.404 3.404 0 0 0-4.426-1.837 3.405 3.405 0 0 0-1.851 4.452c.734 1.781 2.298 3.067 4.738 4.694m27.92 24.723c-1.357-1.366-3.293-1.961-6.168-2.536a1.002 1.002 0 0 0-1.176 1.176c.574 2.875 1.174 4.805 2.536 6.168a3.404 3.404 0 0 0 4.792.013 3.404 3.404 0 0 0 .016-4.821M27 41c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3m3-32c1.654 0 3-1.346 3-3s-1.346-3-3-3-3 1.346-3 3 1.346 3 3 3m4.535 25.415c.623.734.965 1.651.965 2.585 0 2.206-1.794 4-4 4-1.191 0-2.425-.586-3.069-1.458-.714-.968-1.057-2.211-1.389-3.413-.698-2.533-1.126-3.465-2.806-3.188-1.792.293-2.016 4.706-2.149 7.341-.072 1.429-.13 2.557-.356 3.281C21.098 45.586 19.152 47 17 47a5.03 5.03 0 0 1-4.129-2.167c-.915-1.319-1.134-2.98-.586-4.442.402-1.074 1.451-2.446 2.683-4.02 3.539-4.523 3.141-5.283 3.08-5.323-1.129-.747-2.793.621-5.017 2.642C11.157 35.392 9.388 37 7.5 37c-2.206 0-4-1.794-4-4 0-1.538.939-3.018 2.284-3.6.606-.263 1.57-.487 2.791-.771 2.184-.508 6.728-1.564 6.728-2.954 0-2.468-2.483-3.645-5.991-5.038-1.776-.706-3.311-1.315-4.217-2.266-2.155-2.261-2.148-5.597.017-7.761 1.967-1.966 5.176-2.138 7.308-.391 1.058.867 1.947 2.384 2.89 3.991 1.567 2.671 2.763 4.514 3.857 3.915 2.012-1.1 1.701-1.852 1.022-3.5-.324-.782-.689-1.669-.689-2.625 0-2.243 1.757-4 4-4 2.206 0 4 1.794 4 4 0 1.138-.501 2.103-.942 2.954-.789 1.522-1.085 2.091.822 3.181a.4.4 0 0 0 .355.044c1.235-.355 2.98-3.617 4.255-5.998 1.104-2.064 2.059-3.848 3.013-4.751A4.96 4.96 0 0 1 38.5 6c2.757 0 5 2.243 5 5a4.97 4.97 0 0 1-1.461 3.532c-1.03.988-2.792 2.016-4.657 3.105-2.696 1.574-6.771 3.953-6.357 5.389.246.856 1.297.802 3.716.339 1.137-.218 2.312-.444 3.293-.316 1.979.27 3.466 1.968 3.466 3.951 0 2.206-1.794 4-4 4-1.149 0-2.349-.636-3.509-1.251-2.438-1.294-3.318-1.508-4.057-.321-.649 1.043-.233 1.638 2.223 3.179.919.576 1.787 1.12 2.378 1.808m.639-21.84a1 1 0 0 0 1.363-.377c.729-1.263 1.083-1.738 1.262-1.908a1 1 0 0 0-1.377-1.45c-.421.4-.922 1.132-1.625 2.373a1 1 0 0 0 .377 1.362m-24.023-.809c-1.323-1.085-3.397-.97-4.625.259a1 1 0 0 0 0 1.415c.357.353.989.423 1.414 0 .513-.511 1.401-.569 1.941-.127a1 1 0 0 0 1.27-1.547m6.056 26.605a1 1 0 0 0-1.401.191c-.98 1.289-1.458 2.022-1.648 2.532-.317.849-.186 1.822.357 2.6a1 1 0 0 0 1.643-1.141c-.167-.241-.215-.525-.127-.758.109-.293.569-.973 1.367-2.023a1 1 0 0 0-.191-1.401m4.277-18.092a1 1 0 0 0-1.356-.399c-.502.273-.987.412-1.443.412h-.011a1 1 0 0 0-.003 2h.014c.795 0 1.603-.221 2.4-.656.484-.264.663-.872.399-1.357" />
      </svg>
    )
  }

  if (name === 'footprints') {
    // The brand's own footprint pair, from media/brand/icons/footprints-navy —
    // one path, on currentColor.
    //
    // It used to be the raster in the ribbon, and that was the whole problem:
    // the PNG is painted in brand navy #294F96 while the splash and wave beside
    // it are SVG on --ink #10264A, so one mark read visibly bluer than the other
    // two. It was the wrong SIZE too — a 41.6px box against their 36.4 — because
    // a raster of a different aspect cannot share their square.
    //
    // The polygonal tracing that made this unusable at 1em before is not
    // visible here: 91 units across a 36px box puts the vertices 0.4px apart.
    return (
      <svg {...common} viewBox="0 0 91 80">
        <path fillRule="evenodd" clipRule="evenodd" d="M 52 34 L 52 38 L 50 41 L 50 43 L 48 47 L 48 50 L 47 51 L 47 55 L 46 56 L 46 60 L 45 61 L 46 66 L 50 70 L 58 70 L 59 69 L 62 69 L 63 68 L 65 68 L 66 67 L 68 67 L 69 66 L 74 65 L 82 61 L 80 59 L 79 60 L 75 60 L 74 59 L 68 59 L 66 57 L 72 45 L 74 43 L 74 41 L 73 40 L 72 40 L 69 43 L 66 44 L 58 50 L 56 48 L 56 44 L 55 43 L 55 40 L 54 39 L 54 37 L 55 36 L 54 34 Z M 31 9 L 29 9 L 28 10 L 28 12 L 26 14 L 24 18 L 24 20 L 21 25 L 20 25 L 11 16 L 10 14 L 8 15 L 10 19 L 10 23 L 11 24 L 11 27 L 12 28 L 12 30 L 13 31 L 14 36 L 16 39 L 16 41 L 18 43 L 18 44 L 22 46 L 27 46 L 29 45 L 41 32 L 41 31 L 43 29 L 45 25 L 47 24 L 47 22 L 46 21 L 44 22 L 43 24 L 41 24 L 33 28 L 31 26 Z" />
      </svg>
    )
  }

  if (name === 'waves') {
    // The client's wave file. Compact — three short crests inside a square box —
    // which is the point: the one it replaces was 2.3:1 and read as a long
    // stripe in the ribbon, which they asked to remove.
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M6 7c-.375 0-.735.149-1 .414l-.293.293a1 1 0 0 1-1.414-1.414L3.586 6a3.414 3.414 0 0 1 4.828 0L9 6.586l-.707.707L9 6.586a1.414 1.414 0 0 0 2 0L11.586 6a3.414 3.414 0 0 1 4.828 0l.586.586a1.414 1.414 0 0 0 2 0l.707.707L19 6.586l.293-.293a1 1 0 1 1 1.414 1.414L20.414 8a3.414 3.414 0 0 1-4.828 0L15 7.414a1.414 1.414 0 0 0-2 0L12.414 8a3.414 3.414 0 0 1-4.828 0L7 7.414A1.41 1.41 0 0 0 6 7m0 5c-.375 0-.735.149-1 .414l-.293.293a1 1 0 0 1-1.414-1.414L3.586 11a3.414 3.414 0 0 1 4.828 0l.586.586a1.414 1.414 0 0 0 2 0l.586-.586a3.414 3.414 0 0 1 4.828 0l.586.586a1.414 1.414 0 0 0 2 0l.293-.293a1 1 0 0 1 1.414 1.414l-.293.293a3.414 3.414 0 0 1-4.828 0L15 12.414a1.414 1.414 0 0 0-2 0l-.586.586a3.414 3.414 0 0 1-4.828 0L7 12.414A1.41 1.41 0 0 0 6 12m0 5c-.375 0-.735.149-1 .414l-.293.293a1 1 0 0 1-1.414-1.414L3.586 16a3.414 3.414 0 0 1 4.828 0l.586.586a1.414 1.414 0 0 0 2 0l.586-.586a3.414 3.414 0 0 1 4.828 0l.586.586a1.414 1.414 0 0 0 2 0l.293-.293a1 1 0 0 1 1.414 1.414l-.293.293a3.414 3.414 0 0 1-4.828 0L15 17.414a1.414 1.414 0 0 0-2 0l-.586.586a3.414 3.414 0 0 1-4.828 0L7 17.414A1.41 1.41 0 0 0 6 17" />
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
