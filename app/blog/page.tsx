import type { Metadata } from 'next'
import Link from 'next/link'
import { Picture } from '@/components/Picture'
import { posts, formatDate } from '@/content/journal'
import { brand } from '@/content/brand'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'The Duck Pond',
  description:
    'Notes from the kitchen table — what we are learning, what we are changing, and what is worth knowing before you buy any kid’s water bottle.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: `The Duck Pond | ${brand.name}`,
    url: `${brand.domain}/journal`,
  },
}

export default function JournalIndex() {
  const all = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className={styles.page}>
      <div className="wrap">
        <header className={styles.masthead}>
          <p className="mono">The duck pond</p>
          <h1 className="d d-xl">Notes from the kitchen table.</h1>
          <p className="lead measure">
            Two parents building a water bottle, writing down what they learn on the way.
          </p>
        </header>

        <ul className={styles.list}>
          {all.map((p) => (
            <li key={p.slug} className={styles.row}>
              <Link href={`/blog/${p.slug}`} className={styles.rowLink}>
                <span className={styles.rowFigure}>
                  <Picture id={p.image} sizes="(min-width: 780px) 34vw, 92vw" alt="" />
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.tag}>{p.tag}</span>
                  <h2 className={styles.rowTitle}>{p.title}</h2>
                  <span className={styles.excerpt}>{p.excerpt}</span>
                  <span className={styles.meta}>
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{p.readingMinutes} min read</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
