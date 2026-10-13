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
/**
 * A paragraph, a heading introducing one, or an emphasised paragraph.
 *
 * `em` exists because the client's own posts bold whole paragraphs — the line
 * that states the mission, the one about the Foundation, the three words the
 * third post turns on. Those are emphasis, NOT section headings, so they must
 * not become `h`: that would put them in the article's contents rail and
 * promise a structure the writing does not have.
 */
export type Block = string | { h: string } | { em: string }

export interface Post {
  slug: string
  title: string
  /** The client's categories. 'The Parenting Perspective' joined them with the
   *  October blog copy; 'Things Worth Sharing' is not in that document but the
   *  placeholder posts still use it, so it stays until they go. */
  tag: 'Behind the Puddles' | 'Things Worth Sharing' | 'Life Lately' | 'The Parenting Perspective'
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
  /**
   * The "key takeaways" box at the head of the article.
   *
   * ⚠️ PLACEHOLDER POSTS ONLY. Four summary lines per article is editorial
   * copy, and nothing of mine goes into the posts the client wrote. Theirs have
   * none, so the box does not render on them; it appears the day they write
   * four lines each.
   */
  takeaways?: string[]
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
export const defaultAuthor = {
  name: 'Larisa & Vinny',
  /**
   * ONE IMAGE EVERYWHERE, at the client's call: the byline on every card —
   * /blog, the category and tag pages, and the home page's blog row — and the
   * author card at the foot of an article. The duck mark it replaces is still
   * registered; nothing else used it.
   *
   * It is the founders cropped to their faces, which is also what keeps it out
   * of tier C — see the note beside the entry in manifest.mjs.
   */
  avatar: 'founders',
  /**
   * The line under the name, and the bio under that.
   *
   * ⚠️ BOTH ARE THE CLIENT'S OWN SENTENCES, assembled rather than written. The
   * first is how they introduce themselves in the opening line of their own
   * first post; the second is brand.why, the sentence they gave for what the
   * company is for. Nothing here is mine — an author box needs a bio and they
   * have not supplied one as such, so this is built from what they have said
   * about themselves elsewhere. Worth their sign-off all the same.
   */
  role: 'Founders of Ducks ’n Puddles',
  bio:
    'Husband and wife, mom and dad, and the founders of Ducks ’n Puddles. '
    + 'We make thoughtful products that support parents and bring comfort and '
    + 'positivity to kids.',
} as const

export const authorOf = (post: Post) => post.author ?? defaultAuthor.name

/**
 * NOTHING IN THE CLIENT'S THREE POSTS IS MINE. Not a heading, not a line.
 *
 * Seventeen section headings were written here so the brief's "table of
 * contents on each blog inner page" would have something to list. The client
 * then said not to add anything of my own where they have supplied copy, so
 * they are gone.
 *
 * ⚠️ WHICH MEANS THOSE THREE ARTICLES HAVE NO CONTENTS LIST — their document is
 * continuous prose with no headings in it, and a contents list cannot be built
 * from writing that has no sections. The rail still carries the Duck Squad
 * card; the contents half appears the moment a post has two headings. The only
 * thing that puts one on these three is the client adding headings to their own
 * copy. The nine placeholder posts, which are mine, keep theirs.
 */
export const posts: Post[] = [
  {
    slug: 'from-one-little-duck-to-a-really-big-dream',
    title: 'From One Little Duck to a Really Big Dream: The Story Behind Ducks ’n Puddles',
    tag: 'Behind the Puddles',
    date: '2026-10-06',
    excerpt:
      'Before Ducks ’n Puddles was a company, it was simply an idea. And before it became this really big dream of ours, it started with one little duck.',
    image: 'family-portrait',
    readingMinutes: 6,
    tags: ['Our story', 'Founders', 'The Foundation'],
    top: true,
    body: [
      'Hi! We’re Larisa and Vinny — husband and wife, mom and dad, and the founders of Ducks ’n Puddles.',
      'Before Ducks ’n Puddles was a company, it was simply an idea. And before it became this really big dream of ours, it started with one little duck.',
      'The earliest idea for Ducks ’n Puddles came while we were expecting our daughter, Lucy. We were on our “babymoon,” talking about ideas and dreaming about the future, when the idea of creating a children’s water bottle shaped like a duck came up. At the time, it was just that — an idea for a product. Then Lucy came along, and funny enough, one of her very first words was “duck.” Ducks somehow kept finding their way into our lives, and eventually that original idea found its way back to us too.',
      'But by then, something had changed. We were parents.',
      'We understood family life differently. We understood how many products you accumulate when you have children — the water bottles, wipes, bath products, mealtime products, travel products, and endless things stuffed into diaper bags, backpacks, strollers, and every cabinet in your house. We started asking ourselves: What if we could create products that bring a greater sense of comfort to both parents and children? What if the everyday essentials families already need could offer parents more ease, convenience, and peace of mind, while giving children a sense of comfort, confidence, and companionship?',
      'That question really became the beginning of what Ducks ’n Puddles is today.',
      'Ducks ’n Puddles began with a water bottle, but somewhere along the way we realized it was never really about a water bottle. We started creating characters... Chi Chi, our bold and brave little duck; Goosey, our optimist who always finds the good; and Vincey, our calm, gentle little guy with a really big heart. Suddenly, we weren’t just creating products anymore. We were creating friends.',
      'We started imagining a child grabbing their favorite duck before school, taking them on vacation, bringing them to soccer practice, cuddling up with their stories at bedtime, or reaching for something familiar when they were somewhere new. We want children to associate Ducks ’n Puddles with feelings of love, comfort, safety, confidence, joy, and belonging. At the same time, we want parents to associate our brand with ease — thoughtful products that solve some of the little problems that come along with raising kids.',
      { em: 'That became the heart of our mission: functionality for parents and positive direction for kids.' },
      'Getting here, however, has definitely not been a straight line. If there’s one thing we’ve learned while building Ducks ’n Puddles, it’s that bringing an idea to life is very different from having one. There have been prototypes that weren’t right, materials we’ve changed, packaging we’ve redesigned, manufacturing issues we never anticipated, parts that broke, and details that seemed tiny but turned into months of problem-solving. There have been so many moments when we thought we were almost there, only to realize there was something else we needed to fix.',
      { em: 'As eager as we are to finally get these products into your children’s hands, we continue to remind ourselves that if we’re going to create something for children, we want to create it with intention and integrity. So we keep asking questions. We make another change. We test again. And somewhere along the way, we’ve realized that the obstacles have actually helped shape the kind of company we want Ducks ’n Puddles to be. We don’t want to rush something into the world just to say we launched it. We want to be proud of what we’re putting into it.' },
      'And through all of this, the dream has just continued to get bigger.',
      'What started as three little duck water bottles has grown into a vision for a children’s lifestyle brand that grows alongside families. We imagine products that make bath time easier, mealtime less stressful, travel more fun, and messes easier to handle. We imagine stories that teach meaningful lessons, characters that become familiar friends, and products that children are excited to use and parents genuinely feel good about buying.',
      'But our dream has also become much bigger than the products we hope to create.',
      { em: 'One of the most meaningful parts of our vision is the Ducks ’n Puddles Foundation. Our hope is that as the company grows, its success will help fund a foundation dedicated to supporting children and families who need to feel held and supported the most — with a special focus on single mothers and children in the foster care system. We envision creating opportunities for mothers to work, earn an income, be present with their children, and have access to an environment where their families can thrive. We also dream of creating educational opportunities, mentorship, programs, and supportive environments for children in foster care — all rooted in the same feelings we want every Ducks ’n Puddles child to experience: love, safety, comfort, belonging, and knowing that they matter.' },
      { em: 'There is still so much to build and so much we have to learn, but the Foundation represents something really important to us: we don’t want success to end with us. We want the growth of Ducks ’n Puddles to give us a greater ability to contribute, to help, and to create something meaningful for other families. The bigger the company grows, the more good we hope to be able to do.' },
      { em: 'At the end of the day, we don’t just want to sell more things to families. We want to create things that matter to families — and build a company that can eventually make a meaningful difference far beyond the products we sell.' },
      'Right now, though, we’re still at the beginning. We’re building this company while raising our own little family, learning as we go, dreaming really big, getting things wrong sometimes, fixing them, and continuing forward. Our kids are very much growing up alongside Ducks ’n Puddles. There are business meetings with Lucy sitting on our laps and Vincey eating in his highchair in the background. There are late-night conversations after bedtime, prototypes all over the house, endless ideas, moments of frustration, and those really exciting moments when something we’ve been working on finally works.',
      'Someday, when Ducks ’n Puddles is much bigger than it is today, I think we’ll look back at this chapter and remember how special it was. We’ll remember when it was still just us, our little family, three ducks, a whole lot of ideas, and this feeling that maybe we could build something that puts a little more good into the world.',
      'So if you’re finding us now, welcome. You’re here at the very beginning. We hope you’ll grow with us, adventure with us, and get to know these three little ducks who have already become such a big part of our family.',
      'And hopefully, one day, they’ll become a little part of yours too.',
      { em: 'A Friend for Every Adventure.' },
      { em: 'With love, Larisa & Vinny' },
    ],
  },
  {
    slug: 'the-life-were-living-the-dream-were-building',
    title: 'The Life We’re Living, The Dream We’re Building',
    tag: 'Life Lately',
    date: '2026-09-30',
    excerpt:
      'A little space where we can invite you into our world — the behind-the-scenes moments, the everyday chaos, the little victories, and everything in between.',
    image: 'sample-armful',
    readingMinutes: 7,
    tags: ['Family life', 'Behind the scenes', 'Gratitude'],
    top: true,
    body: [
      'We’ve been dreaming, creating, and building Ducks ’n Puddles for quite some time now. And the beautiful thing is, as our family has grown, so has our dream.',
      'When we first started Ducks ’n Puddles, we knew we wanted to create something meaningful. What we didn’t realize was just how much of our everyday lives, our family, and the people around us would become part of bringing that dream to life.',
      'So, welcome to Life Lately!',
      'We wanted to create a little space where we could invite you into our world — the behind-the-scenes moments, the everyday chaos, the little victories, and everything in between. Our hope is that, as you follow along, you’ll feel like you’re getting to know us, growing alongside us, and becoming part of the Ducks ’n Puddles family.',
      { em: 'So, what does life actually look like while building a business and raising two little ones?' },
      'Well, today is Friday, and I’m writing this from 1909, an entrepreneurship community and workspace in West Palm Beach, Florida. I recently joined, and it has already been such a blessing in my life. Between the mentorship, workshops, networking opportunities, and incredible people I’ve met, it’s given me even more inspiration and motivation to turn Ducks ’n Puddles into my full-time career.',
      'Meanwhile, Vinny is home with our son, Vincey, while our daughter, Lucy, is at school. We’re incredibly grateful that Vinny currently has the flexibility to work from home, allowing us to make days like this possible.',
      'And honestly, that pretty much sums up our lives right now. A whole lot of coordinating, communicating, switching roles, and figuring things out as we go.',
      'Most mornings, I wake up around 4 a.m. I spend time on my spiritual practices, meditate, exercise, see a therapy client, and squeeze in some Ducks ’n Puddles work, all while Vinny takes care of getting the kids up and ready for the day. By 8:30 a.m., I’ve already had a pretty full morning.',
      'From there, every day looks a little different. Some days I’m fully in mom mode, spending the day with Lucy and Vincey. Other days I’m seeing clients in my mental health counseling practice. And then there are days like today, when I get to dedicate my time to building Ducks ’n Puddles.',
      'It’s busy. Sometimes really busy. But it’s also incredibly intentional.',
      { em: 'And if there’s one thing this experience has taught me, it’s that you don’t build something meaningful alone.' },
      'I am so, so proud of Vinny and me. Not just for what we’re creating, but for how we’re creating it together.',
      'We truly are a team, and I genuinely don’t think we could be doing what we’re doing without the foundation we’ve built in our relationship. It takes communication, flexibility, understanding, and, most importantly, a willingness to show up for one another.',
      'Sometimes that means one of us takes on more with the kids while the other focuses on work. Sometimes it means rearranging our entire day because something unexpected comes up. And sometimes it simply means recognizing what the other person needs and stepping in without hesitation.',
      'We’ve learned that balance doesn’t necessarily mean everything gets equal time and attention every single day. It means being intentional with what matters, understanding that our roles may look different from day to day, and remembering that we’re always on the same team.',
      'And then there are those little moments that remind us exactly why we’re doing all of this.',
      'One of my absolute favorite parts of this journey has been watching Lucy fall in love with Ducks ’n Puddles.',
      'She brings the ducks everywhere. She plays with them, puts them to sleep, takes care of them, and even wants to sleep with them herself. Watching her develop such a genuine connection with something we’ve spent so much time dreaming about and creating is one of the most rewarding feelings.',
      'But there’s one little moment that gets me every time.',
      'Part of our bedtime routine is reading a book together and then taking a moment to thank God for all the things we’re grateful for. And most nights, before we even have a chance to say anything, Lucy starts us off with:',
      { em: '“Thank you, God, for Ducks ’n Puddles.”' },
      'Every time she says it, Vinny and I look at each other and smile. It’s one of those moments where we don’t even need to say anything. We both feel it — that little reminder that we’re exactly where we’re supposed to be.',
      'And in those moments, I realize that what we’ve been envisioning all along is already happening right in front of us.',
      'A Friend for Every Adventure.',
      'There she is, our own daughter, finding comfort, companionship, and so much joy in these little ducks.',
      { em: 'It’s one thing to dream about what you want to create. It’s another thing entirely to watch your dream become something meaningful in your own child’s life.' },
      'There’s also something a little deeper that I want to share.',
      'I genuinely believe Ducks ’n Puddles is a God-given assignment. While Vinny and I may be the ones building the company, I don’t believe this vision is ours alone. I believe we’ve been given an opportunity to create something that brings people together, serves others, adds value to families, and ultimately becomes an expression of love.',
      'And that’s what fuels us.',
      'We don’t just want to create products. We want to create something that makes people feel good, something that brings comfort and connection into everyday life, and something that grows into a community where people feel supported, cared for, and part of something bigger.',
      'And one of the most beautiful parts of this journey has been watching the right people come into our lives to help make that vision possible.',
      'I especially want to take a moment to recognize Paul, Sahil, and their incredible team, who brought our Ducks ’n Puddles website to life.',
      'I truly cannot express how grateful and proud I am of what they’ve created. They’ve taken our ideas, our vision, and everything this brand means to us and turned it into something real, something we can finally share with the world.',
      'But what means even more to me is that they’ve become so much more than people we’re working with. They’ve become part of our Ducks ’n Puddles family.',
      'And that’s exactly what we hope to continue creating. Not just a company, but a community of people who genuinely care about one another, believe in what we’re building, and want to be part of making a positive difference.',
      'When I think about our lives right now, I feel an overwhelming sense of gratitude.',
      'We’re raising our babies, working our jobs, nurturing our marriage, and building something we believe in with our whole hearts.',
      'Is it always easy? Absolutely not. Do we have everything figured out? Not even close! But I wouldn’t trade this season for anything.',
      { em: 'Because the more I reflect on this journey, the more I realize that the dream isn’t just about what we’re working toward. It’s also about the life we’re living, the people we’re loving, and who we’re becoming along the way.' },
      'One day, I know we’ll look back on these early mornings, busy schedules, endless conversations, and little ducks scattered all around our house, and realize just how special this chapter really was.',
      'And maybe that’s something worth remembering for all of us. Sometimes we’re so focused on getting to where we want to be that we forget to appreciate everything that’s happening right here, right now.',
      'The life we’re living today is just as much a part of the dream as the future we’re working so hard to create.',
      'So, we’re doing our best to embrace it all. The busy days, the beautiful moments, the challenges, the growth, and every little adventure in between.',
      'And I’m so grateful we get to share a little piece of it with you.',
      'Thank you for being here, for following along, and for becoming part of our Ducks ’n Puddles family. We’re so happy you’re here.',
      { em: 'With love, Larisa ♡' },
    ],
  },
  {
    slug: 'what-if-this-is-the-good-part',
    title: 'What If This Is the Good Part?',
    tag: 'The Parenting Perspective',
    date: '2026-09-24',
    excerpt:
      'A little reminder that we don’t have to wait for life to become less messy, busy, or chaotic to appreciate the beauty of the season we’re in.',
    image: 'shell-hands',
    readingMinutes: 5,
    tags: ['Motherhood', 'Perspective', 'Everyday life'],
    top: true,
    body: [
      'Lately, I’ve been reminding myself of three simple words:',
      { em: '“I’m okay with it.”' },
      'And as simple as they sound, they’ve completely shifted the way I experience my everyday life.',
      'I’m a mom of two little ones, and if you’re in a similar season of life, you probably know exactly what I mean when I say that some days are just a lot.',
      'The house is a mess. The car somehow looks like we’ve been living out of it for weeks. There are toys everywhere, dishes in the sink, snacks being requested every five minutes, someone crying because something didn’t go their way, and a never-ending list of things that need to get done.',
      'Then there are the doctor appointments, the sleepless nights, the exhaustion, and the feeling that your entire day revolves around everyone else’s needs.',
      'And yet, in the middle of all of that, there’s also so much joy.',
      'The little voices calling for you. The hugs that come out of nowhere. The laughter over something completely silly. The tiny hands reaching for yours. The feeling of being someone’s entire world.',
      'It’s beautiful, exhausting, overwhelming, fulfilling, and messy, sometimes all within the same five minutes.',
      'And I’ve been realizing something that has changed the way I look at all of it.',
      { em: 'This isn’t a stage of life I need to get through. This is a stage of life I get to experience.' },
      'For so long, I think it’s easy to fall into the habit of believing that life will feel better when something changes.',
      'When the kids are a little older. When the house stays clean. When we get more sleep. When we have more time for ourselves. When things finally slow down.',
      'But then I started asking myself: What exactly am I waiting for?',
      'Because one day, the house probably will be quieter. The toys won’t be scattered across the floor. The car won’t be filled with little shoes, snacks, and things I didn’t even know we owned.',
      'My children will become more independent. They’ll need me differently. Our schedules will change, our routines will change, and we’ll enter an entirely new season of life.',
      'And that season will bring its own beautiful experiences, challenges, and opportunities.',
      'But it won’t be this one.',
      'And suddenly, the things that once felt like inconveniences started to look a little different.',
      'The toys on the floor mean there are little ones here playing. The constant requests mean there are children who look to me for comfort and connection. The busy schedules mean we’re living a full life together.',
      'That doesn’t mean I have to love every single moment. I can still feel exhausted. I can still need a break. I can still want a clean house and a little peace and quiet!',
      'But I don’t have to resist the reality of the season I’m in.',
      'And that’s where those three words come in.',
      { em: 'I’m okay with it.' },
      'The house is messy today? I’m okay with it.',
      'The day didn’t go as planned? I’m okay with it.',
      'I’m tired, the kids need extra attention, and my to-do list is going to have to wait? I’m okay with it.',
      'Not because everything is perfect, but because everything doesn’t have to be perfect for me to be okay.',
      'I’ve come to love this reminder:',
      { em: 'When you’re okay with everything, everything becomes okay.' },
      'To me, that doesn’t mean every circumstance is good, or that we should accept things that are harmful or need to change. It means that I can stop fighting the things that are simply part of being human. I can respond to what needs my attention without believing that life has to look different before I can enjoy it.',
      'And when I stop wishing the present moment were something else, I find myself actually experiencing it.',
      'I can laugh at the chaos instead of getting frustrated by it. I can sit on the floor and play with my kids without thinking about everything I should be doing. I can appreciate the little moments without needing them to be any different.',
      'And perhaps most importantly, I can remember that there’s nowhere else I need to be right now.',
      'Not because I don’t have dreams or goals for the future. I absolutely do.',
      'But because I don’t want to spend this season of my life wishing I were already in the next one.',
      'One day, I’ll have the experience of being a mom to older children. And after that, another experience, and another. Each one will bring something different.',
      'But right now, I get to experience this.',
      'The messy house. The sticky hands. The early mornings. The bedtime snuggles. The exhaustion. The laughter. The love...All of it.',
      'And what a gift it is to be here for it.',
      'So, if you’re in a season of life that feels a little overwhelming, a little chaotic, or maybe just different from what you imagined, I hope this serves as a gentle reminder:',
      { em: 'You don’t have to wait for life to become something else to appreciate the life you have right now.' },
      'You can want things to change and still find peace in where you are. You can feel tired and grateful. You can love your children more than anything and still need a moment to yourself. You can have a messy home and a beautiful life.',
      'Because maybe the goal isn’t to get everything in order so we can finally enjoy our lives. Maybe it’s learning to enjoy our lives while everything is unfolding, embracing the messy, beautiful, chaotic experience of it all.',
      'And realizing that we don’t have to wait for life to be different to appreciate just how beautiful it already is.',
      { em: 'With love, Larisa ♡' },
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
    takeaways: [
      'A handle that catches on a bag is worse than no handle at all.',
      'Carry tests only work over ordinary days, not on a desk.',
      'The fix was shape, not strength.',
    ],
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
    takeaways: [
      'Screens lie about blue — check it against real water.',
      'A colour that works in a render can fail in sunlight.',
      'Two rounds of samples went on this one decision.',
    ],
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
    takeaways: [
      'The character comes before the product, every time.',
      'A face changes what a child does with an object.',
      'Design decisions get easier once the character is fixed.',
    ],
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
    takeaways: [
      'Letting them choose beats any amount of encouraging.',
      'A bottle they can open themselves gets used more.',
      'Nothing about this needs a chart or a reward sticker.',
    ],
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
    takeaways: [
      'Pack for the walk back, not for the splash pad.',
      'A spare top matters more than a spare towel.',
      'Everything that goes in the bag has to survive being wet.',
    ],
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
    takeaways: [
      'A cupboard of bottles means none of them is the one.',
      'Children carry the bottle they recognise.',
      'Buy once, properly, and skip the rest.',
    ],
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
    takeaways: [
      'Two of the names took an evening; the third took months.',
      'A name has to survive being shouted across a car park.',
      'The names came after the personalities, not before.',
    ],
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
    takeaways: [
      'There is no studio — there is a table that gets cleared for dinner.',
      'Samples live in a box under it.',
      'Most of the work happens after bedtime.',
    ],
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
    takeaways: [
      'The first stranger carrying one is the real test.',
      'It is the moment a product stops being yours.',
      'Nothing in a spec sheet prepares you for it.',
    ],
    body: [
      'You can test a thing in your own house for a year and still not know anything. Your child is kind to it. Your child knows it matters.',
      { h: 'The moment it landed' },
      'The first time one went out with somebody else’s child was a different experiment entirely, and we were nervous in a way neither of us admitted at the time.',
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
export type CategorySlug =
  | 'behind-the-puddles' | 'things-worth-sharing' | 'life-lately'
  | 'the-parenting-perspective'

export interface Category {
  slug: CategorySlug
  /** Exactly the string a post's `tag` carries. */
  label: Post['tag']
  /** One line for the category page's own head and its <meta name="description">. */
  blurb: string
}

/**
 * THE CATEGORIES, with the client's own descriptions (Website Blog Posts,
 * October 2026) replacing the ones written here.
 *
 * ⚠️ THE FOURTH ONE IS NAMED TWO WAYS IN THAT DOCUMENT. Its description list
 * calls it "A Perspective Shift"; the heading over the post itself calls it
 * "The Parenting Perspective". The brief said to add "The Parenting
 * Perspective", so that is the name here and the description is the one the
 * document gives "A Perspective Shift" — they are plainly the same category.
 * Worth confirming which name they want.
 *
 * 'Things Worth Sharing' is not in the document at all. It stays because four
 * of the placeholder posts are filed under it; it goes when they do.
 */
export const categories: Category[] = [
  { slug: 'behind-the-puddles', label: 'Behind the Puddles',
    blurb: 'Our journey building Ducks ’n Puddles, product updates, exciting announcements, and what’s coming next.' },
  { slug: 'life-lately', label: 'Life Lately',
    blurb: 'Personal stories, family moments, and a glimpse into our everyday lives.' },
  { slug: 'the-parenting-perspective', label: 'The Parenting Perspective',
    blurb: 'Meaningful reflections and teachings that encourage us to see and experience life through greater awareness and love.' },
  { slug: 'things-worth-sharing', label: 'Things Worth Sharing',
    blurb: 'What we have learned that is worth passing on, whoever you end up buying from.' },
]

/* --------------------------------------------------------------------------
   TAGS.

   Not categories. A category is one of the client's four, it is navigation, and
   every post has exactly one. A tag is a loose descriptive label and a post has
   two or three. They were flat text until the client asked for /tag/<slug>
   URLs; now they are links, and these are what resolve them.

   There is no tag registry: the set is whatever the posts use, derived rather
   than declared. That is the opposite of the decision made for categories — and
   deliberately so. Categories are a fixed, client-owned list whose pages must
   exist even when empty; a tag only means anything while something carries it,
   so a tag nobody uses should stop having a page.
   -------------------------------------------------------------------------- */

export const tagSlug = (tag: string) =>
  tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Every tag in use, alphabetical, de-duplicated. */
export const allTags = () =>
  [...new Set(posts.flatMap((p) => p.tags ?? []))].sort((a, b) => a.localeCompare(b))

/** The label behind a slug — tags are stored as prose, not as slugs. */
export const tagBySlug = (slug: string) =>
  allTags().find((t) => tagSlug(t) === slug)

export const postsWithTag = (slug: string) => {
  const tag = tagBySlug(slug)
  if (!tag) return []
  return posts
    .filter((p) => p.tags?.includes(tag))
    .sort((a, b) => b.date.localeCompare(a.date))
}

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
