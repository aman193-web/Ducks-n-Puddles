/**
 * The Duck Pond — the journal.
 *
 * HONESTY RULE, same as brand.ts: every post below is written from material that
 * is already true and already on the record — the sample diary, the confirmed
 * spec sheet, and the founders' own account on their live site. Nothing here
 * invents a claim, a date, a test result or a certification.
 *
 * TODO(client): the first three are drafts for sign-off. They are also the seed
 * data that Sanity replaces when the CMS goes in — the shape below is
 * deliberately the shape the CMS will return.
 *
 * ⚠️ THE REST ARE PLACEHOLDERS, marked `placeholder: true`, added to fill the
 * listing out while the layout is being agreed. They are deliberately written
 * to make NO claim about the product — no capacity, no material, no safety,
 * no test, no date — because filler on a children's brand that quietly states
 * a fact is the kind of thing that survives into production. Every one of them
 * is about process, parenting or the family, and none of them says anything a
 * manufacturer would have to stand behind.
 */
/** A paragraph, or a heading introducing one. */
export type Block = string | { h: string }

export interface Post {
  slug: string
  title: string
  /** The client's three categories, named in the Sep 2026 revisions. */
  tag: 'Behind the Puddles' | 'Things Worth Sharing' | 'Life Lately'
  /** ISO date. Shown as "12 September 2026". */
  date: string
  excerpt: string
  /** Asset id from lib/asset-manifest.json. */
  image: string
  readingMinutes: number
  /** Who wrote it. Omitted means the founders — see `defaultAuthor`. */
  author?: string
  /**
   * Free descriptive labels, shown on the cards and under the article. NOT the
   * same thing as `tag`, which is one of the client's three categories and is
   * navigation. These are flat text on purpose: the reference links its tags to
   * tag archives and this site has none, so a linked tag here would be a route
   * that does not exist.
   */
  tags?: string[]
  /**
   * Hand-picked for the "Top Articles" row.
   *
   * ⚠️ EDITORIAL, NOT MEASURED. The reference calls that row "most popular
   * reads" and ranks it on traffic; this site has no analytics of any kind, so
   * there is no popularity to sort by. Rather than invent one, the row is three
   * posts somebody chose, and the page says so — see the sub-line on the row.
   */
  top?: true
  /** Paragraphs, and the headings between them. A plain string is a paragraph;
   *  `{ h }` is a section heading, which is also what the article page's "On
   *  this page" rail is built from. */
  body: Block[]
  /** PLACEHOLDER COPY, here to fill the listing out while the layout is being
   *  agreed. Flagged rather than just commented so it can be found and removed
   *  in one pass — `posts.filter(p => !p.placeholder)` is the whole job. */
  placeholder?: true
}

/**
 * Who writes here, and the face beside the byline.
 *
 * One author, because one is the truth: both of the founders write these and
 * neither has asked for a separate byline. `avatar` is the duck mark rather
 * than a photograph of either of them — the Story section is where the family
 * appears, and a 32px crop of a family portrait reads as neither.
 */
export const defaultAuthor = { name: 'Larisa & Vinny', avatar: 'logo-mark' } as const

export const authorOf = (post: Post) => post.author ?? defaultAuthor.name

