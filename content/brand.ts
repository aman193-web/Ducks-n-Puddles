/**
 * Brand facts and copy.
 *
 * HONESTY RULE: anything not verifiable from the brand guidelines, the discovery
 * call, or the client's own live site is marked `pending` and DOES NOT RENDER.
 * This is a children's product; unverified safety claims are a real liability,
 * not a copy placeholder.
 */

/**
 * ⚠️ DO NOT DEPLOY WITH THIS BUILT AND UNRESOLVED.
 *
 * The client's brief, section 8, verbatim: "The 2-in-1 snack-holder
 * functionality is a new product development concept, so final food-contact
 * safety, stability, cleaning, and compliance testing must be confirmed before
 * we advertise it as an approved feature. Please prepare the website designs
 * and content, but do not publish snack-holder claims until we approve them."
 *
 * Food contact with a children's product is a real-world safety claim, which is
 * the same rule that keeps `specs` honest. So the snack-holder copy is BUILT
 * and reviewable, and gated on one boolean:
 *
 *   false  →  the Puddle sections render as the protective sleeve only, the
 *             snack-holder FAQ answers drop out, and the Specs tile says sleeve.
 *   true   →  the full 2-in-1 story, exactly as the client wrote it.
 *
 * Flip it the day they confirm testing — in writing — and nothing else changes.
 *
 * IT IS `true` HERE ON PURPOSE, and that is not a contradiction: the client
 * asked to SEE this content, and they cannot approve copy that does not render.
 * Both states are built and both are finished — see .showcaseSolo in
 * MeetThePuddle.module.css for the one-panel layout the closed gate uses.
 * SET IT TO false BEFORE THE SITE GOES LIVE, unless approval has landed by then.
 *
 * TODO(client): written confirmation of food-contact safety and compliance.
 */
export const SNACK_CLAIMS_APPROVED = true

