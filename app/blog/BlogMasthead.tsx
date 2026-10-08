import Link from 'next/link'
import { categories } from '@/content/journal'
import styles from './blog.module.css'

/**
 * THE HEAD THE BLOG AND EVERY CATEGORY PAGE SHARE.
 *
 * One component rather than two copies, because the filter row has to be
 * identical on both — it is the navigation, and a chip that moves by two pixels
 * between pages reads as the page reloading rather than as a filter being
 * applied.
 *
 * `active` is the slug of the category being shown, or undefined on /blog.
 * The chip for the current page is marked `aria-current` and links back to
 * /blog, which is what the reference does: a pressed chip is a way out of the
 * filter, not a dead link to the page you are already on.
 */
export function BlogMasthead({ active }: { active?: string }) {
  return (
    <header className={styles.masthead}>
      <p className="mono">The duck pond</p>
      <h1 className="d d-xl">Notes from the kitchen table.</h1>
      <p className="lead measure">
        Two parents building a water bottle, writing down what they learn on the way.
      </p>

      {/* NO SEARCH BOX, and that is a decision rather than an omission: there
          are three posts. The row below finds any of them in one tap, and a
          search field over three results reads as a site pretending to be
          bigger than it is. It belongs here the day the CMS brings a backlog
          with it. */}
      <nav className={styles.filters} aria-label="Categories">
        <Link
          href="/blog"
          className={styles.chip}
          aria-current={active ? undefined : 'page'}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={active === c.slug ? '/blog' : `/blog/category/${c.slug}`}
            className={styles.chip}
            aria-current={active === c.slug ? 'page' : undefined}
          >
            {c.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
