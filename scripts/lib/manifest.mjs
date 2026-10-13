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

/**
 * `focal` — where the subject sits in the frame, 0-1, used as object-position
 * when `cover` has to discard part of it. Every photograph below that shows a
 * person and gets cropped into a landscape card carries one, because the card
 * figures are 16/10 and most of these are 2:3: centred, the crop takes the
 * heads off.
 *
 * It was declared here from the first build and never written into
 * lib/asset-manifest.json, so it did nothing for months. build-images.mjs
 * carries it through now.
 */

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
    role: 'band', focal: { x: 0.5, y: 0.34 },
    alt: 'Two children walking hand in hand down a sunlit path under a wide cloudy sky.' },
  { id: 'dune-walk',       src: 'Photo Sep 19 2025, 6 57 07 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'band', focal: { x: 0.5, y: 0.32 },
    alt: 'A child walking away through tall dune grass towards the sea.' },
  { id: 'shore-horizon',   src: 'Photo Sep 19 2025, 6 55 28 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'texture', crop: { top: 0, heightPct: 0.42 },
    focal: { x: 0.5, y: 0.4 },
    alt: 'A wide beach horizon at dusk with layered cloud.' },
  /* THE FAMILY. The professional shoot the Story section has been waiting for
     since September — Larisa, Vinny and their two children. Tier B rather than
     A because tiers are about the PRODUCT, and there is no bottle in this
     frame at all.
     ⚠️ The client supplied this one as a 1122px web export, where the rest of
     the shoot is 1333px. It caps the responsive set at 960, which is enough for
     the Story figure at 1x but not at 2x on a large screen. Ask for the master
     and this entry picks up 1280 and 1536 on its own. */
  { id: 'family-portrait', src: 'family-portrait.webp', tier: 'B', grade: 'chlorine',
    role: 'band', focal: { x: 0.5, y: 0.35 },
    alt: 'Larisa and Vinny outdoors at golden hour, each holding one of their two children.' },

  /* LARISA AND VINNY, for the author card at the foot of every article.
     CROPPED TO THEIR FACES, and that crop is the reason this is tier B rather
     than tier C: the full frame has them holding three sample bottles, two of
     which still carry the GREEN duck mark. Cropped to the top 42% there is no
     product in the frame at all, so there is no prototype being passed off as
     anything. Re-crop this and the tier has to be re-decided. */
  { id: 'founders',        src: 'founders.jpg', tier: 'B', grade: 'chlorine',
    role: 'band', crop: { top: 0.10, heightPct: 0.42 }, focal: { x: 0.5, y: 0.5 },
    alt: 'Larisa and Vinny, the founders of Ducks ’n Puddles.' },

  { id: 'shell-hands',     src: 'Photo Sep 19 2025, 6 57 26 PM.jpg', tier: 'B', grade: 'overcast',
    role: 'portrait', focal: { x: 0.5, y: 0.24 },
    alt: 'A smiling child sitting in the sand among dune grass.' },

  /* The Foundation section's photograph.
     Unsplash, "a group of kids sitting in a hammock in the woods" by Alexandr
     Podvalny (unsplash.com/@freestockpro), photo id 1638202951770-2240942c7d1c.
     Unsplash License: free for commercial use, no permission needed, attribution
     appreciated but not required.
     Tier B: it is atmosphere, never a product context — and it must never be
     used as one, because it is a stock photograph of children who have nothing
     to do with this brand. `none` grade: it is already warm and the two site
     grades are tuned for the client's own shoots. */
  { id: 'foundation-children', src: 'foundation-children.jpg', tier: 'B', grade: 'none',
    role: 'band', focal: { x: 0.5, y: 0.45 },
    alt: 'Four children playing together around a hammock in a sunlit wood.' },

  // ---- Tier C: prototypes. "From Sample to Shelf" only, always captioned. ----
  { id: 'sample-turf',     src: '165A6600.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early Ducks ’n Puddles sample bottles standing on grass in warm backlight.' },
  { id: 'sample-splashpad',src: '165A6643.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'An early sample bottle standing on a painted splash-pad surface.' },
  { id: 'sample-carry',    src: '165A6709.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    focal: { x: 0.5, y: 0.26 },
    alt: 'A child carrying an early sample bottle by its handle across a tennis court.' },
  { id: 'sample-mosaic',   src: '165A6854.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early sample bottles on stone coping in front of a blue mosaic fountain.' },
  { id: 'sample-caddy',    src: '165A6970.JPG', tier: 'C', grade: 'chlorine', role: 'sample',
    alt: 'Three early sample bottles tucked into a yellow beach caddy with a striped towel.' },
  /* THE OCTOBER SHOOT. Tier C, and the reason is visible rather than assumed:
     in sample-playground the left-hand bottle still carries the GREEN duck
     mark while the one beside it carries the corrected yellow one, and no unit
     in the set has a character name sticker. That is two of the three tells
     this file lists for a prototype, in the same frame. Until a production run
     is photographed these stay out of any product context — which is why they
     live in the reels row with the rest of the family's camera roll and
     nowhere else. */
  { id: 'sample-armful',   src: 'sample-armful.jpg', tier: 'C', grade: 'chlorine', role: 'sample',
    focal: { x: 0.5, y: 0.24 },
    alt: 'A child carrying three sample bottles in both arms across a sunlit lawn.' },
  { id: 'sample-sunup',    src: 'sample-sunup.jpg', tier: 'C', grade: 'chlorine', role: 'sample',
    focal: { x: 0.5, y: 0.58 },
    alt: 'Two parents holding sample bottles up towards the afternoon light.' },
  { id: 'sample-swing',    src: 'sample-swing.jpg', tier: 'C', grade: 'chlorine', role: 'sample',
    focal: { x: 0.5, y: 0.36 },
    alt: 'A sample bottle tucked beside a toddler in a playground swing.' },
  { id: 'sample-playground', src: 'sample-playground.jpg', tier: 'C', grade: 'chlorine', role: 'sample',
    focal: { x: 0.5, y: 0.46 },
    alt: 'A child drinking from a sample bottle at a playground table, two more standing beside her.' },

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
  /* The same three bottles with the three characters already peeking around
     them — one composed render from the client, replacing the layered build
     Join the Family used to do in CSS. Trimmed on import, so the box is all
     art and the section can size it against the column rather than against a
     transparent margin. */
  { id: 'trio-peek', src: `${BRAND_DIR}/products/three-bottles-peeking.png`, widths: [480, 960, 1365] },
  { id: 'logo-primary',   src: `${BRAND_DIR}/logos/primary-logo.png`,   widths: [132, 264, 528] },
  /* The same mark without the "A Friend for Every Adventure" line. The header
     needs the lockup at ~40px tall, where the tagline is unreadable anyway and
     only makes the duck smaller. */
  { id: 'logo-mark',      src: `${BRAND_DIR}/logos/secondary-logo.png`, widths: [120, 240, 480] },
  { id: 'logo-stacked',   src: `${BRAND_DIR}/logos/stacked-wordmark-waves.png`, widths: [150, 300] },
  { id: 'mascot',         src: `${BRAND_DIR}/icons/mascot-icon.png`,    widths: [140, 280] },
  { id: 'splash',         src: `${BRAND_DIR}/icons/water-splash-icon.png`, widths: [334, 669] },
  /* ---- THE BRAND MARKS, as the client supplied them ----------------------
     The footprint pair, the client's own file at full size, trimmed of its
     transparent margin so the mark fills its box rather than floating in the
     middle of a 1254px square. The mini-wave that used to be registered
     alongside it is gone: as a 2.3:1 image it read as a stripe in the ribbon,
     and the client supplied a compact wave SVG to replace it (see Motif). The older icons/*.png in this folder are the same artwork at
     91x80 and 98x57, too small to use at 2x anywhere.
     NOT hand-redrawn as SVG: that was tried, and at ribbon size the traced
     approximation read as a smudge. This is the real artwork. */
  { id: 'mark-footprints', src: `${BRAND_DIR}/icons/footprints-navy-hi.png`, widths: [72, 144] },

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
  /* Trimmed on import, like the wink beside it. Untrimmed, the art filled only
     72.3% of its frame against the wink's 100%, so the same 124px cameo box
     rendered Chi Chi noticeably smaller than Vincey — the boxes matched and the
     BIRDS did not. */
  { id: 'chichi-wave',   src: `${BRAND_DIR}/characters/chichi-wave.png`,   widths: [340, 680] },
  { id: 'goosey-wave',   src: `${BRAND_DIR}/characters/goosey-wave.png`,   widths: [340, 680] },
  { id: 'chichi-splash', src: `${BRAND_DIR}/characters/chichi-splash.png`, widths: [340, 680] },
  { id: 'goosey-rest',   src: `${BRAND_DIR}/characters/goosey-rest.png`,   widths: [300, 600] },
  { id: 'vincey-peek',   src: `${BRAND_DIR}/characters/vincey-peek.png`,   widths: [300, 600] },
  /* Three-quarter, facing right — the pose that reads as looking out from
     behind something when it is placed to the LEFT of that thing. */
  /* THE PEEKING POSES. Supplied by the client cut off at the left edge — each
     one is a half-duck whose flat edge is meant to butt against the side of
     something it is hiding behind. That cut is why these work where the `turn`
     poses did not: a whole duck is 204px wide against a 129px bottle, so it can
     never actually hide, while these are drawn to be half-hidden already.
     Trimmed on import so the cut edge is exactly x=0 and the alignment to the
     bottle's edge is predictable. */
  { id: 'chichi-peeking', src: `${BRAND_DIR}/characters/chichi-peeking.png`, widths: [320, 640] },
  { id: 'goosey-peeking', src: `${BRAND_DIR}/characters/goosey-peeking.png`, widths: [320, 640] },
  { id: 'vincey-peeking', src: `${BRAND_DIR}/characters/vincey-peeking.png`, widths: [320, 640] },

  /* THE SWIMMING POSES. A side profile facing right, seated in a blue hull —
     the only poses in the set drawn from the waterline rather than standing on
     ground, which is what lets them cross the hero's pond without needing feet.
     Trimmed on import: the swimmer is placed by its own bottom edge against the
     wave, so transparent padding would push it off the surface. */
  { id: 'chichi-swim',   src: `${BRAND_DIR}/characters/chichi-swim.png`,   widths: [240, 480] },
  { id: 'goosey-swim',   src: `${BRAND_DIR}/characters/goosey-swim.png`,   widths: [240, 480] },
  { id: 'vincey-swim',   src: `${BRAND_DIR}/characters/vincey-swim.png`,   widths: [240, 480] },

  /* THE WINK, for "Your Kids Matter. We Give a Duck." on the parent side of Why.
     Two candidates were supplied and both were rendered in place at the real
     124px cameo size before choosing — see the note at the Why cameo. The one
     not used stays on disk as vincey-wink-alt.png, unregistered, like the rest
     of the unplaced poses. */
  { id: 'vincey-wink', src: `${BRAND_DIR}/characters/vincey-wink.png`, widths: [260, 520] },

  { id: 'chichi-turn',   src: `${BRAND_DIR}/characters/chichi-turn.png`,   widths: [300, 600] },
  { id: 'goosey-turn',   src: `${BRAND_DIR}/characters/goosey-turn.png`,   widths: [300, 600] },
  { id: 'vincey-turn',   src: `${BRAND_DIR}/characters/vincey-turn.png`,   widths: [300, 600] },
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
