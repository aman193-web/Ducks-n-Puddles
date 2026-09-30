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
  /** Kept deliberately — clean double meaning, memorable. The client asked for it
   *  to sit on the PARENT-facing side rather than over the hero, where the official
   *  tagline belongs. */
  rallyCry: 'Your Kids Matter. We Give a Duck.',
  /** The WHY, in the client's own words (Website Revisions, Sep 2026). This is the
   *  sentence the homepage has to land before anything else — it is what the brand
   *  stands for beyond the products, and it deliberately names BOTH audiences in
   *  one line: ease for the parent, comfort for the child. */
  why: 'We make thoughtful products that support parents and bring comfort and '
     + 'positivity to kids.',
  closing: 'Every great adventure begins with a smile.',
  founders: 'Larisa & Vinny',
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
  /** Full saturation. ACCENT only — stickers, buttons, badges. */
  colour: string
  /** 45% white. The section-ground step; see the tint ramp in tokens.css. */
  soft: string
  ink: string
  field: string
  /** The motif printed after the name on the real product decal. */
  motif: 'droplets' | 'flower' | 'footprint'
  /** The character's title on the illustrator's sheet. Part of their identity. */
  role: string
  /** The two-word core the client will not move on (Website Revisions, Sep 2026). */
  core: string
  /** Who this duck IS, from Character Sheet 2. Warm, positive, child-centred. */
  personality: string
  /** What the character teaches a child. Straight off the sheet. */
  teaches: string[]
  /** The character's own saying, verbatim from the sheet. Drives the tap-to-speak
   *  interaction once the illustrated poses land. */
  saying: string
  /**
   * THE DEFINING MESSAGE — the two words this duck exists to say to a child.
   *
   * Not a synonym for `saying`. `saying` is chatter in the character's own voice
   * ("Take your time"); this is the reminder the character stands for, and the
   * client asked for it to read as if the duck were saying it straight to the
   * child. The deeper reading behind each, from the same document: Vincey ->
   * self-trust, Chi Chi -> self-expression, Goosey -> connection. That mapping
   * is the reasoning behind the three, not copy, so it is not rendered.
   */
  message: string
  /** Parent-facing: the child this duck is for. */
  forParents: string
  bobMs: number
}

