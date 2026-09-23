import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { posts, formatDate } from '@/content/journal'
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
          <Sticker colour="var(--sky-soft)" rot={2} data-pop="" data-pop-rot="2">The duck pond</Sticker>
          <h2 id="journal-title" className="d d-xl" data-anim="">Notes from the kitchen table.</h2>
          <p className="lead" data-anim="">
            What we are learning, what we are changing, and the odd thing worth knowing
            before you buy any bottle at all.
          </p>
        </div>

        <ul className={styles.grid}>
          {latest.map((p) => (
            <li key={p.slug} className={styles.card} data-anim="" data-anim-y="30">
              <Link href={`/blog/${p.slug}`} className={styles.link}>
                <span className={styles.figure}>
                  <Picture id={p.image} sizes="(min-width: 900px) 30vw, 88vw" alt="" />
                </span>
                <span className={styles.meta}>
                  <span className={styles.tag}>{p.tag}</span>
                  <span className={styles.date}>{p.readingMinutes} min read</span>
                </span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.excerpt}>{p.excerpt}</p>
                <span className={styles.more}>
                  Read it <ArrowRight size={18} weight="bold" aria-hidden="true" />
                </span>
              </Link>
              <p className={styles.published}>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </p>
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