export const brand = {
  /* The CURLY apostrophe, U+2019, which is the one every other string on the
     site and in the client's own document uses. It was a straight quote here
     and nowhere else, so the footer's copyright line was the one place the
     brand name was spelled differently from the rest of the page. Bangbang
     carries the glyph (checked when the font was subset — see app/layout.tsx)
     and this string only ever sets in Poppins anyway. */
  name: 'Ducks \u2019n Puddles',
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
  /** The address the brand actually reads today — the one in the Instagram bio.
   *  It works, so the footer and the contact form use it, but it is a personal
   *  Gmail and not a support address. */
  email: 'ducksnpuddles7@gmail.com', // TODO(client): professional domain address
  /**
   * ⚠️ A PLACEHOLDER. THIS MAILBOX DOES NOT EXIST.
   *
   * The client's own Terms and Privacy documents (October 2026) leave the field
   * blank in both places — "[Add official support email]" and "[Add official
   * privacy or support email]" — so there is no real address to print. This is
   * the shape the real one will take, on the brand's own domain, so that
   * swapping it changes one line and nothing shifts.
   *
   * It is shown on /terms, /privacy and /contact, and the contact form composes
   * to it — so until this is replaced, MAIL SENT FROM THE FORM WILL BOUNCE.
   * brand.email (the Gmail) is still what the footer links to, because that one
   * is read.
   *
   * TODO(client): the real support address, and this comment goes with it.
   */
  supportEmail: 'hello@ducksnpuddles.com',
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
  /** Makes the unapproved snack-holder claim — see SNACK_CLAIMS_APPROVED. */
  snackClaim?: true
  /** What this card says instead while that claim is unapproved. */
  whenPending?: { label: string; value?: string; benefit?: string }
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
  /* THE KEY FEATURE, AND SO THE FIRST CARD. It arrived as the eighth, at the
     bottom-right corner, which is where a grid puts an afterthought — and it is
     the one thing on this product no competitor's bottle has.
     Its copy is also the shortest it can be while staying the client's own: the
     first draft ran "Protective sleeve + removable snack holder" over
     "Thoughtfully designed for little hands and everyday adventures", five
     lines in a box where every sibling takes two or three. */
  { key: 'puddle', label: '2-in-1 silicone Puddle', value: 'Sleeve + snack holder',
    benefit: 'Two purposes. One thoughtful design.', status: 'confirmed',
    snackClaim: true,
    /* The client's own first bullet, which makes no snack claim at all. */
    whenPending: { label: 'Silicone Puddle', value: 'Removable protective sleeve',
      benefit: 'A comfortable grip for little hands.' } },
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
  /* THE EIGHTH CARD, added on the client's brief "Website Updates: Introducing
     the 2-in-1 Puddle" (Oct 2026), item 3: "Add this as a feature tile alongside
     the existing water bottle features." Their wording, unedited.
     ⚠️ Carries a SNACK-HOLDER CLAIM — see PUDDLE_SNACK_CLAIMS_PENDING_APPROVAL
     below. Eight also happens to be the number this grid always wanted: seven
     left a short row that had to be hand-centred at every breakpoint. */
  /* The FAQ now says "ideal for ages 2\u20138". Kept broader on the card because that
     is the wording the client specified for this grid. */

  /* Supplied at last, in the Sep 2026 FAQ copy. Left as `pending` rather than
     promoted into the rendered grid: the client wrote them as FAQ answers, not
     as feature cards, and the seven cards above are the seven they specified.
     The notes record where the wording came from. */
  { key: 'material',   label: 'Material',      status: 'pending', note: 'Client (Sep 2026 FAQ): "stainless steel with BPA-free materials". Confirm with the manufacturer before promoting to a feature card.' },
  { key: 'cert',       label: 'Certification', status: 'pending', note: 'Client (Sep 2026 FAQ): "independently tested to meet applicable U.S. children\u2019s product safety requirements". This REPLACES the live site\u2019s "CDA certified", which names a standard that does not exist. Published in the FAQ on their written instruction; get it in writing from the manufacturer.' },
  { key: 'insulation', label: 'Insulation',    status: 'pending' },
  { key: 'dimensions', label: 'Dimensions',    status: 'pending' },
  { key: 'weight',     label: 'Weight',        status: 'pending' },
  { key: 'origin',     label: 'Made in',       status: 'pending' },
  { key: 'warranty',   label: 'Warranty',      status: 'pending' },
]

/* Rows the snack gate rewords rather than removes: the sleeve is real and
   already described in the footnote below, so dropping the card entirely would
   be hiding a feature rather than withholding an unapproved claim — and it
   would take the grid back to the seven that never divided cleanly. */
export const confirmedSpecs = specs
  .filter((s) => s.status === 'confirmed')
  .map((s) => (s.snackClaim && !SNACK_CLAIMS_APPROVED && s.whenPending ? { ...s, ...s.whenPending } : s))
/** The asterisk on the `clean` row. */
export const specsFootnote = 'Bottle and cap are dishwasher safe. Hand-wash silicone sleeve.'
export const pendingSpecCount = specs.filter((s) => s.status === 'pending').length

/* --------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------
   THE PUDDLE — the 2-in-1 silicone sleeve, and the personalisation preview.

   Source: the client's brief "THE PUDDLE — Website Updates: Introducing the
   2-in-1 Puddle & Personalized Puddles" (Oct 2026). Every headline, sentence
   and bullet below is THEIR copy, unedited. Nothing here is written by us.

   ⚠️ TWO THINGS IN THIS BLOCK ARE NOT YET APPROVED TO PUBLISH — the client
   said so themselves, in their own brief, and both flags are below.
   --------------------------------------------------------------------------- */

/** Personalisation is a FUTURE offering. The brief: "should only be advertised
 *  as 'Coming Soon'", and "Do not add a purchase or customization button yet."
 *  Nothing in the Personalize section links to a configurator or a checkout —
 *  the only control on it is the newsletter. */
