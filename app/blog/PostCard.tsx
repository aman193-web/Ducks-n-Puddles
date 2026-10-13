import Link from 'next/link'
import { Picture } from '@/components/Picture'
import { authorOf, defaultAuthor, formatDate, tagSlug, type Post } from '@/content/journal'
import styles from './blog.module.css'

/**
 * ONE ARTICLE, IN THE THREE SHAPES THE LISTINGS USE.
 *
 * `featured` is the wide one at the top of /blog: two columns, picture beside
 * the copy. `compact` is the Top Articles row — the same card with the summary
 * dropped, because three of them sit side by side under a card that already
 * carries one. Everything else is the stacked card the Latest grid is built
 * from.
 *
 * All three are the SAME component on purpose. They carry the same parts in the
 * same order and differ only in layout, so a change to what a card says cannot
 * land on one listing and miss the others.
 *
 * The parts, following the client's reference: thumbnail, a badge where the row
 * has one, category, title, summary, tags, and a footer with the author and the
 * publication details.
 */
export function PostCard({ post, featured = false, compact = false, badge }: {
  post: Post
  featured?: boolean
  compact?: boolean
  /** "Featured" / "Trending" — the row's own label, not the post's. */
  badge?: string
}) {
  const shape = featured ? styles.featured : compact ? styles.compactCard : styles.card

  return (
    <article className={shape}>
      <span className={styles.cardFigure}>
        <Picture
          id={post.image}
          /* The featured card is half the wrap; a grid card a third of it; a
             Top Articles card a third too. Below 780 all are a full column. */
          sizes={featured
            ? '(min-width: 780px) 46vw, 92vw'
            : '(min-width: 980px) 30vw, (min-width: 620px) 46vw, 92vw'}
          alt=""
        />
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardMetaTop}>
          {badge && <span className={styles.badge}>{badge}</span>}
          <span className={styles.tag}>{post.tag}</span>
        </span>

        {/* THE TITLE CARRIES THE LINK, and the link stretches over the whole
            card with a ::after overlay — the card had been one big <Link>, and
            the tags inside it are links now. An anchor inside an anchor is
            invalid, and the browser closes the outer one early, which breaks
            the card quietly. This is the pattern that keeps the whole card
            clickable without nesting anything. */}
        <h3 className={featured ? styles.featuredTitle : styles.cardTitle}>
          <Link href={`/blog/${post.slug}`} className={styles.cardLink}>{post.title}</Link>
        </h3>

        {!compact && <span className={styles.excerpt}>{post.excerpt}</span>}

        {/* LINKS NOW. They were flat text because there was nowhere to send
            them; /tag/<slug> exists, so they go there. Raised above the title's
            overlay so they are clickable in their own right. */}
        {post.tags && post.tags.length > 0 && (
          <span className={styles.tagRow}>
            {post.tags.map((t) => (
              <Link key={t} href={`/tag/${tagSlug(t)}`} className={styles.tagChip}>{t}</Link>
            ))}
          </span>
        )}

        <span className={styles.byline}>
          <span className={styles.avatar} aria-hidden="true">
            <Picture id={defaultAuthor.avatar} sizes="28px" alt="" />
          </span>
          <span className={styles.bylineName}>{authorOf(post)}</span>
          <span className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min read</span>
          </span>
        </span>
      </span>
    </article>
  )
}
