/**
 * Brand facts and copy.
 *
 * HONESTY RULE: anything not verifiable from the brand guidelines, the discovery
 * call, or the client's own live site is marked `pending` and DOES NOT RENDER.
 * This is a children's product; unverified safety claims are a real liability,
 * not a copy placeholder.
 */

export const brand = {
  name: "Ducks 'n Puddles",
  /** How the founders actually say it — used in <title> and schema alternateName
   *  so both spellings rank. */
  spokenName: 'Ducks and Puddles',
  tagline: 'A Friend for Every Adventure',
  /** The existing hero line. It is genuinely good — clean double meaning, memorable,
   *  does brand and mission work at once. Kept deliberately. */
  rallyCry: 'Your Kids Matter. We Give a Duck.',
  closing: 'Every great adventure begins with a smile.',
  founders: 'Larissa & Vinnie',
  place: 'South Florida',
  email: 'ducksnpuddles7@gmail.com', // TODO(client): professional domain address
  instagram: 'https://www.instagram.com/ducksnpuddles/',
  facebook: 'https://www.facebook.com/profile.php?id=61581543035997',
  domain: 'https://ducksnpuddles.com',
} as const

export type DuckSlug = 'vincey' | 'chi-chi' | 'goosey'

export interface Duck {
  slug: DuckSlug
  name: string
  /** As printed on the bottle. */
  stickerName: string
  colour: string
  ink: string
  field: string
  /** The motif printed after the name on the real product decal. */
  motif: 'droplets' | 'flower' | 'footprint'
  /** Client-approved personality, verbatim from their live site. */
  personality: string
  /** First person, in the duck's voice. Written to match the approved personality. */
  says: string
  /** Parent-facing. */
  forParents: string
  bobMs: number
}

export const ducks: Duck[] = [
  {
    slug: 'vincey',
    name: 'Vincey',
    stickerName: 'VINCEY',
    colour: 'var(--vincey)',
    ink: 'var(--vincey-ink)',
    field: 'var(--vincey-field)',
    motif: 'droplets',
    personality: 'Calm, collected, and comforting.',
    says: "I'll go in first. Then you'll know it's alright.",
    forParents: 'For the one who needs a minute before they join in.',
    bobMs: 5200,
  },
  {
    slug: 'chi-chi',
    name: 'Chi Chi',
    stickerName: 'CHI CHI',
    colour: 'var(--chichi)',
    ink: 'var(--chichi-ink)',
    field: 'var(--chichi-field)',
    motif: 'flower',
    personality: 'Funny, bold, and always ready for an adventure.',
    says: 'Found a puddle. Already in it. Come on.',
    forParents: 'For the one who is halfway out the door before you find your keys.',
    bobMs: 5900,
  },
  {
    slug: 'goosey',
    name: 'Goosey',
    stickerName: 'GOOSEY',
    colour: 'var(--goosey)',
    ink: 'var(--goosey-ink)',
    field: 'var(--goosey-field)',
    motif: 'footprint',
    personality: 'Happy, optimistic, and the perfect sidekick.',
    says: "I'm last. I'm not lost. There's a difference.",
    forParents: 'For the one who narrates the entire day at full volume.',
    bobMs: 6700,
  } as Duck,
]

export const duckBySlug = (slug: string) => ducks.find((d) => d.slug === slug)

/* ---------------------------------------------------------------------------
   PRODUCT SPECS
   `confirmed` rows render. `pending` rows never render — they only drive the
   "still being confirmed" count and the handover punch-list.

   The live site currently claims "CDA certified". There is no children's-product
   standard by that name; the intended claim is most likely CPSIA. Publishing an
   unverifiable safety acronym on a children's product is a liability, so it is
   held as `pending` until the client confirms with the manufacturer.
--------------------------------------------------------------------------- */
export interface Spec {
  key: string
  label: string
  value?: string
  status: 'confirmed' | 'pending'
  note?: string
}