export const personalization = {
  status: 'Coming Soon',
  title: 'Personalize Your Puddle!',
  sub: 'Your Duck. Your Puddle. Your Way.',
  lede: 'We’re making adventures even more personal!',
  body:
    'Soon, you’ll be able to personalize your little one’s very own Puddle, '
    + 'creating a one-of-a-kind companion for every adventure.',
  close:
    'Because it’s more than just a water bottle. It’s their Duck, their Puddle, '
    + 'and their adventure.',
  /* Section 7 of the brief, the newsletter tie-in. The form posts to the SAME
     list as everywhere else — "Please connect this to our existing newsletter
     or email waitlist system rather than creating an entirely separate signup
     process" — and tags the subscriber `interest:personalization` so this
     waitlist can still be told apart inside it. See INTERESTS.
     `title`, `invite` and `button` render in the section's signup bar.
     `body` DELIBERATELY DOES NOT: it says the same thing as `body` above it,
     and the two would sit four inches apart. It is kept because section 7 calls
     this a "Suggested Newsletter Message" — it is copy for the email they send,
     and this is where their copy lives. */
  signup: {
    title: 'Something Personal Is Coming!',
    body:
      'We’re working on something special! Soon, you’ll be able to personalize '
      + 'your child’s Puddle with their very own name.',
    invite:
      'Join the Ducks ’n Puddles family and be the first to know when Personalized '
      + 'Puddles become available.',
    button: 'Be the First to Know',
  },
  /* The brief's example name, used on the concept artwork: "Show a concept image
     of the silicone Puddle with a child's name on it (for example, 'Lucy')." */
  sampleName: 'Lucy',
} as const

export const puddle = {
  eyebrow: 'Meet the Puddle',
  title: 'Meet the Puddle!',
  /** Section 6: "Primary Marketing Message". */
  message: 'The Duck Holds the Drink. The Puddle Holds the Snack.',
  lede: 'We believe the little details make a big difference.',
  body:
    'That’s why our silicone Puddle is designed to do more than protect your '
    + 'child’s water bottle. It also doubles as a removable snack holder! Simply '
    + 'slide off the Puddle, fill it with your little one’s favorite snacks, and '
    + 'you’re ready for your next adventure.',
  /** The dual-purpose callout. The brief: "Consider a simple visual with two
   *  labels: '1. Protective Sleeve' and '2. Snack Holder.'" */
  purpose: 'Two purposes. One thoughtful design.',
  parts: [
    { n: 1, label: 'Protective Sleeve',
      body: 'Helps protect the bottle and provides a comfortable grip for little hands.' },
    { n: 2, label: 'Snack Holder', snackClaim: true,
      body: 'A removable silicone Puddle that doubles as a convenient holder for your child’s favorite snacks.' },
    { n: 3, label: 'Made for Everyday Adventures',
      body: 'Thoughtfully designed for picnics, playgrounds, road trips, and everyday outings.' },
  ],
  close: 'One less thing for parents to pack. One more thing for little ones to love.',
  /** Section 6, "Visual 4: How It Works — Consider a simple three-step graphic".
   *  Their three steps and their three sentences.
   *  ⚠️ NOT RENDERED, and that is a judgement call worth stating. The two
   *  panels above already read sip → slide → snack: bottle, arrow, Puddle with
   *  snacks in it. Adding three more steps saying the same thing in words would
   *  have put ~240px of restatement in a section that is already the third
   *  tallest on the page, against the client's own section 8 — "visually
   *  engaging without overcrowding the website". It is one <ol> away if they
   *  disagree; the copy is here and ready. */
  steps: [
    { k: 'sip',   label: 'Sip',   body: 'Enjoy your drink with your favorite Duck.' },
    { k: 'slide', label: 'Slide', body: 'Remove the silicone Puddle from the bottle.' },
    { k: 'snack', label: 'Snack', body: 'Fill your Puddle with your favorite snacks and enjoy!', snackClaim: true },
  ],
  /** Section 6, "Supporting Marketing Phrases". Held, not rendered: the section
   *  already carries their PRIMARY message as its headline, and stacking a
   *  second slogan under it would dilute the one they asked to lead with. */
  slogan: 'Sip. Snack. Splash. Repeat!',
} as const

