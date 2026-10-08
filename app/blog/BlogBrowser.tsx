'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CaretLeft, CaretRight, MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr'
import { categories, type Post } from '@/content/journal'
import { PostCard } from './PostCard'
import styles from './blog.module.css'

/**
 * THE SEARCH FIELD, THE FILTER ROW, AND WHATEVER THEY LEAVE.
 *
 * One component for both pages — /blog passes every post, a category page
 * passes its own — because the two have to behave identically. A search that
 * worked on the index and not inside a category, or a chip that moved by two
 * pixels between them, would read as two different pages rather than one with
 * a filter applied.
 *
 * THE SEARCH IS ENTIRELY CLIENT-SIDE, and at this size that is the right
 * answer rather than a shortcut: twelve posts are already in the page, so
 * filtering them is a string comparison and an endpoint would be a round trip
 * to learn something the browser already knows. The day a CMS brings hundreds,
 * this becomes a query and the component keeps its shape.
 *
 * THE FEATURED CARD DISAPPEARS WHILE SEARCHING. It is the newest post, not a
 * result — leaving it above a filtered list would put a card there that does
 * not match what was typed.
 */
export function BlogBrowser({
  posts,
  active,
  heading,
  blurb,
  featureFirst = false,
}: {
  posts: Post[]
  /** Slug of the category being shown, or undefined on /blog. */
  active?: string
  /** The heading over the default (unsearched) listing. */
  heading: string
  blurb?: string
  /** /blog leads with the newest post laid out wide; a category page does not. */
  featureFirst?: boolean
}) {
  /* Six, not the reference's nine. Twelve posts over nine is a full page and
     then a page of three; over six it is two pages that both look like pages.
     The number is the only thing to change when the backlog grows. */
  const PER_PAGE = 6

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!q) return posts
    /* Title, summary and category. Not the body: a hit three paragraphs into
       an article it does not otherwise look related to is a confusing result,
       and with no snippet to show there is nothing to explain it with. */
    return posts.filter((p) =>
      `${p.title} ${p.excerpt} ${p.tag}`.toLowerCase().includes(q),
    )
  }, [posts, q])

  const searching = q.length > 0
  const [first, ...rest] = results
  const listed = featureFirst && !searching ? rest : results

  const pages = Math.max(1, Math.ceil(listed.length / PER_PAGE))
  /* Clamped rather than reset, so a page number that stops existing — because
     the search narrowed the list — lands on the last real page instead of on
     an empty one. */
  const current = Math.min(page, pages)
  const grid = listed.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  /* Back to the first page whenever the list itself changes. Without this,
     typing a query while on page 2 shows the second six of three results. */
  const key = `${active ?? 'all'}:${q}`
  const lastKey = useRef(key)
  useEffect(() => {
    if (lastKey.current !== key) { lastKey.current = key; setPage(1) }
  }, [key])

  /* The top of the list, not the top of the document: paging should move you
     to the first new card, not back past the search field you just used. */
  const listTop = useRef<HTMLDivElement>(null)
  const goTo = (n: number) => {
    setPage(n)
    listTop.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return (
    <>
      <div className={styles.tools}>
        <div className={styles.search}>
          <MagnifyingGlass size={18} weight="bold" aria-hidden="true" className={styles.searchIcon} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search the pond…"
            aria-label="Search articles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {searching && (
            <button
              type="button"
              className={styles.searchClear}
              onClick={() => setQuery('')}
            >
              <span className="vh">Clear search</span>
              <X size={16} weight="bold" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* The chip for the page you are on links back to /blog: a pressed
            chip is a way out of the filter, not a dead link to where you
            already are. */}
        <nav className={styles.filters} aria-label="Categories">
          <Link href="/blog" className={styles.chip} aria-current={active ? undefined : 'page'}>
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
      </div>

      {/* The count is the live region, not the grid: a screen reader should
          hear "4 articles" once, rather than every card as it is filtered. */}
      {featureFirst && !searching && first && (
        <section className={styles.featuredBand} aria-label="Latest article">
          <PostCard post={first} featured />
        </section>
      )}

      <section className={styles.band} ref={listTop}>
        <header className={styles.bandHead}>
          <h2 className={styles.bandTitle}>
            {searching ? 'Results' : heading}
          </h2>
          <p className={styles.bandCount} role="status">
            {results.length} {results.length === 1 ? 'article' : 'articles'}
            {searching && <> for &ldquo;{query.trim()}&rdquo;</>}
            {pages > 1 && <> &middot; page {current} of {pages}</>}
          </p>
          {blurb && !searching && <p className={styles.bandBlurb}>{blurb}</p>}
        </header>

        {grid.length > 0 ? (
          <ul className={styles.grid}>
            {grid.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        ) : null}

        {/* ONE PAGE, NO PAGER. A disabled Previous beside a disabled Next is
            furniture that says the list is longer than it is. */}
        {pages > 1 && (
          <nav className={styles.pager} aria-label="Pagination">
            <button
              type="button" className={styles.pageArrow}
              onClick={() => goTo(current - 1)} disabled={current === 1}
            >
              <CaretLeft size={18} weight="bold" aria-hidden="true" />
              <span className="vh">Previous page</span>
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                key={n} type="button" className={styles.pageNum}
                onClick={() => goTo(n)}
                aria-current={n === current ? 'page' : undefined}
              >
                <span className="vh">Page </span>{n}
              </button>
            ))}

            <button
              type="button" className={styles.pageArrow}
              onClick={() => goTo(current + 1)} disabled={current === pages}
            >
              <CaretRight size={18} weight="bold" aria-hidden="true" />
              <span className="vh">Next page</span>
            </button>
          </nav>
        )}

        {grid.length === 0 && (
          <p className={styles.empty}>
            {searching ? (
              <>
                Nothing matches that.{' '}
                <button type="button" className={styles.linkish} onClick={() => setQuery('')}>
                  Clear the search
                </button>{' '}
                and have a look at everything.
              </>
            ) : (
              <>
                Nothing in here yet. <Link href="/blog">Read everything else</Link> while
                we write one.
              </>
            )}
          </p>
        )}
      </section>
    </>
  )
}
