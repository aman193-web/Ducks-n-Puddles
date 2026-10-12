import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { posts } from '@/content/journal'
import { PostCard } from '@/app/blog/PostCard'
import styles from './Journal.module.css'

/**
 * The Duck Pond — three most recent posts.
 *
 * Every card links to a real page. A teaser whose "read more" goes nowhere is
 * worse than no blog at all, so the routes at /blog and /blog/[slug] ship with
 * this.
 *
 * Called "Journal" in the code and "Blog" to the reader: the client asked for
 * the visible name to change, and renaming the component, its stylesheet and
 * content/journal.ts would be a large diff that changes nothing anyone sees.
 */
export function Journal() {
  const latest = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <section className={styles.section} id="journal" aria-labelledby="journal-title">
      <BrandDetail preset="droplets" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--cream)" data-pop="">The duck pond</Sticker>
          <h2 id="journal-title" className="d d-xl" data-anim="">From Our Pond to Yours.</h2>
          <p className="lead" data-anim="">
            Stories, parenting thoughts, behind-the-scenes moments, and things we&rsquo;re
            learning along the way.
          </p>
        </div>

        {/* THE SAME CARD /blog USES, not a second design of one. The home
            page had its own — tag, title, one sentence, a "Read more" link —
            and the two drifted the moment the blog's gained a byline and tags.
            One component means they cannot drift again.

            ⚠️ This supersedes three earlier notes about THIS card specifically:
            the one-sentence preview, the "Read more" affordance, and taking the
            reading time off. The shared card carries the full summary, makes
            the whole card the link, and prints the date and reading time —
            because that is what the blog's card does and parity was the ask.
            Each is a prop away if any of them should come back. */}
        <ul className={styles.grid}>
          {latest.map((p) => (
            <li key={p.slug} data-anim="" data-anim-y="30">
              <PostCard post={p} />
            </li>
          ))}
        </ul>

        {/* Three of the posts are shown; /blog has all of them. */}
        <div className={styles.more_all} data-anim="">
          <Btn href="/blog" colour="var(--sky-soft)">Read the blog</Btn>
        </div>
      </div>
    </section>
  )
}