export const posts: Post[] = [
  {
    slug: 'why-were-still-on-sample-four',
    title: 'Why we’re still on sample four',
    tag: 'Behind the Puddles',
    date: '2026-08-21',
    excerpt:
      'Four rounds in, and the thing we keep changing is not the part you would expect. A short account of what each sample taught us.',
    image: 'sample-beach',
    readingMinutes: 4,
    tags: ['Samples', 'Product design'],
    top: true,
    body: [
      'The first three held water. That sounds like a low bar, and it is, but it is the bar every sample has to clear before anything else is worth discussing. On that round the duck printed on the sleeve was still green, which nobody liked, and the silhouette was right for the first time.',
      { h: 'What each round taught us' },
      'Sample two was the carry test. We added a handle and it carried beautifully — it also caught on everything: the lip of a bag, a car-seat buckle, the edge of a kitchen counter. A handle that catches is worse than no handle, so it went back.',
      'The same round is where the straw and lid first left the desk. There is no way to know how a flip-top behaves until a four-year-old opens it one-handed while walking. It is not the same test as opening it on a table.',
      { h: 'Why we have not shipped' },
      'Sample three was the colour check, done against real water rather than a screen, because screens lie about blue. Sample four is the closest yet: the tuft is right, the proportions are right, the names are not on the bottles yet.',
      'People ask why we do not just ship it. The honest answer is that we would rather be late than send out something we would not hand our own kids. There is no date yet. When there is one, the Duck Squad hears before the website does.',
    ],
  },
  {
    slug: 'what-to-look-for-in-a-kids-water-bottle',
    title: 'What to actually look for in a kid’s water bottle',
    tag: 'Things Worth Sharing',
    date: '2026-07-30',
    excerpt:
      'Capacity, lid, cleaning, grip. Four things worth checking before you buy any bottle — ours included.',
    image: 'sample-splashpad',
    readingMinutes: 3,
    tags: ['Buying guide', 'Materials', 'Safety'],
    top: true,
    body: [
      'Most bottle listings tell you a colour and a capacity and leave you to guess at the rest. These are the four things that decide whether a bottle gets used or ends up at the bottom of a bag.',
      { h: 'The things that matter' },
      'Capacity. Bigger is not better for a small child — a full one-litre bottle is heavy enough that they stop carrying it themselves, which defeats the point. Ours holds 9 oz, which is a size a toddler or preschooler can pick up, tip and put down without help.',
      'The lid. This is where most bottles fail. A flip-top straw with a snap closure means one motion to open, and a closure that stays shut in a backpack. Test it by shaking it upside down over a sink before you trust it over a car seat.',
      { h: 'The things that do not' },
      'Cleaning. Ask which parts are dishwasher safe, not whether the bottle is. Ours goes in the dishwasher; the cap and the silicone sleeve get a hand wash. If a brand cannot tell you which is which, that is worth noticing.',
      'Grip. Narrow enough for small hands, light enough to lift full. A bottle a child can manage alone is a bottle a child will actually drink from, which is the only measure that counts.',
      'One more, less measurable: whether they like it. A bottle with a face on it that your kid has named gets carried. That is not a feature you can put on a spec sheet, and it is the reason we started.',
    ],
  },
  {
    /* RENAMED. "Naming a duck after your kid" was written when the ducks were
       the founders' children; Our Story now says they are characters with
       personalities of their own, and a headline promising otherwise undoes
       that on the way past. The new one is what the post is actually about —
       the paragraph the whole piece turns on is the bottle that got carried
       once it had a name. Slug moved with it: nothing links here yet. */
    slug: 'why-a-bottle-with-a-name-gets-carried',
    title: 'Why a bottle with a name gets carried',
    tag: 'Life Lately',
    date: '2026-06-18',
    /* REWRITTEN. The old line said the three of them 'are real people',
       which Our Story now contradicts in as many words: they are 'three
       little ducks with personalities of their own'. The post's point
       survives the correction intact, because the point was never that
       they are portraits — it is that a bottle with a name on it gets
       carried, and that the name people will eventually print is their
       own child's. */
    excerpt:
      'Three ducks with personalities of their own — and the name we are most looking forward to printing is not one of theirs.',
    image: 'dune-walk',
    readingMinutes: 3,
    tags: ['Characters', 'Kids'],
    body: [
      'We did not set out to start a brand. We set out to solve one evening, repeatedly: a child who would not drink water, and a cupboard of bottles that had all failed for a different reason.',
      { h: 'What changes when it has a name' },
      'What worked, in the end, was not a better lid. It was giving the bottle a face. Once it had a face it had a name, and once it had a name it got carried to the car, to the beach, to bed.',
      'So the three of them got names and personalities of their own. Vincey is calm, collected and comforting — the one who goes in first so everyone else knows it is alright. Chi Chi is funny, bold and already in the puddle. Goosey is happy, optimistic and the perfect sidekick.',
      { h: 'What we did about it' },
      'They are not portraits of our kids, though our son did lend Vincey his name. They are three characters a child can pick between and recognise something of themselves in — which is a different thing, and the more useful one.',
      'The plan, eventually, is that the sleeve comes off and you put your own kid’s name on it instead. That one is not ready either — but it is the one we are most excited about, which is exactly why we are not rushing it.',
    ],
  },

  /* ------------------------------------------------------------------------
     PLACEHOLDERS BELOW. See the warning at the top of this file: none of them
     states a fact about the product. Delete the block, or filter on
     `placeholder`, when the real posts arrive.
     --------------------------------------------------------------------- */
  {
    slug: 'the-week-the-handle-came-off',
    title: 'The week the handle came off',
    tag: 'Behind the Puddles',
    date: '2026-08-07',
    excerpt: 'A carry test is just a week of ordinary days with something new in your bag.',
    image: 'sample-carry',
    readingMinutes: 3,
    tags: ['Samples', 'Testing'],
    placeholder: true,
    body: [
      'A carry test sounds like a procedure. In practice it is a week of ordinary days with something new in your bag, and a note on your phone every time it annoys you.',
      { h: 'What went wrong' },
      'The notes that week were all about the same thing. It caught. Getting out of the car, going through a door, reaching past it for a towel.',
      'Nothing in the drawings told us that. You only find it by carrying the thing around for a week and being honest about the small irritations you would otherwise talk yourself out of.',
      { h: 'What we changed' },
      'So it went back. That is most of what this part of the job is: noticing the thing you have started ignoring.',
    ],
  },
  {
    slug: 'choosing-a-blue',
    title: 'Choosing a blue',
    tag: 'Behind the Puddles',
    date: '2026-07-24',
    excerpt: 'Screens lie about blue. We learned that the slow way, holding samples up against real water.',
    image: 'pool-caustics',
    readingMinutes: 4,
    tags: ['Colour', 'Brand'],
    placeholder: true,
    body: [
      'Every blue looks right on a screen. Hold two of them up against real water and one of them is suddenly grey.',
      { h: 'Why blue was hard' },
      'We spent longer on this than we expected to, mostly outside, mostly squinting. A colour that sings indoors can go flat in full sun, and a colour that works in full sun can look like a swimming pool in a kitchen.',
      'What settled it was carrying the samples to the places the bottles would actually go. A splash pad. A beach at four in the afternoon. The back of a car.',
      { h: 'How we settled it' },
      'There is no clever method here. You look at the thing where it will live, and you keep looking until one of them stops being a question.',
    ],
  },
  {
    slug: 'why-we-draw-the-duck-first',
    title: 'Why we draw the duck first',
    tag: 'Behind the Puddles',
    date: '2026-06-26',
    excerpt: 'The character comes before the product. It sounds backwards, and it is the only order that has worked.',
    image: 'sample-mosaic',
    readingMinutes: 3,
    tags: ['Characters', 'Process'],
    placeholder: true,
    body: [
      'We draw the character before we design anything it goes on. It sounds backwards. It is the only order that has worked for us.',
      { h: 'Character before product' },
      'A character has to have a personality before it can have a face, and a face is what a child picks. Start from the object and you end up decorating it. Start from the character and the object has something to be.',
      'It also settles arguments. Once you know who Goosey is, you know what Goosey would be made of, and the two of us stop having opinions about it.',
      { h: 'How it changes the design' },
      'Three of them took a long time. We would not do it the other way round now.',
    ],
  },
  {
    slug: 'getting-a-toddler-to-drink-more-water',
    title: 'Getting a toddler to drink more water',
    tag: 'Things Worth Sharing',
    date: '2026-08-14',
    excerpt: 'Nothing we tried worked as well as the thing we were not trying: letting her choose.',
    image: 'shell-hands',
    readingMinutes: 4,
    tags: ['Hydration', 'Toddlers', 'Tips'],
    top: true,
    placeholder: true,
    body: [
      'We tried the obvious things. Asking. Reminding. Leaving it where she would see it. None of them moved the needle much.',
      { h: 'What actually works' },
      'What moved it was letting her choose which one was hers, and then not touching the decision again. A thing you picked yourself is a thing you carry.',
      'The other half of it was boring and practical: it had to be somewhere she could reach without asking. A bottle on a counter is a bottle that needs an adult.',
      { h: 'What to skip' },
      'We are not going to pretend this is universal. It is two parents and one child, and your child may be completely different. But it is the only thing that changed anything here.',
    ],
  },
  {
    slug: 'what-to-pack-for-a-splash-pad',
    title: 'What to pack for a splash pad',
    tag: 'Things Worth Sharing',
    date: '2026-07-10',
    excerpt: 'Five things, learned by forgetting each of them at least once.',
    image: 'sample-splashpad',
    readingMinutes: 3,
    tags: ['Days out', 'Packing'],
    placeholder: true,
    body: [
      'A splash pad is the easiest outing there is and the one we most often get wrong. Here is the short list, learned by forgetting each of these at least once.',
      { h: 'The short list' },
      'A towel you do not mind about. A second one for the car seat. More snacks than seems reasonable, because the water makes them hungry in a way the park does not.',
      'Something dry for the drive home, laid out before you leave, because you will not want to be looking for it with a wet child on your hip.',
      { h: 'The things people forget' },
      'And a bag you can carry on one shoulder. Both hands are already busy.',
    ],
  },
  {
    slug: 'one-bottle-not-six',
    title: 'The case for one bottle, not six',
    tag: 'Things Worth Sharing',
    date: '2026-06-05',
    excerpt: 'We had a cupboard full. The one that got used was the one that had been chosen.',
    image: 'sample-caddy',
    readingMinutes: 3,
    tags: ['Buying guide', 'Less stuff'],
    placeholder: true,
    body: [
      'Before any of this we had a cupboard full of bottles. Different sizes, different lids, all of them bought to solve the same problem and none of them solving it.',
      { h: 'The case against the cupboard' },
      'The one that got used was never the newest. It was the one she had picked, and the others were just taking up a shelf.',
      'There is a version of this that sounds like advice and is really just an argument for buying ours. It is not meant to be. If the one you already own gets carried, you are done.',
      { h: 'What to look for instead' },
      'The useful part is the question underneath it: does this one actually get picked up? Six that do not is worse than one that does.',
    ],
  },
  {
    slug: 'naming-three-ducks',
    title: 'Naming three ducks',
    tag: 'Life Lately',
    date: '2026-08-28',
    excerpt: 'Two of the names took an evening. The third took four months.',
    image: 'dune-walk',
    readingMinutes: 4,
    tags: ['Characters', 'Naming'],
    placeholder: true,
    body: [
      'Two of them arrived almost immediately. Chi Chi and Vincey turned up in the same evening, and neither of us can remember who said which.',
      { h: 'Where the names came from' },
      'The third took four months. Everything we tried was either too close to a real name or sounded like a brand trying to be friendly, which is its own kind of wrong.',
      'Goosey came from a conversation that was not about the project at all. Most of the good ones did.',
      { h: 'What naming them taught us' },
      'We keep a list of the ones that did not make it. It is very long and quite funny and nobody else is ever going to see it.',
    ],
  },
  {
    slug: 'a-kitchen-table-and-a-laptop',
    title: 'A kitchen table and a laptop',
    tag: 'Life Lately',
    date: '2026-07-17',
    excerpt: 'Where the work actually happens, and what gets cleared off it before dinner.',
    image: 'foundation-children',
    readingMinutes: 3,
    tags: ['Founders', 'Starting out'],
    placeholder: true,
    body: [
      'There is no studio. There is a kitchen table, a laptop, and a box of samples that has to be cleared off it before dinner every evening.',
      { h: 'How it started' },
      'We have made peace with that. The clearing-off is useful: it forces a stopping point, which is not something either of us is naturally good at.',
      'The samples live in the box because the alternative is them living on every surface in the house, which we tried for a while.',
      { h: 'Where it is now' },
      'One day there may be a room for all this. For now the table is working, and the walk to it is short.',
    ],
  },
  {
    slug: 'someone-elses-child',
    title: 'The first time someone else’s child carried one',
    tag: 'Life Lately',
    date: '2026-05-22',
    excerpt: 'You can test a thing for a year. It is different when it leaves your house.',
    image: 'cart-path',
    readingMinutes: 3,
    tags: ['Founders', 'Community'],
    placeholder: true,
    body: [
      'You can test a thing in your own house for a year and still not know anything. Your child is kind to it. Your child knows it matters.',
      { h: 'The moment it landed' },
      'The first time one went out with somebody else\u2019s child was a different experiment entirely, and we were nervous in a way neither of us admitted at the time.',
      'It came back fine. It also came back with a scuff we had not anticipated, in a place we had not thought about, which told us more in one afternoon than the previous month had.',
      { h: 'What it changed' },
      'We have been handing them out ever since. The notes we get back are the most useful thing we have.',
    ],
  },
]

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)

