import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { posts, postBySlug, formatDate } from '@/content/journal'
import { brand } from '@/content/brand'
import styles from '../blog.module.css'

/* Three known posts, so every one is prerendered at build time rather than
   rendered on demand. */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

/* `params` is a Promise in this version of Next — it has to be awaited in both
   the page and generateMetadata. */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} | ${brand.name}`,
      description: post.excerpt,
      url: `${brand.domain}/blog/${post.slug}`,
      publishedTime: post.date,
    },
  }
}

export default async function JournalPost(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
    <article className={styles.page}>
      <div className="wrap">
        {/* One centred measure for the whole article. Everything used to be
            left-aligned in the full wrap, which on a 1440 screen left a 64ch
            column of text against ~700px of empty cream — the page read as
            broken rather than as an article. */}
        <div className={styles.article}>
        <Link href="/blog" className={styles.back}>
          <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          All notes
        </Link>

        <header className={styles.postHead}>
          <span className={styles.tag}>{post.tag}</span>
          <h1 className="d d-lg">{post.title}</h1>
          <p className={styles.meta}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </header>

        <div className={styles.hero}>
          <Picture id={post.image} sizes="(min-width: 900px) 76vw, 94vw" alt="" priority />
        </div>

        <div className={styles.prose}>
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {more.length > 0 && (
          <nav className={styles.more} aria-label="More notes">
            <h2 className={styles.moreTitle}>More from the pond</h2>
            {/* Cards, not a bare list of underlined titles. The picture and the
                tag are what make someone read a second post. */}
            <ul className={styles.moreList}>
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={styles.moreCard}>
                    <span className={styles.moreFigure}>
                      <Picture id={p.image} sizes="(min-width: 700px) 22vw, 44vw" alt="" />
                    </span>
                    <span className={styles.moreBody}>
                      <span className={styles.moreTag}>{p.tag}</span>
                      <span className={styles.moreName}>{p.title}</span>
                      <span className={styles.meta}>{p.readingMinutes} min read</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        </div>
      </div>
    </article>

    {/* The one invitation on this page, and the colour the footer's wave needs
        above it. It used to be an inline box mid-article, which put a CTA
        between the reader and the further reading. */}
    <section className={styles.close}>
      <div className={`wrap ${styles.closeInner}`}>
        <h2 className={styles.closeTitle}>Get the next one by email.</h2>
        <p className={styles.closeBlurb}>
          We send one short note every couple of weeks, and the Duck Squad hears
          about the bottles before this site does.
        </p>
        <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
      </div>
    </section>
    </>
  )
}