/**
 * THE PRODUCT PAGES — section 4 of the client's brief, "UPDATE: INDIVIDUAL
 * PRODUCT PAGES". Their copy, verbatim, for all three bottles.
 *
 * It says UPDATE because they believed these pages existed. They did not: every
 * "Explore <duck>" button on the site pointed at the waitlist. /ducks/[slug] is
 * those pages, and this is the block their brief asked to be added to each one.
 */
export const productPuddle = {
  title: 'Includes Our 2-in-1 Puddle!',
  body:
    'Every Duck comes with its very own removable silicone Puddle, designed to '
    + 'protect the bottle and double as a convenient snack holder.',
  /** "Additional Product Feature", their words. */
  feature: 'Removable 2-in-1 silicone sleeve and snack holder.',
  /** The gated wording: the first half of their own sentence, stopping before
   *  the claim. Nothing invented. */
  sleeveOnlyTitle: 'Includes Our Silicone Puddle!',
  sleeveOnlyBody:
    'Every Duck comes with its very own removable silicone Puddle, designed to '
    + 'protect the bottle.',
  sleeveOnlyFeature: 'Removable silicone sleeve.',
  /** "Personalization Preview" — the small note the brief asks to sit below
   *  the product description. No control beside it, per their instruction. */
  personalTitle: 'Personalized Puddles Coming Soon!',
  personalBody:
    'Soon, you\u2019ll be able to make your child\u2019s Puddle uniquely theirs by adding '
    + 'their name.',
} as const

/** The sleeve-only wording, for when SNACK_CLAIMS_APPROVED is false. The client
 *  already describes the sleeve this way in their own FAQ ("our removable
 *  silicone sleeve"), so nothing here is invented either. */
export const puddleSleeveOnly = {
  message: 'A Friend for Every Adventure.',
  body:
    'That’s why our silicone Puddle is designed to protect your child’s water '
    + 'bottle and give little hands something comfortable to hold on to.',
} as const

/* ---------------------------------------------------------------------------
   CONTACT.

   The client's own copy, supplied Oct 2026, verbatim. The seven topics below
   are one list used twice — as the cards on the page and as the options in the
   form's subject — so the two can never drift apart. `label` is also what goes
   into the subject line of the message that gets sent.
   --------------------------------------------------------------------------- */
export interface ContactTopic {
  /** Stable id, used as the <option> value and the anchor. */
  key: string
  label: string
  body: string
}

export const contactTopics: ContactTopic[] = [
  { key: 'product', label: 'Product Questions',
    body: 'Have questions about our water bottles, product features, care instructions, or what\u2019s coming next? We\u2019re happy to help!' },
  { key: 'squad', label: 'The Duck Squad',
    body: 'Curious about joining the Duck Squad or have questions about your membership, subscriptions, or exclusive perks? We\u2019d love to help you out.' },
  { key: 'feedback', label: 'Feedback & Suggestions',
    body: 'Your thoughts matter to us! Tell us what you love, what we can improve, or what you\u2019d like to see from Ducks \u2019n Puddles in the future.' },
  { key: 'partnerships', label: 'Partnerships & Collaborations',
    body: 'Interested in working together? Whether you\u2019re a retailer, creator, fellow brand, or organization, we\u2019d love to explore ways to connect.' },
  { key: 'foundation', label: 'The Ducks \u2019n Puddles Foundation',
    body: 'Want to learn more about our mission, community initiatives, or opportunities to get involved? We\u2019d love to share our vision with you.' },
  { key: 'wholesale', label: 'Wholesale & Retail Inquiries',
    body: 'Interested in bringing Ducks \u2019n Puddles products to your store? Reach out to learn more about potential retail opportunities.' },
  { key: 'other', label: 'Anything Else',
    body: 'Have something on your mind? We\u2019d love to hear it all! Whether it\u2019s a kind word, a story to share, a new idea, or even some constructive criticism, we\u2019re open to it all. We believe that every perspective matters and that honest feedback helps us learn, grow, and continue making Ducks \u2019n Puddles the best it can be for you and your little ones. So don\u2019t be shy \u2014 we\u2019re always happy to hear from you!' },
]

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
  /** The G1FTI campaign, supplied in the 24 Sep revisions. */
  linkHref: 'https://g1fti.com/project/ducksnpuddles',
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
    key: 'stories',
    label: 'Stories',
    title: 'A world of their own.',
    body:
      'Through The Quack Pack books and future stories, the ducks come to life through '
      + 'adventures, friendships, and positive lessons for little ones.',
  },
  {
    key: 'products',
    label: 'Products',
    title: 'Products You Can Trust.',
    body:
      'We thoughtfully create products that make everyday parenting a little easier \u2014 '
      + 'with carefully considered details that bring more convenience, trust, and peace '
      + 'of mind.',
  },
  {
    key: 'experiences',
    label: 'Experiences',
    title: 'Bringing Their World to Life.',
    body:
      'Our bigger dream is to bring Ducks \u2019n Puddles beyond the page and into real '
      + 'life \u2014 creating experiences filled with imagination, connection, lasting '
      + 'memories, and a sense of belonging.',
  },
] as const


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
/* Captions removed at the client's request — "we'd like the visuals to speak
   for themselves". The `caption` is still carried because it is the accessible
   name for each clip; it is simply no longer printed under the card. */
