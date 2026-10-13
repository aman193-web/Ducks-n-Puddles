import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Btn } from '@/components/ui/Btn'
import { Newsletter } from '@/components/sections/Newsletter'
import { categories, categoryBySlug, postsInCategory } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from '@/app/blog/BlogMasthead'
import { BlogBrowser } from '@/app/blog/BlogBrowser'
import styles from '@/app/blog/blog.module.css'

/* TOP LEVEL, at /category/<slug>, not under /blog.
 *
 * It lived at /blog/category/<slug> on the reasoning that blog things belong
 * inside the blog and a site-wide /category would be the wrong place to stand
 * if the shop ever needs product categories. The client asked for the
 * reference's shape instead, which is top level — and the old path redirects,
 * so nothing already pointing at it breaks.
 *
 * Every category gets a page at build time, including one that happens to be
 * empty — the chip in the filter row has to lead somewhere. */
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
    alternates: { canonical: `/category/${c.slug}` },
    openGraph: {
      type: 'website',
      title: `${c.label} | The Duck Pond | ${brand.name}`,
      url: `${brand.domain}/category/${c.slug}`,
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
      <div className={styles.page} data-blog-page="">
          <BlogBrowser
            posts={posts}
            active={category.slug}
            heading={category.label}
            blurb={category.blurb}
          >
            <BlogMasthead />
        </BlogBrowser>
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
          {/* The Newsletter band directly above, not the Duck Squad waitlist on
              the home page — the waitlist is the launch list for the bottles
              and this is the email. One capture per page, so this stays a
              button rather than a second copy of the form. */}
          <Btn href="#newsletter" colour="var(--sun-soft)">Join the Duck Squad</Btn>
        </div>
      </section>
    </>
  )
}
