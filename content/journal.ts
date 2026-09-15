/**
 * The Duck Pond — the journal.
 *
 * HONESTY RULE, same as brand.ts: every post below is written from material that
 * is already true and already on the record — the sample diary, the confirmed
 * spec sheet, and the founders' own account on their live site. Nothing here
 * invents a claim, a date, a test result or a certification.
 *
 * TODO(client): these three are drafts for sign-off. They are also the seed data
 * that Sanity replaces when the CMS goes in — the shape below is deliberately
 * the shape the CMS will return.
 */
export interface Post {
  slug: string
  title: string
  tag: 'Behind the scenes' | 'For parents' | 'Our story'
  /** ISO date. Shown as "12 September 2026". */
  date: string
  excerpt: string
  /** Asset id from lib/asset-manifest.json. */
  image: string
  readingMinutes: number
  body: string[]
}

export const posts: Post[] = [
  {
    slug: 'why-were-still-on-sample-four',
    title: 'Why we’re still on sample four',
    tag: 'Behind the scenes',
    date: '2026-08-21',
    excerpt:
      'Four rounds in, and the thing we keep changing is not the part you would expect. A short account of what each sample taught us.',
    image: 'sample-beach',
    readingMinutes: 4,
    body: [
      'The first three held water. That sounds like a low bar, and it is, but it is the bar every sample has to clear before anything else is worth discussing. On that round the duck printed on the sleeve was still green, which nobody liked, and the silhouette was right for the first time.',
      'Sample two was the carry test. We added a handle and it carried beautifully — it also caught on everything: the lip of a bag, a car-seat buckle, the edge of a kitchen counter. A handle that catches is worse than no handle, so it went back.',
      'The same round is where the straw and lid first left the desk. There is no way to know how a flip-top behaves until a four-year-old opens it one-handed while walking. It is not the same test as opening it on a table.',
      'Sample three was the colour check, done against real water rather than a screen, because screens lie about blue. Sample four is the closest yet: the tuft is right, the proportions are right, the names are not on the bottles yet.',
      'People ask why we do not just ship it. The honest answer is that we would rather be late than send out something we would not hand our own kids. There is no date yet. When there is one, the Duck Squad hears before the website does.',
    ],
  },
  {
    slug: 'what-to-look-for-in-a-kids-water-bottle',
    title: 'What to actually look for in a kid’s water bottle',
    tag: 'For parents',
    date: '2026-07-30',
    excerpt:
      'Capacity, lid, cleaning, grip. Four things worth checking before you buy any bottle — ours included.',
    image: 'sample-splashpad',
    readingMinutes: 3,
    body: [
      'Most bottle listings tell you a colour and a capacity and leave you to guess at the rest. These are the four things that decide whether a bottle gets used or ends up at the bottom of a bag.',
      'Capacity. Bigger is not better for a small child — a full one-litre bottle is heavy enough that they stop carrying it themselves, which defeats the point. Ours holds 9 oz, which is a size a toddler or preschooler can pick up, tip and put down without help.',
      'The lid. This is where most bottles fail. A flip-top straw with a snap closure means one motion to open, and a closure that stays shut in a backpack. Test it by shaking it upside down over a sink before you trust it over a car seat.',
      'Cleaning. Ask which parts are dishwasher safe, not whether the bottle is. Ours goes in the dishwasher; the cap and the silicone sleeve get a hand wash. If a brand cannot tell you which is which, that is worth noticing.',
      'Grip. Narrow enough for small hands, light enough to lift full. A bottle a child can manage alone is a bottle a child will actually drink from, which is the only measure that counts.',
      'One more, less measurable: whether they like it. A bottle with a face on it that your kid has named gets carried. That is not a feature you can put on a spec sheet, and it is the reason we started.',
    ],
  },
  {
    slug: 'naming-a-duck-after-your-kid',
    title: 'Naming a duck after your kid',
    tag: 'Our story',
    date: '2026-06-18',
    excerpt:
      'Vincey, Chi Chi and Goosey are real people who are, at time of writing, asleep upstairs.',
    image: 'dune-walk',
    readingMinutes: 3,
    body: [
      'We did not set out to start a brand. We set out to solve one evening, repeatedly: a child who would not drink water, and a cupboard of bottles that had all failed for a different reason.',
      'What worked, in the end, was not a better lid. It was giving the bottle a face. Once it had a face it had a name, and once it had a name it got carried to the car, to the beach, to bed.',
      'So the three of them are named after our three. Vincey is calm, collected and comforting — the one who goes in first so everyone else knows it is alright. Chi Chi is funny, bold and already in the puddle. Goosey is happy, optimistic and the perfect sidekick.',
      'That is not marketing copy invented in a meeting. Ask any parent to describe their kids in three words and you get something like this. We just printed it on a bottle.',
      'The plan, eventually, is that the sleeve comes off and you put your own kid’s name on it instead. That one is not ready either — but it is the one we are most excited about, which is exactly why we are not rushing it.',
    ],
  },
]

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })
