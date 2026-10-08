import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Btn } from '@/components/ui/Btn'
import { Newsletter } from '@/components/sections/Newsletter'
import { categories, categoryBySlug, postsInCategory } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from '../../BlogMasthead'
import { BlogBrowser } from '../../BlogBrowser'
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
          <BlogMasthead />
          <BlogBrowser
            posts={posts}
            active={category.slug}
            heading={category.label}
            blurb={category.blurb}
          />
        </div>
      </div>

      {/* THE SIGNUP BAND, on its own paper ground exactly as the home page
          carries it — a yellow panel inset straight onto blue was the panel
          sitting IN the band rather than above it. */}
      <Newsletter />

      {/* AND THE BLUE BAND BACK UNDER IT. It is not only a send-off: the
          footer's wave paints the colour above it into its own box, and that
          colour is --vincey-soft site-wide, so a page that ends on paper
          leaves a blue stripe across the seam. */}
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