/**
 * THE WALL, and it is a mix on purpose.
 *
 * The client's reference for this row is a scrapbook: prints of different
 * sizes taped to a wall, photographs and clips side by side rather than a
 * uniform strip of video. So the list carries both kinds, interleaved, and the
 * section decides how each one is framed.
 *
 * `caption` is never printed — it is the accessible name of a clip's play
 * button, and the alt text of a photograph. The client asked for the captions
 * to come off the cards ("we'd like the visuals to speak for themselves"); a
 * control still has to say what it controls.
 *
 * The two tier-C photographs here are early samples, which the manifest marks
 * "From Sample to Shelf only, always captioned". That rule is about not
 * passing a prototype off as the finished product — in a row of the family's
 * own camera roll, which is what every clip in it already is, they are the
 * same bottles in the same hands.
 */
export type Reel =
  | { kind: 'video'; id: string; poster: string; caption: string }
  | { kind: 'photo'; id: string; caption: string; under?: Under }

/** A second print stacked under a LANDSCAPE one. A wide photograph is half the
 *  height of the clips beside it, which left a hole in the wall under every
 *  one; this fills it and brings the card back to its neighbours' height.
 *
 *  A plain print, taped like the rest. A circle and a star were tried here
 *  first and both were wrong: a star throws away half its box, so the picture
 *  inside it stops reading, and a round print beside square ones read as a
 *  badge rather than as a photograph. */
export type Under = { id: string; caption: string }

/* The four from the October shoot lead and punctuate rather than queue at the
   end: the row is read left to right and anything after about the eighth card
   is seen by whoever keeps scrolling. The strongest new frame opens it, and the
   other three sit at roughly even intervals so the new work is visible wherever
   somebody stops.
   All four are PORTRAIT at 2:3, the same shape as the clips and as the two
   existing portrait prints, so none of them needs an `under` companion — that
   is only there to fill the hole a LANDSCAPE print leaves beneath it. */
