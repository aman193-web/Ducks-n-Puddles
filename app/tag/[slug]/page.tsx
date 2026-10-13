import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Btn } from '@/components/ui/Btn'
import { Newsletter } from '@/components/sections/Newsletter'
import { allTags, tagSlug, tagBySlug, postsWithTag } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from '@/app/blog/BlogMasthead'
import { BlogBrowser } from '@/app/blog/BlogBrowser'
import styles from '@/app/blog/blog.module.css'

/* One page per tag actually in use. A tag nobody carries stops having a page,
   which is the whole difference between these and the categories — those are
   the client's fixed four and keep a page even when empty. */
export function generateStaticParams() {
  return allTags().map((t) => ({ slug: tagSlug(t) }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const tag = tagBySlug(slug)
  if (!tag) return {}
  return {
    title: tag,
    description: `Everything from the pond tagged “${tag}”.`,
    alternates: { canonical: `/tag/${slug}` },
    openGraph: {
      type: 'website',
      title: `${tag} | ${brand.name}`,
      url: `${brand.domain}/tag/${slug}`,
    },
  }
}

/**
 * ONE TAG, at /tag/<slug> — the shape the client asked for, alongside
 * /category/<slug>.
 *
 * The same page as a category listing with a different filter behind it. No
 * featured card and no Top row: both single out one post from a set, and on a
 * page that already IS one set they only make the first card bigger.
 *
 * `active` is set to a value no category chip can match, so the filter row
 * shows every category unpressed rather than marking "All" as the current
 * page — which would be a lie, since a tag is not "all".
 */
export default async function TagPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const tag = tagBySlug(slug)
  if (!tag) notFound()

  return (
    <>
      <div className={styles.page} data-blog-page="">
        <BlogBrowser
          posts={postsWithTag(slug)}
          active={`tag:${slug}`}
          heading={tag}
          blurb={`Everything from the pond tagged “${tag}”.`}
        >
          <BlogMasthead />
        </BlogBrowser>
      </div>

      <Newsletter />

      {/* The blue band the footer's wave paints itself against — a page that
          ends on paper leaves a stripe across the seam. */}
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
