import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Btn } from '@/components/ui/Btn'
import { categories, categoryBySlug, postsInCategory } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from '../../BlogMasthead'
import { PostCard } from '../../PostCard'
import styles from '../../blog.module.css'

/* Every category gets a page at build time, including one that happens to be
   empty — the chip in the filter row has to lead somewhere. */
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const c = categoryBySlug(slug)
  if (!c) return {}
  return {
    title: `${c.label} | The Duck Pond`,
    description: c.blurb,
    alternates: { canonical: `/blog/category/${c.slug}` },
    openGraph: {
      type: 'website',
      title: `${c.label} | The Duck Pond | ${brand.name}`,
      url: `${brand.domain}/blog/category/${c.slug}`,
    },
  }
}

/**
 * ONE CATEGORY.
 *
 * The same page as the index with the middle taken out: the shared masthead
 * and filter row, then the category's own name over a grid of its posts. No
 * featured article here — a featured slot singles one post out from a set, and
 * on a page that already is one set it just makes the first post bigger.
 *
 * The route sits under /blog rather than at a top-level /category, which is
 * where the reference puts it. Blog things stay inside the blog: a top-level
 * /category/… reads as a site-wide taxonomy and would be the wrong place to
 * stand if the shop ever needs product categories of its own.
 */
export default async function CategoryPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const category = categoryBySlug(slug)
  if (!category) notFound()

  const posts = postsInCategory(slug)

  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <BlogMasthead active={category.slug} />

          <section className={styles.band}>
            <header className={styles.bandHead}>
              <h2 className={styles.bandTitle}>{category.label}</h2>
              <p className={styles.bandCount}>
                {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              </p>
              <p className={styles.bandBlurb}>{category.blurb}</p>
            </header>

            {posts.length > 0 ? (
              <ul className={styles.grid}>
                {posts.map((p) => (
                  <li key={p.slug}>
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            ) : (
              /* A category can be empty — they are declared, not derived — and
                 an empty page still has to say something and offer a way on. */
              <p className={styles.empty}>
                Nothing in here yet. <Link href="/blog">Read everything else</Link> while
                we write one.
              </p>
            )}
          </section>
        </div>
      </div>

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
