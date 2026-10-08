import type { Metadata } from 'next'
import { Btn } from '@/components/ui/Btn'
import { postsNewestFirst } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from './BlogMasthead'
import { PostCard } from './PostCard'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'The Duck Pond',
  description:
    'Notes from the kitchen table — what we are learning, what we are changing, and what is worth knowing before you buy any kid’s water bottle.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: `The Duck Pond | ${brand.name}`,
    url: `${brand.domain}/blog`,
  },
}

/**
 * THE BLOG INDEX, on the layout the client sent as a reference:
 *
 *   masthead with a category filter row
 *   one featured article, picture beside copy
 *   the rest in a grid, under a heading that counts them
 *   the closing band
 *
 * TWO PARTS OF THAT REFERENCE ARE DELIBERATELY NOT HERE, and both come back
 * on the day there is a backlog to justify them:
 *
 *   A "TOP ARTICLES" ROW. The reference runs one between the featured article
 *   and the latest grid. It picks three from sixty-seven. We have three posts
 *   in total, so the row would be the same three articles the grid underneath
 *   it is already showing — the page would list every post twice and call the
 *   second pass a recommendation.
 *
 *   PAGINATION. Nine to a page across eight pages over there; three posts and
 *   no second page here.
 */
export default function JournalIndex() {
  const all = postsNewestFirst()
  const [featured, ...rest] = all

  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <BlogMasthead />

          {featured && (
            <section className={styles.featuredBand} aria-label="Latest article">
              <PostCard post={featured} featured />
            </section>
          )}

          {rest.length > 0 && (
            <section className={styles.band}>
              <header className={styles.bandHead}>
                <h2 className={styles.bandTitle}>More from the pond</h2>
                <p className={styles.bandCount}>
                  {rest.length} {rest.length === 1 ? 'article' : 'articles'}
                </p>
              </header>

              <ul className={styles.grid}>
                {rest.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* The page used to stop dead on the last row, straight into the footer's
          waterline — which is also why that wave had nothing to transition FROM.
          A closing band gives the wave its colour above and the index an ending. */}
      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>Get the next one by email.</h2>
          <p className={styles.closeBlurb}>
            One short note every couple of weeks. The Duck Squad hears about the
            bottles before this site does.
          </p>
          <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
        </div>
      </section>
    </>
  )
}
