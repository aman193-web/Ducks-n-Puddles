import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { posts, postBySlug, formatDate, categoryOf, authorOf, defaultAuthor } from '@/content/journal'
import { brand } from '@/content/brand'
import { PostToc } from './PostToc'
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

/** A heading's anchor id. Lowercase, words joined by hyphens — the ids the
 *  contents rail links to and the ones that end up in a shared URL. */
const slugify = (h: string) =>
  h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default async function JournalPost(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = postBySlug(slug)
  if (!post) notFound()

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2)
  const cat = categoryOf(post)

  /* The contents rail is built from the headings in the body, so an article
     without them simply does not get one — no placeholder, no empty rail. */
  const toc = post.body
    .filter((b): b is { h: string } => typeof b !== 'string' && 'h' in b)
    .map((b) => ({ id: slugify(b.h), title: b.h }))

  return (
    <>
    <article className={styles.page}>
      <div className="wrap">
        {/* One centred measure for the whole article. Everything used to be
            left-aligned in the full wrap, which on a 1440 screen left a 64ch
            column of text against ~700px of empty cream — the page read as
            broken rather than as an article. */}
        <div className={styles.article}>
        {/* A BREADCRUMB, not a back link. The reference opens on the trail —
            Blog, category, this article — which says where you are as well as
            where you came from, and gives the category page a second door. */}
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <ol>
            <li><Link href="/blog"><ArrowLeft size={14} weight="bold" aria-hidden="true" />Blog</Link></li>
            {cat && <li><Link href={`/blog/category/${cat.slug}`}>{cat.label}</Link></li>}
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <header className={styles.postHead}>
          {cat
            ? <Link href={`/blog/category/${cat.slug}`} className={styles.tagLink}>{post.tag}</Link>
            : <span className={styles.tag}>{post.tag}</span>}
          <h1 className="d d-lg">{post.title}</h1>
          {/* The summary, as a standfirst. It was only ever on the cards and in
              the page metadata; the reference prints it under the title, which
              is the one place a reader decides whether to carry on. */}
          <p className={`lead ${styles.standfirst}`}>{post.excerpt}</p>

          <p className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true">
              <Picture id={defaultAuthor.avatar} sizes="32px" alt="" />
            </span>
            <span className={styles.bylineName}>{authorOf(post)}</span>
            <span className={styles.meta}>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingMinutes} min read</span>
            </span>
          </p>
        </header>

        <div className={styles.hero}>
          <Picture id={post.image} sizes="(min-width: 900px) 76vw, 94vw" alt="" priority />
        </div>

        {/* THE BODY, with the contents rail beside it on the LEFT and inside
            the article's own measure — the client's call, after a version that
            pushed it out into the right-hand margin. Rail first in the source
            as well as on screen: it is navigation for the article, and
            navigation before the thing it navigates is the order a screen
            reader wants anyway. One column below 1100px, where a 220px rail
            would take a third of the measure from the prose it serves. */}
        <div className={styles.postCols}>
          {/* THE RAIL carries what the client's reference puts there: a small
              standing offer above the contents, not only the contents. It
              renders whenever there is a wide enough screen — the contents half
              only appears when the article has headings to index, which the
              client's own posts do not (their bolded lines are emphasis, not
              sections), so on those three this is the card alone. */}
          <aside className={styles.postRail} aria-label="More from Ducks ’n Puddles">
            <div className={styles.railCta}>
              <p className={styles.railCtaTitle}>Notes from the pond</p>
              <p className={styles.railCtaBody}>
                One short email every couple of weeks. The Duck Squad hears about
                the bottles before this site does.
              </p>
              <Link href="/#squad" className={styles.railCtaLink}>
                Join the Duck Squad
                <ArrowRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            </div>

            {toc.length > 1 && (
              <>
                <p className={styles.railTitle}>On this page</p>
                <PostToc items={toc} />
              </>
            )}
          </aside>

          <div className={styles.prose}>
            {post.body.map((b, i) => {
              if (typeof b === 'string') return <p key={i}>{b}</p>
              /* The client's own bolded paragraphs. Emphasis, not headings —
                 see the note on Block in content/journal.ts. */
              if ('em' in b) return <p key={i} className={styles.proseEm}>{b.em}</p>
              return <h2 key={i} id={slugify(b.h)} className={styles.proseHead}>{b.h}</h2>
            })}

            {post.tags && post.tags.length > 0 && (
              <p className={styles.postTags}>
                {post.tags.map((t) => <span key={t} className={styles.tagChip}>{t}</span>)}
              </p>
            )}
          </div>
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