export const reels: Reel[] = [
  { kind: 'photo', id: 'sample-playground', caption: 'A child drinking at a playground table, two more bottles beside her.' },
  { kind: 'video', id: 'duck-5',   poster: 'poster-duck-5',   caption: 'She picked hers before we did.' },
  { kind: 'photo', id: 'sample-turf',     caption: 'Three bottles standing on sunlit grass.',
    under: { id: 'sample-splashpad',
             caption: 'A bottle on the painted surface of a splash pad.' } },
  { kind: 'photo', id: 'sample-armful',   caption: 'A child carrying three bottles in both arms across a lawn.' },
  { kind: 'video', id: 'duck-2',   poster: 'poster-duck-2',   caption: 'Two ducks, one afternoon.' },
  { kind: 'video', id: 'duck-end', poster: 'poster-duck-end', caption: 'The last sip is always the loudest.' },
  { kind: 'photo', id: 'sample-carry',    caption: 'A child carrying a bottle by its handle.' },
  { kind: 'photo', id: 'sample-sunup',    caption: 'Two parents holding bottles up towards the afternoon light.' },
  { kind: 'video', id: 'duck-3',   poster: 'poster-duck-3',   caption: 'Three of them, out in the world.' },
  { kind: 'video', id: 'duck-4',   poster: 'poster-duck-4',   caption: 'A bottle going everywhere the day goes.' },
  { kind: 'photo', id: 'sample-beach',    caption: 'Three bottles on wet sand at dusk.',
    under: { id: 'cart-path',
             caption: 'Two children walking hand in hand down a sunlit path.' } },
  { kind: 'video', id: 'duck-1',   poster: 'poster-duck-1',   caption: 'Straight from the pool to the towel.' },
  { kind: 'photo', id: 'sample-swing',    caption: 'A bottle tucked beside a toddler in a playground swing.' },
  { kind: 'video', id: 'duck-6',   poster: 'poster-duck-6',   caption: 'Another afternoon, another puddle.' },
  { kind: 'photo', id: 'sample-mosaic',   caption: 'Three bottles on stone beside a blue fountain.' },
]

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
/**
 * THE FAQ, rewritten to the client's Sep 2026 copy.
 *
 * ⚠️ THREE OF THESE ANSWERS PUBLISH FACTS THE SITE PREVIOUSLY WITHHELD, on the
 * client's written instruction and recorded here so there is a trail:
 *
 *   material  "stainless steel with BPA-free materials" — was `pending` in
 *             `specs` because it had never been supplied.
 *   safety    "independently tested to meet applicable U.S. children's product
 *             safety requirements" — this is the claim that replaces the live
 *             site's "CDA certified", which names a standard that does not
 *             exist. The new wording is careful and plausible, but it is still
 *             a safety claim about a children's product and it is the single
 *             most consequential sentence on this page.
 *   ages      "ideal for ages 2–8" (2–6 until Oct 2026) — the client widened
 *             it for consistency. Narrower than the old "toddlers and
 *             preschoolers".
 *
 * TODO(client): confirm all three with the manufacturer in writing.
 */
export interface Faq {
  q: string
  a: string
  /** Which heading the question sits under on /faq. Navigation, not copy — the
   *  questions and answers are the client's own words, untouched. */
  group: 'The brand' | 'The bottles' | 'The Puddle' | 'Getting one'
  /** Shown in the homepage section. The rest live on /faq behind "View all".
   *  Fourteen rows was more than a homepage section should ask anyone to scroll
   *  past on the way to the signup. */
  home?: true
  /** Depends on the unapproved snack-holder claim — see SNACK_CLAIMS_APPROVED. */
  snackClaim?: true
}