export const specs: Spec[] = [
  { key: 'capacity',   label: 'Holds',         value: '9 oz', status: 'confirmed' },
  { key: 'lid',        label: 'Lid',           value: 'Flip-top straw with a snap closure', status: 'confirmed' },
  { key: 'spill',      label: 'Spills',        value: 'Spill-resistant by design', status: 'confirmed' },
  { key: 'clean',      label: 'Cleaning',      value: 'Bottle goes in the dishwasher. Hand-wash the cap and sleeve.', status: 'confirmed' },
  { key: 'bpa',        label: 'BPA',           value: 'BPA-free', status: 'confirmed' },
  { key: 'grip',       label: 'Built for',     value: 'Small hands — lightweight, easy to grip', status: 'confirmed' },
  { key: 'age',        label: 'Ages',          value: 'Toddlers and preschoolers', status: 'confirmed' },

  { key: 'material',   label: 'Material',      status: 'pending' },
  { key: 'cert',       label: 'Certification', status: 'pending', note: 'The live site says "CDA certified" — no such standard exists. Confirm with the manufacturer (likely CPSIA) before publishing.' },
  { key: 'insulation', label: 'Insulation',    status: 'pending' },
  { key: 'dimensions', label: 'Dimensions',    status: 'pending' },
  { key: 'weight',     label: 'Weight',        status: 'pending' },
  { key: 'origin',     label: 'Made in',       status: 'pending' },
  { key: 'warranty',   label: 'Warranty',      status: 'pending' },
]

export const confirmedSpecs = specs.filter((s) => s.status === 'confirmed')
export const pendingSpecCount = specs.filter((s) => s.status === 'pending').length

/* --------------------------------------------------------------------------- */

export const roadmap = [
  {
    title: 'Reserve before launch',
    body: 'Call dibs before the store opens. Once production is confirmed, the Duck Squad gets a window to reserve their duck first. Whether that involves a deposit is genuinely still undecided — we will tell you either way before it happens.',
  },
  {
    title: 'Name it yours',
    body: 'The silicone sleeve on the bottom comes off. We want to let you put your kid’s name on it. Stickers too, probably. This is the one we are most excited about, which is why we are not rushing it.',
  },
  {
    title: 'The Quack Pack',
    body: 'A book series. Same ducks, more of them, and stories that actually go somewhere.',
  },
  {
    title: 'Boxes that grow up',
    body: 'Subscribe when they are two, and the box keeps changing until they are around six. Fewer decisions for you.',
  },
  {
    title: 'For the parents',
    body: 'Bath wipes. A spray for the table, for before they eat off the table. The unglamorous half of having small children.',
  },
]

/** The prototype timeline. Photographs here are Tier C — always captioned as samples. */
export const samples = [
  { id: 'sample-turf',      label: 'Sample 01', caption: 'The first three that held water. The duck on the sleeve was still green.' },
  { id: 'sample-carry',     label: 'Sample 02', caption: 'Handle test. It carried well — it also caught on everything.' },
  { id: 'sample-splashpad', label: 'Sample 02', caption: 'Straw and lid, out in the world rather than on a desk.' },
  { id: 'sample-mosaic',    label: 'Sample 03', caption: 'Colour check against real water, because screens lie.' },
  { id: 'sample-beach',     label: 'Sample 04', caption: 'Closest yet. The tuft is right. The names are not on them yet.' },
  { id: 'sample-caddy',     label: 'Sample 04', caption: 'Packed for a normal afternoon, which is the only test that counts.' },
]

/* --------------------------------------------------------------------------- */

export interface Review {
  id: string
  /** The pull-quote. Verbatim from the client's own live site. */
  title: string
  body: string
  /**
   * !! TODO(client) — REPLACE BEFORE LAUNCH. THESE FOUR NAMES ARE INVENTED. !!
   *
   * The quotes themselves are the client's own, carried over verbatim from their
   * live site, where they appear with NO attribution. The names are dummy data,
   * added at the client's request so the card design can be signed off. They are
   * not real people.
   *
   * Publishing them as-is would attach four invented names to five-star reviews
   * for a product that has never sold, which is the one thing on this site that
   * would be genuinely misleading — so they must be swapped for real first names
   * (with those families' permission) before launch.
   *
   * Set a name to null and its pill simply does not render.
   */
  name: string | null
  /** Tints the card with a character colour. */
  duck: DuckSlug
}

