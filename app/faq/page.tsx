import type { Metadata } from 'next'
import Link from 'next/link'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { FaqList } from '@/components/ui/FaqList'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { groupedFaqs, publishedFaqs, brand } from '@/content/brand'
import styles from './faq.module.css'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Everything parents ask us about Ducks ’n Puddles — the bottles, the 2-in-1 Puddle, cleaning, safety, and how to get one.',
  alternates: { canonical: '/faq' },
  openGraph: {
    type: 'website',
    title: `Frequently Asked Questions | ${brand.name}`,
    url: `${brand.domain}/faq`,
  },
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * /faq — every question, where the homepage section carries six.
 *
 * GROUPED, which the homepage list is not. Fourteen hairline rows in one column
 * is a wall: there is no way to tell where the bottle questions stop and the
 * Puddle questions start, and the one thing a reader does on an FAQ page is
 * hunt. The four groups and their order live in content/brand.ts beside the
 * answers.
 *
 * ⚠️ THE GROUP NAMES ARE OURS. Every question and every answer is the client's
 * own copy, untouched — but "The bottles", "The Puddle" and so on are headings
 * we wrote, and headings are copy. They are navigation for a list the client
 * supplied flat, and they are four words each precisely so there is as little
 * of us on this page as possible. If they would rather name their own, it is
 * one array.
 *
 * FAQPage structured data goes out with it: this is the one page on the site
 * whose content maps exactly onto a schema.org type, and a rich result for
 * "is the ducks n puddles bottle safety tested" is worth more than the page.
 */
export default function FaqPage() {
  const groups = groupedFaqs()
  const all = publishedFaqs()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        /* Serialised with JSON.stringify, so every value is escaped; the only
           injection risk would be a literal "</script>" in an answer. */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.page}>
        <BrandDetail preset="paddle" opacity={0.09} />

        <div className="wrap">
          <header className={styles.masthead}>
            {/* ALL FOUR PARTS IN ONE COLUMN. The masthead is a two-column grid
                at width, so a heading left outside this wrapper became a grid
                item of its own and jumped into the ducks' column. */}
            <div className={styles.say}>
            <Sticker data-pop="">Questions</Sticker>
            <h1 className="d d-xl">Things parents ask us.</h1>
            <p className={`lead ${styles.lede}`}>
              Everything we get asked most &mdash; the bottles, the Puddle, keeping
              them clean, and how to get one. Still wondering something?{' '}
              <Link href="/contact">Send us a note</Link> &mdash; we&rsquo;re always
              happy to talk.
            </p>

            {/* The groups as chips. On a page this long it is the difference
                between reading and finding, and it costs one row. */}
            <nav className={styles.jump} aria-label="Jump to a section">
              {groups.map((g) => (
                <a key={g.group} href={`#${slug(g.group)}`} className={styles.chip}>
                  {g.group}
                  <span className={styles.chipCount}>{g.items.length}</span>
                </a>
              ))}
            </nav>
            </div>

            {/* The three of them standing in one puddle — the brand's own
                artwork, and the right piece for a page whose longest section is
                about the Puddle. It also fills a masthead that was a heading and
                one sentence against an empty right half. */}
            <Duck who="trio" pose="puddle" className={styles.crew} density="always" float />
          </header>

          {groups.map((g, i) => (
            <section key={g.group} id={slug(g.group)} className={styles.group}>
              <h2 className={`d ${styles.groupTitle}`}>{g.group}</h2>
              {/* A NAME PER GROUP. One shared name across all four would let a
                  question opened here close one three screens up.
                  Only the very first row ships open — fourteen closed rows give
                  no hint that they are rows rather than links. */}
              <FaqList items={g.items} name={`faq-${slug(g.group)}`} openFirst={i === 0} />
            </section>
          ))}

          <aside className={styles.card}>
            <Duck who="goosey" pose="wave" className={styles.cardDuck} float />
            <div className={styles.cardSay}>
              <p className={`d ${styles.cardTitle}`}>Didn&rsquo;t find it?</p>
              <p className={styles.cardBody}>
                We read everything that comes in, and we&rsquo;d rather you asked
                than wondered.
              </p>
            </div>
            <div className={styles.cardBtns}>
              <Btn href="/contact" colour="var(--sun-soft)">Ask us anything</Btn>
              <Btn href="/#squad" colour="var(--sky-soft)">Join the family</Btn>
            </div>
          </aside>
        </div>
      </div>

      {/* The blue band the footer's wave paints itself against — a page that
          ends on cream leaves a stripe across the seam.
          ONE LINE, AND NOT THE TAGLINE. It first carried "A Friend for Every
          Adventure" over a sentence about thoughtful products — which is, word
          for word, what the footer directly beneath it says. The rally cry is
          the parent-facing line and it is the right note to end an FAQ on:
          every answer above it is a reassurance. */}
      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>{brand.rallyCry}</h2>
        </div>
      </section>
    </>
  )
}
