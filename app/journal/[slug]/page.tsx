import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { posts, postBySlug, formatDate } from '@/content/journal'
import { brand } from '@/content/brand'
import styles from '../journal.module.css'

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
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      title: `${post.title} | ${brand.name}`,
      description: post.excerpt,
      url: `${brand.domain}/journal/${post.slug}`,
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
    <article className={styles.page}>
      <div className="wrap">
        <Link href="/journal" className={styles.back}>
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

        <aside className={styles.cta}>
          <p className="lead">
            We send one short email every couple of weeks, and the Duck Squad hears
            about the bottles before this site does.
          </p>
          <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
        </aside>

        {more.length > 0 && (
          <nav className={styles.more} aria-label="More notes">
            <h2 className={styles.moreTitle}>More from the pond</h2>
            <ul>
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/journal/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </article>
  )
}
