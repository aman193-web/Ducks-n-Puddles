import type { Metadata } from 'next'
import { Newsletter } from '@/components/sections/Newsletter'
import { postsNewestFirst } from '@/content/journal'
import { brand } from '@/content/brand'
import { BlogMasthead } from './BlogMasthead'
import { BlogBrowser } from './BlogBrowser'
import styles from './blog.module.css'

export const metadata: Metadata = {
  title: 'The Duck Pond',
  description:
    'Notes from the kitchen table — what we are learning, what we are changing, and what is worth knowing before you buy any kid’s water bottle.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: `The Duck Pond | ${brand.name}`,
    url: `${brand.domain}/blog`,
  },
}

/**
 * THE BLOG INDEX, on the layout the client sent as a reference:
 *
 *   masthead with a category filter row
 *   one featured article, picture beside copy
 *   the rest in a grid, under a heading that counts them
 *   the closing band
 *
 * ONE PART OF THAT REFERENCE IS STILL NOT HERE: the "Top Articles" row it runs
 * between the featured article and the grid. It picks three from sixty-seven;
 * picking three from twelve would still be a quarter of the page repeated —
 * and there is no measure of "top" to pick them by, because there is no
 * analytics on this site. It belongs here when there is both a backlog and a
 * number to sort it on.
 *
 * Pagination likewise: nine to a page across eight pages over there, twelve
 * posts and one page here.
 */
export default function JournalIndex() {
  const all = postsNewestFirst()

  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <BlogMasthead />
          <BlogBrowser posts={all} heading="More from the pond" featureFirst />
        </div>
      </div>

      {/* The page used to stop dead on the last row, straight into the footer's
          waterline — which is also why that wave had nothing to transition FROM.
          A closing band gives the wave its colour above and the index an ending. */}
      {/* THE SAME BAND THE HOME PAGE ENDS ITS PITCH ON, rather than this
          page's own heading-and-a-button. One signup, one wording, one place
          to change it — and it asks for the address here instead of sending
          someone to the home page to be asked there.

          On --vincey-soft because the blog ENDS on it: the footer's wave
          paints the colour above it into its own box, and that colour is blue
          site-wide. */}
      <Newsletter ground="var(--vincey-soft)" />
    </>
  )
}