export const ducks: Duck[] = [
  {
    slug: 'vincey',
    name: 'Vincey',
    stickerName: 'Vincey',
    colour: 'var(--vincey)',
    soft: 'var(--vincey-soft)',
    ink: 'var(--vincey-ink)',
    field: 'var(--vincey-field)',
    motif: 'droplets',
    role: 'The Calm Companion',
    core: 'Calm + Gentle',
    personality:
      'Vincey is the friend who takes his time. Calm, gentle, and always close by, he '
      + 'reminds little ones to trust themselves, go at their own pace, and find courage '
      + 'within.',
    teaches: ['Emotional safety', 'Patience', 'Quiet courage', 'Trust', 'Self-acceptance'],
    saying: "Take your time. I'll be right here.",
    message: 'Trust Yourself',
    forParents: 'For the one who needs a minute before they join in.',
    bobMs: 5200,
  },
  {
    slug: 'chi-chi',
    name: 'Chi Chi',
    stickerName: 'Chi Chi',
    colour: 'var(--chichi)',
    soft: 'var(--chichi-soft)',
    ink: 'var(--chichi-ink)',
    field: 'var(--chichi-field)',
    motif: 'flower',
    role: 'The Brave Spark',
    core: 'Bold + Brave',
    personality:
      'Chi Chi is the friend who\u2019s always ready for the next adventure. Bold, '
      + 'imaginative, and proudly herself, she reminds little ones to follow their '
      + 'curiosity, try new things, and have the confidence to shine.',
    teaches: ['Confidence', 'Courage', 'Self-expression', 'Leadership', 'Being proud of who you are'],
    saying: "Let's do it!",
    message: 'Be Yourself',
    forParents: 'For the one who is halfway out the door before you find your keys.',
    bobMs: 5900,
  },
  {
    slug: 'goosey',
    name: 'Goosey',
    stickerName: 'Goosey',
    colour: 'var(--goosey)',
    soft: 'var(--goosey-soft)',
    ink: 'var(--goosey-ink)',
    field: 'var(--goosey-field)',
    motif: 'footprint',
    role: 'The Sunshine Friend',
    core: 'Optimistic + Comforting',
    personality:
      'Goosey is the friend who believes there\u2019s always room for one more. Warm, '
      + 'cheerful, and welcoming, he reminds little ones to choose kindness, include '
      + 'others, and help everyone feel like they belong.',
    teaches: ['Kindness', 'Gratitude', 'Empathy', 'Friendship', 'Inclusion'],
    saying: "There's always room for one more friend!",
    message: 'Share Yourself',
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
  /** The feature, as a short title. */
  label: string
  /** The fact. */
  value?: string
  /** Why the fact matters, where it is not self-evident. Four of the seven rows
   *  carry one; the other three say everything in the fact itself, and a padded
   *  third line on those would be the "too many words" the client opened with. */
  benefit?: string
  status: 'confirmed' | 'pending'
  note?: string
}

/**
 * Rewritten to the client's Sep 2026 copy: a short feature title, the key
 * detail, and a benefit only where one is needed. The old rows mixed registers —
 * some read as a specification ("Holds / 9 oz"), others as a full sentence — and
 * that inconsistency is exactly what the revision asked us to fix.
 *
 * ⚠️ ONE FACT CHANGED, not just its wording. The old `clean` row said the cap
 * must be hand-washed; the client's new copy and their own footnote both say the
 * bottle AND cap are dishwasher safe, with only the silicone sleeve hand-washed.
 * Published on their written instruction — a care claim is a real-world claim,
 * so it is flagged here rather than quietly swapped.
 */
export const specs: Spec[] = [
  { key: 'capacity', label: 'Just the right size', value: '9 oz',
    benefit: 'Sized for little hands', status: 'confirmed' },
  { key: 'lid', label: 'Flip-top straw', value: 'Snaps securely closed',
    benefit: 'Easy sipping on the go', status: 'confirmed' },
  { key: 'spill', label: 'Spill-resistant', value: 'Made for everyday adventures',
    benefit: 'Because spills happen.', status: 'confirmed' },
  { key: 'clean', label: 'Easy to clean', value: 'Dishwasher-safe bottle & cap*',
    benefit: 'Less cleanup for busy parents.', status: 'confirmed' },
  { key: 'bpa', label: 'BPA-free', value: 'Your kids matter. We give a duck.', status: 'confirmed' },
  { key: 'grip', label: 'Little-hand friendly', value: 'Lightweight + easy to grip', status: 'confirmed' },
  { key: 'age', label: 'Made for little ones', value: 'Designed for toddlers & preschoolers', status: 'confirmed' },

  { key: 'material',   label: 'Material',      status: 'pending' },
  { key: 'cert',       label: 'Certification', status: 'pending', note: 'The live site says "CDA certified" — no such standard exists. Confirm with the manufacturer (likely CPSIA) before publishing.' },
  { key: 'insulation', label: 'Insulation',    status: 'pending' },
  { key: 'dimensions', label: 'Dimensions',    status: 'pending' },
  { key: 'weight',     label: 'Weight',        status: 'pending' },
  { key: 'origin',     label: 'Made in',       status: 'pending' },
  { key: 'warranty',   label: 'Warranty',      status: 'pending' },
]

export const confirmedSpecs = specs.filter((s) => s.status === 'confirmed')
/** The asterisk on the `clean` row. */
export const specsFootnote = 'Bottle and cap are dishwasher safe. Hand-wash silicone sleeve.'
export const pendingSpecCount = specs.filter((s) => s.status === 'pending').length

/* --------------------------------------------------------------------------- */

/**
 * THE FOUNDATION — "more than a brand".
 *
 * ⚠️ INTENT ONLY, AND DELIBERATELY SO. The client asked to introduce the Ducks 'n
 * Puddles Foundation "even if it's just a small section for now", and confirmed
 * they want intent without specifics. Nothing below names a partner, a
 * percentage, a pledge, a programme or a beneficiary, because none of those have
 * been supplied — and a charitable claim about children is a real-world claim,
 * not copy. The same honesty rule that governs `specs` governs this.
 *
 * TODO(client): supply the Foundation's actual commitment — who it gives to, in
 * what form, and how much — before anything more specific than this ships.
 */
export const foundation = {
  eyebrow: 'More than a brand',
  /** The section used to never say the word "Foundation" anywhere, which is why
   *  it read as a general values block instead of what the client asked for.
   *  The name leads. */
  name: 'The Ducks \u2019n Puddles Foundation',
  title: ['Growing with purpose.', 'Giving back with heart.'],
  body:
    'As Ducks \u2019n Puddles grows, we want our impact to grow with it. The Ducks \u2019n '
    + 'Puddles Foundation extends \u201cA Friend for Every Adventure\u201d beyond our '
    + 'products \u2014 bringing comfort, connection, and support to children, families, '
    + 'and communities.',
  /**
   * COMFORT / CONNECTION / SUPPORT — the client's Sep 2026 wording, replacing
   * Children / Families / Community.
   *
   * ⚠️ STILL INTENT, AND STILL DELIBERATELY SO. The new copy is warmer and more
   * specific in TONE ("mentorship", "resources, education, opportunities") but
   * it still names no partner, no percentage, no pledge, no programme and no
   * date — because none has been supplied. Read it as what the Foundation is
   * FOR, which is what it says, not as a list of things that already run.
   *
   * TODO(client): supply the Foundation's actual commitment — who it gives to,
   * in what form, and how much — before anything more specific than this ships.
   */
  focus: [
    { key: 'comfort', title: 'Comfort',
      body: 'Creating safe, nurturing spaces where children and families feel seen, loved, and cared for.' },
    { key: 'connection', title: 'Connection',
      body: 'Building meaningful relationships, mentorship, and community so no one has to navigate life alone.' },
    { key: 'support', title: 'Support',
      body: 'Providing resources, education, opportunities, and practical support to help families move forward.' },
  ],
  note: 'Be a part of bringing the Ducks \u2019n Puddles Foundation to life.',
  linkLabel: 'Make a Splash With Us',
  /** TODO(client): the G1FTI campaign URL. Pointed at the Duck Squad signup in
   *  the meantime rather than at a dead link — see Foundation.tsx. */
  linkHref: '/#squad',
  /** Goosey's line from the character sheet. Not rendered in the section — the
   *  reference design replaced the pull quote with the three focus cards — but
   *  it is the sentence the whole idea came from, so it stays here rather than
   *  being deleted. */
  quote: 'There\u2019s always room for one more friend!',
  quoteBy: 'Goosey',
} as const

/**
 * THE BIGGER VISION — "the bottles are just the beginning".
 *
 * The client's words. This is the material that makes the point that Ducks 'n
 * Puddles is a children's lifestyle brand whose FIRST product is a bottle, not a
 * water-bottle company.
 *
 * Every row is a real intention from the discovery call, and none of them carries
 * a date — because none of them has one.
 */
/**
 * THE BIGGER PICTURE — what the CHARACTERS grow into.
 *
 * The client: "We'd love to start planting the idea that 'The bottles are just
 * the beginning.' Eventually, the ducks will live through different products,
 * stories, books, experiences and a much larger Ducks 'n Puddles world.
 * Incorporating the illustrated characters into the website now will help
 * establish that bigger vision from the beginning."
 *
 * This was a five-row product roadmap with an icon per row — The Quack Pack,
 * Name it yours, Boxes that grow up, For the parents, First dibs. Read back
 * against the brief that was the wrong section: a backlog of things to buy
 * later, when the client's point is the opposite one. The ducks are CHARACTERS.
 * The bottle is simply the first place most people will meet them.
 *
 * So: three directions the world grows in, each carried by an ILLUSTRATED
 * CHARACTER rather than by a glyph, with the actual products sitting inside as
 * evidence instead of as the headline. "First dibs" is gone from here entirely —
 * it is a Duck Squad membership benefit and it is stated there.
 *
 * Still nothing dated and nothing promised: the products named are the ones the
 * client has described, written as intent, and the third row says plainly that
 * it is still being dreamt up rather than implying it is in production.
 */
export const biggerPicture = [
  {
    title: 'Stories, and the books they came from',
    body:
      'Chi Chi, Goosey and Vincey began as characters in a book, not as bottles. The Quack Pack is where the rest of their world gets written \u2014 more of the pond, more of the friends in it, and stories that actually go somewhere.',
  },
  {
    title: 'Things for every day',
    body:
      'A name on the bottom of every bottle, because it should be your child\u2019s. Boxes that grow up with them, from about two to about six. And the unglamorous half of small children \u2014 bath wipes, a spray for the table \u2014 made a little easier.',
  },
  {
    title: 'A world to be part of',
    body:
      'Past the products: places, moments and experiences where the three of them are real to a child rather than printed on something. That is the part we are still dreaming about \u2014 and the part we would most like the Duck Squad to help us shape.',
  },
]


/* The `samples` prototype timeline and its <Samples> section are gone. The
   section opened "These are the ones that didn't make it", which is exactly the
   edge the Sep 2026 feedback is removing, and the same material now reads better
   as the first journal post (why-were-still-on-sample-four). The photographs
   themselves are untouched in the asset manifest. */

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
    a: 'A children’s brand built around three little friends — Chi Chi, Goosey and Vincey — made by two parents in South Florida. Each one has their own personality, and the first thing they come as is a water bottle. A bottle with a friend on it gets carried, and a bottle that gets carried gets used. The bottles are just the beginning.',
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
    a: 'Email us. Ducks ’n Puddles is a family project, so the two people who made it are the two people who read it.',
  },
] as const
