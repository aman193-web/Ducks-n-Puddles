import Link from 'next/link'
import { Picture } from '@/components/Picture'
import { formatDate, type Post } from '@/content/journal'
import styles from './blog.module.css'

/**
 * ONE ARTICLE, IN THE TWO SHAPES THE LISTINGS USE.
 *
 * `featured` is the wide one at the top of /blog: two equal columns, picture
 * beside the copy. Everything else is the stacked card the grids are built
 * from — picture on top, then category, title, excerpt and the date and
 * reading time.
 *
 * Both are the SAME component on purpose. They carry the same parts in the
 * same order and differ only in how they are laid out, so a change to what a
 * card says cannot land on one listing and miss the other.
 */
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={featured ? styles.featured : styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
        <span className={styles.cardFigure}>
          <Picture
            id={post.image}
            /* The featured card is half the wrap; a grid card is a third of
               it. Below 780 both are the full column. */
            sizes={featured
              ? '(min-width: 780px) 46vw, 92vw'
              : '(min-width: 980px) 30vw, (min-width: 620px) 46vw, 92vw'}
            alt=""
          />
        </span>

        <span className={styles.cardBody}>
          <span className={styles.cardMetaTop}>
            {featured && <span className={styles.badge}>Latest</span>}
            <span className={styles.tag}>{post.tag}</span>
          </span>

          <h2 className={featured ? styles.featuredTitle : styles.cardTitle}>{post.title}</h2>
          <span className={styles.excerpt}>{post.excerpt}</span>

          <span className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min read</span>
          </span>
        </span>
      </Link>
    </article>
  )
}
