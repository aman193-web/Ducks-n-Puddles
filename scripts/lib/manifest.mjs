/**
 * Single source of truth for the asset pipeline.
 *
 * ASSET TIERS (governs where a photo may appear):
 *   A  renders only — the canonical product. The ONLY assets allowed in a product context.
 *   B  atmosphere   — the prototype is absent, <10% of frame, or defocused. Safe above the line.
 *   C  never product — the ring handle / green duck mark / missing name sticker reads clearly.
 *                      Usable ONLY inside "From Sample to Shelf", explicitly captioned as a sample.
 *
 * GRADES:
 *   chlorine  the pro shoot. Already graded; needs the green turf pushed toward cyan so it stops
 *             fighting the blue/yellow/orange palette.
 *   overcast  the iPhone dune session. Flat grey dusk; needs warmth, contrast and saturation.
 *   none      renders, logos, patterns — never graded.
 */

export const PHOTO_DIR = 'assets-source/photos'
export const VIDEO_DIR = 'assets-source/videos'
export const BRAND_DIR = 'media/brand'

/** Responsive widths. Clamped per-source at build time — we never upscale. */
export const WIDTHS = [320, 480, 640, 768, 960, 1280, 1536, 1920, 2560]

export const photos = [
  // ---- Tier B: atmosphere. Above the line. ----
  { id: 'pool-caustics',   src: '165A6816.JPG', tier: 'B', grade: 'chlorine',
    role: 'texture', crop: { top: 0, heightPct: 0.55 },
    alt: 'Sunlit swimming-pool water, rippling and bright.' },
  { id: 'open-water',      src: '165A6837.JPG', tier: 'B', grade: 'chlorine',
    role: 'texture', crop: { top: 0, heightPct: 0.5 },
    alt: 'Clear turquoise pool water in soft daylight.' },
  { id: 'cart-path',       src: '165A6877.JPG', tier: 'B', grade: 'chlorine',
    role: 'band', focal: { x: 0.5, y: 0.42 },
    alt: 'Two children walking hand in hand down a sunlit path under a wide cloudy sky.' },
  { id: 'dune-walk',       src: 'Photo Sep 19 2025, 6 57 07 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'band', focal: { x: 0.5, y: 0.45 },
    alt: 'A child walking away through tall dune grass towards the sea.' },
  { id: 'shore-horizon',   src: 'Photo Sep 19 2025, 6 55 28 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'texture', crop: { top: 0, heightPct: 0.42 },
    alt: 'A wide beach horizon at dusk with layered cloud.' },
  { id: 'shell-hands',     src: 'Photo Sep 19 2025, 6 57 26 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'portrait', focal: { x: 0.42, y: 0.24 },
    alt: 'A smiling child sitting in the sand among dune grass.' },

  // ---- Tier C: prototypes. "From Sample to Shelf" only, always captioned. ----
  { id: 'sample-turf',     src: '165A6600.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early Ducks ’n Puddles sample bottles standing on grass in warm backlight.' },
  { id: 'sample-splashpad',src: '165A6643.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'An early sample bottle standing on a painted splash-pad surface.' },
  { id: 'sample-carry',    src: '165A6709.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'A child carrying an early sample bottle by its handle across a tennis court.' },
  { id: 'sample-mosaic',   src: '165A6854.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early sample bottles on stone coping in front of a blue mosaic fountain.' },
  { id: 'sample-caddy',    src: '165A6970.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early sample bottles tucked into a yellow beach caddy with a striped towel.' },
  { id: 'sample-beach',    src: 'Photo Sep 19 2025, 6 55 23 PM.jpg', tier: 'C', grade: 'overcast',
    role: 'sample',
    alt: 'Three later sample bottles standing on wet sand at dusk.' },
]

/** Tier A. Renders + logos + patterns: alpha preserved, never graded, never upscaled. */
export const alphaAssets = [
  { id: 'vincey',  src: `${BRAND_DIR}/products/vincey-bottle.png`,  widths: [310, 621] },
  { id: 'chichi',  src: `${BRAND_DIR}/products/chi-chi-bottle.png`, widths: [310, 621] },
  { id: 'goosey',  src: `${BRAND_DIR}/products/goosey-bottle.png`,  widths: [310, 621] },
  { id: 'trio',    src: `${BRAND_DIR}/products/three-bottles.png`,  widths: [640, 1046, 2093] },
  { id: 'logo-primary',   src: `${BRAND_DIR}/logos/primary-logo.png`,   widths: [132, 264, 528] },
  /* The same mark without the "A Friend for Every Adventure" line. The header
     needs the lockup at ~40px tall, where the tagline is unreadable anyway and
     only makes the duck smaller. */
  { id: 'logo-mark',      src: `${BRAND_DIR}/logos/secondary-logo.png`, widths: [120, 240, 480] },
  { id: 'logo-stacked',   src: `${BRAND_DIR}/logos/stacked-wordmark-waves.png`, widths: [150, 300] },
  { id: 'mascot',         src: `${BRAND_DIR}/icons/mascot-icon.png`,    widths: [140, 280] },
  { id: 'splash',         src: `${BRAND_DIR}/icons/water-splash-icon.png`, widths: [334, 669] },
  { id: 'pattern-primary',   src: `${BRAND_DIR}/patterns/primary-pattern-transparent.png`,   widths: [320, 640] },
  { id: 'pattern-secondary', src: `${BRAND_DIR}/patterns/secondary-pattern-transparent.png`, widths: [240, 480] },

  /* ---- THE CHARACTERS ---------------------------------------------------
     The illustrated Chi Chi, Goosey and Vincey — what the client most wanted
     on the site, and what makes this a character brand rather than a bottle
     shop. Masters live in media/brand/characters/ at 1254x1254 with real
     alpha; 35 poses are on disk and the subset below is what is actually
     placed. Add a line here to bring another pose into play.

     Two traps, both load-bearing:
       - Widths must stay <= the master's native width or they are silently
         dropped (build-images.mjs), and if every width is dropped <Picture>
         renders width={undefined} / height={NaN}.
       - alphaAssets carry no `alt`, so <Picture> without an explicit alt
         renders alt="" aria-hidden. Correct for a decorative cameo; wrong for
         a character that is actually content. Pass alt when it means something. */
  { id: 'chichi-idle',   src: `${BRAND_DIR}/characters/chichi-idle.png`,   widths: [420, 840] },
  { id: 'goosey-idle',   src: `${BRAND_DIR}/characters/goosey-idle.png`,   widths: [420, 840] },
  { id: 'vincey-idle',   src: `${BRAND_DIR}/characters/vincey-idle.png`,   widths: [420, 840] },
  { id: 'chichi-wave',   src: `${BRAND_DIR}/characters/chichi-wave.png`,   widths: [340, 680] },
  { id: 'goosey-wave',   src: `${BRAND_DIR}/characters/goosey-wave.png`,   widths: [340, 680] },
  { id: 'chichi-splash', src: `${BRAND_DIR}/characters/chichi-splash.png`, widths: [340, 680] },
  { id: 'goosey-rest',   src: `${BRAND_DIR}/characters/goosey-rest.png`,   widths: [300, 600] },
  { id: 'vincey-peek',   src: `${BRAND_DIR}/characters/vincey-peek.png`,   widths: [300, 600] },
  { id: 'chichi-walk',   src: `${BRAND_DIR}/characters/chichi-walk.png`,   widths: [300, 600] },
  { id: 'vincey-walk',   src: `${BRAND_DIR}/characters/vincey-walk.png`,   widths: [300, 600] },
  { id: 'goosey-cheer',  src: `${BRAND_DIR}/characters/goosey-cheer.png`,  widths: [300, 600] },
  /* The three of them together, standing in one puddle. This is the literal
     picture the Foundation's headline describes, so it is the one character
     asset the page cannot do without. Landscape master, 1448x1086. */
  { id: 'trio-puddle',   src: `${BRAND_DIR}/characters/trio-puddle.png`,   widths: [720, 1440] },
  { id: 'trio-walk',     src: `${BRAND_DIR}/characters/trio-walk.png`,     widths: [560, 1120] },
]

/**
 * Videos. Seven are portrait 2160x3840 SDR bt709; one is landscape 1920x1080
 * 10-bit HLG / BT.2020 with a Dolby Vision base layer and MUST be tone-mapped.
 */
export const videos = [
  { id: 'duck-1', src: '1 Duck.MOV',    hdr: false, orient: 'portrait', poster: 1.0 },
  { id: 'duck-2', src: '2 Ducks.MOV',   hdr: false, orient: 'portrait', poster: 0.8 },
  { id: 'duck-3', src: "3 Duck's.MOV",  hdr: false, orient: 'portrait', poster: 1.2 },
  { id: 'duck-4', src: '4 Ducks.MOV',   hdr: false, orient: 'portrait', poster: 1.0 },
  { id: 'duck-5', src: "5 Duck's.MOV",  hdr: false, orient: 'portrait', poster: 2.0 },
  { id: 'duck-6', src: '6 Duck.MOV',    hdr: false, orient: 'portrait', poster: 1.5 },
  { id: 'duck-end', src: 'Duck at end 6.mov', hdr: false, orient: 'portrait', poster: 7.5 },
  { id: 'shore',  src: 'Video Sep 19 2025, 6 57 36 PM.mov', hdr: true, orient: 'landscape', poster: 1.0 },
]