export const reviews: Review[] = [
  {
    id: 'leaks',
    title: 'No leaks in the backpack.',
    body: 'As a parent, that’s all I needed to know. Easy to clean, no spills, and my kid loves it.',
    name: 'Sarah M.',
    duck: 'vincey',
  },
  {
    id: 'asks',
    title: 'My daughter actually asks for her water now.',
    body: 'I never thought a water bottle would make such a difference, but this one really did. She takes it everywhere and reminds me when it’s time to refill it.',
    name: 'Priya K.',
    duck: 'chi-chi',
  },
  {
    id: 'works',
    title: 'It’s more than cute. It actually works.',
    body: 'We’ve tried so many bottles that leaked or broke. This one is adorable and holds up to real kid use.',
    name: 'Danielle R.',
    duck: 'goosey',
  },
  {
    id: 'safe',
    title: 'The duck makes her feel safe.',
    body: 'My son gets nervous in new places, and bringing his duck bottle with him has helped so much. It’s like a little comfort buddy.',
    name: 'Marcus T.',
    duck: 'vincey',
  },
]

/** Short, scannable benefit lines — the parent-facing "why", not the spec sheet. */
export const features = [
  { key: 'friend',  label: 'A friend, not a bottle', body: 'A character your kid recognises, names and looks for. That is the whole difference.' },
  { key: 'hands',   label: 'Sized for small hands',  body: 'Light enough to carry themselves, narrow enough to actually hold.' },
  { key: 'spill',   label: 'Spill-resistant',        body: 'Flip-top straw with a snap closure. Made for backpacks and car seats.' },
  { key: 'clean',   label: 'Straight in the dishwasher', body: 'Bottle goes in. Cap and sleeve get a hand wash, and that is the whole routine.' },
] as const

/** Real clips from the family's own camera roll, transcoded for the web. */
export const reels = [
  { id: 'duck-5',   poster: 'poster-duck-5',   caption: 'She picked hers before we did.' },
  { id: 'duck-2',   poster: 'poster-duck-2',   caption: 'Two ducks, one afternoon.' },
  { id: 'duck-end', poster: 'poster-duck-end', caption: 'The last sip is always the loudest.' },
  { id: 'duck-3',   poster: 'poster-duck-3',   caption: 'Three of them, out in the world.' },
  { id: 'duck-1',   poster: 'poster-duck-1',   caption: 'Straight from the pool to the towel.' },
] as const

/* --------------------------------------------------------------------------- */

/**
 * FAQs.
 *
 * Same honesty rule as the spec sheet: every answer below is drawn from
 * something already confirmed — the 9 oz capacity, the flip-top straw, the
 * dishwasher guidance, the founders' own account. The material and
 * certification questions are answered by saying they are not confirmed yet,
 * because the alternative is inventing a safety claim on a children's product.
 */
export const faqs = [
  {
    q: 'What is Ducks ’n Puddles?',
    a: 'Three duck water bottles — Vincey, Chi Chi and Goosey — made by two parents in South Florida. They are named after our own kids, and they behave like them. The idea is simple: a bottle with a face and a name gets carried, and a bottle that gets carried gets used.',
  },
  {
    q: 'How big is the bottle?',
    a: 'It holds 9 oz. That is deliberately not the biggest bottle on the shelf — a full one-litre bottle is heavy enough that a small child stops carrying it themselves, which defeats the point.',
  },
  {
    q: 'Does it leak?',
    a: 'It has a flip-top straw with a snap closure and is designed to be spill-resistant. We test every sample the only way that counts: in a backpack, in a car seat, upside down, with a four-year-old in charge of it.',
  },
  {
    q: 'How do I clean it?',
    a: 'The bottle goes in the dishwasher. The cap and the silicone sleeve get a hand wash. That is the whole routine.',
  },
  {
    q: 'What age is it for?',
    a: 'Toddlers and preschoolers. It is sized and weighted so a small child can pick it up, tip it and put it down again without help.',
  },
  {
    q: 'What is it made of, and is it certified?',
    a: 'It is BPA-free. The exact material and the testing and certification details are still being confirmed with our manufacturer, and we are not going to publish either until they are. Every one of those lines will be on the features section before we take a single order — we would rather leave a gap than fill it with a guess.',
  },
  {
    q: 'When can I buy one?',
    a: 'There is no date yet. We are on our fourth sample and we would rather be late than ship something we would not hand our own kids. Join the Duck Squad and you will hear before this website does.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Email us. Ducks ’n Puddles is a family project, not a licensing deal — if something is wrong with it, you are emailing the two people who made it.',
  },
] as const