/* ---------------------------------------------------------------------------
   CATEGORIES.

   The client's three, in the order their document lists them, each with the
   slug its own page lives at. Declared here rather than derived from the posts
   so a category keeps its page — and its chip in the filter row — on the day
   it happens to have nothing in it. A blog with one post per category, which
   is what this is today, would otherwise lose two thirds of its navigation the
   moment a draft moved.
   --------------------------------------------------------------------------- */
export type CategorySlug = 'behind-the-puddles' | 'things-worth-sharing' | 'life-lately'

export interface Category {
  slug: CategorySlug
  /** Exactly the string a post's `tag` carries. */
  label: Post['tag']
  /** One line for the category page's own head and its <meta name="description">. */
  blurb: string
}

export const categories: Category[] = [
  { slug: 'behind-the-puddles', label: 'Behind the Puddles',
    blurb: 'How the bottles get made, and what each round of samples taught us.' },
  { slug: 'things-worth-sharing', label: 'Things Worth Sharing',
    blurb: 'What we have learned that is worth passing on, whoever you end up buying from.' },
  { slug: 'life-lately', label: 'Life Lately',
    blurb: 'Where the ducks came from, and what the two of us are up to.' },
]

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug)

/** The category a post belongs to, by its `tag`. */
export const categoryOf = (post: Post) =>
  categories.find((c) => c.label === post.tag)

/** Newest first, like every other listing on the site. */
export const postsInCategory = (slug: string) => {
  const c = categoryBySlug(slug)
  if (!c) return []
  return posts
    .filter((p) => p.tag === c.label)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const postsNewestFirst = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date))

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