export const faqs: Faq[] = [
  {
    group: 'The brand', home: true,
    q: 'What is Ducks \u2019n Puddles?',
    a: 'Ducks \u2019n Puddles is a children\u2019s lifestyle brand built around one simple idea: A Friend for Every Adventure. We create thoughtful products that bring more ease to parents and comfort, confidence, and positive direction to kids. Through our characters, products, stories, experiences, and growing Foundation, our bigger vision is to create a world where children and families feel supported, connected, and cared for.',
  },
  {
    group: 'The bottles', home: true,
    q: 'Tell me about the water bottle.',
    a: 'Our 9 oz bottles are thoughtfully designed for little hands and busy parents \u2014 lightweight, spill-resistant, BPA-free, and easy to clean, with a flip-top straw for sipping on the go. But it\u2019s more than a water bottle: each duck has a name and personality of its own, turning an everyday essential into a friend for every adventure.',
  },
  {
    group: 'The bottles', home: true,
    q: 'How do I clean it?',
    a: 'The entire bottle is dishwasher safe! We just recommend hand-washing the silicone sleeve to help keep it looking its best.',
  },
  {
    group: 'The bottles',
    q: 'What is it made of?',
    a: 'Our bottles are made from stainless steel with BPA-free materials, thoughtfully selected with little ones and everyday use in mind.',
  },
  {
    group: 'The bottles',
    q: 'Is it spill-resistant?',
    a: 'Yes! Our bottles are designed to be spill-resistant, with a flip-top straw that snaps securely closed \u2014 because we know spills happen.',
  },
  {
    group: 'The bottles', home: true,
    q: 'Is it safety tested?',
    a: 'Yes. Safety is something we take seriously, especially because we\u2019re parents too. Our bottles are independently tested to meet applicable U.S. children\u2019s product safety requirements before they reach little hands.',
  },
  {
    group: 'The bottles',
    q: 'What ages is it for?',
    a: 'Our bottles are designed with little ones in mind and are ideal for ages 2\u20138 \u2014 lightweight, easy to hold, and made for little hands.',
  },

  /* THE PUDDLE — four questions from the client's Oct 2026 brief, section 5,
     verbatim. Two of them make the snack-holder claim and drop out when
     SNACK_CLAIMS_APPROVED is false; the other two stand on their own. */
  {
    group: 'The Puddle', home: true, snackClaim: true,
    q: 'What is the Puddle?',
    a: 'The Puddle is our removable silicone sleeve! It\u2019s designed to protect your Duck and can also double as a convenient snack holder. Simply remove it, wash it, and fill it with your child\u2019s favorite snacks.',
  },
  {
    group: 'The Puddle', snackClaim: true,
    q: 'Can I use the Puddle as a snack holder?',
    a: 'Yes! Our 2-in-1 Puddle is designed to serve as both a protective silicone sleeve and a removable snack holder, making everyday adventures a little easier.',
  },
  {
    group: 'The Puddle',
    q: 'How do I clean my Puddle?',
    a: 'Remove the silicone sleeve from the bottle and hand-wash it with warm water and mild dish soap. Allow it to dry completely before using it again.',
  },
  {
    group: 'The Puddle',
    q: 'Can I personalize my Puddle?',
    a: 'Not just yet, but we\u2019re working on it! Personalized Puddles are coming soon, giving you the opportunity to add your little one\u2019s name to their very own Puddle. Sign up for our newsletter to be the first to know when personalization becomes available.',
  },

  {
    group: 'Getting one', home: true,
    q: 'How can I get one?',
    a: 'We\u2019re putting the finishing touches on our first Ducks \u2019n Puddles collection now! Join the family to be among the first to hear about launch updates and when the ducks are officially ready to come home.',
  },
  {
    /* With the brand group, not with getting one: this is a question about
       where Ducks ’n Puddles is going, which is what "What is Ducks ’n
       Puddles?" above it answers. It also stops the first group on /faq being
       a heading with a single row under it, which reads as a mistake. */
    group: 'The brand',
    q: 'Will there be more Ducks \u2019n Puddles products?',
    a: 'Absolutely! The bottles are just the beginning. We\u2019re creating more thoughtful products designed to make life a little easier for parents and bring more comfort, confidence, and positivity to kids. Stay close \u2014 there\u2019s lots more coming from the pond!',
  },
  {
    group: 'Getting one',
    q: 'How can I get in touch?',
    a: 'We\u2019d love to hear from you! Send us a note through our contact page and it\u2019ll make its way to our team. Questions, ideas, feedback \u2014 we\u2019re all ears!',
  },
]

/** Everything publishable right now. One filter, so a flipped approval flag
 *  reaches the homepage section, the /faq page and the JSON-LD together. */
export const publishedFaqs = () =>
  faqs.filter((f) => SNACK_CLAIMS_APPROVED || !f.snackClaim)

/** The homepage selection — six, spread across all four groups. */
export const homeFaqs = () => publishedFaqs().filter((f) => f.home)

/** The /faq page, in the order the groups are declared above. */
export const FAQ_GROUPS = ['The brand', 'The bottles', 'The Puddle', 'Getting one'] as const
export const groupedFaqs = () =>
  FAQ_GROUPS
    .map((g) => ({ group: g, items: publishedFaqs().filter((f) => f.group === g) }))
    .filter((s) => s.items.length > 0)
