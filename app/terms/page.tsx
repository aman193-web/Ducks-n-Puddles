import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'
import { brand } from '@/content/brand'
import { terms } from '@/content/legal'

export const metadata: Metadata = {
  title: terms.title,
  description:
    'The terms you agree to when you use the Ducks ’n Puddles website — our products, orders, intellectual property, and the Duck Squad.',
  alternates: { canonical: '/terms' },
  openGraph: { type: 'website', title: `${terms.title} | ${brand.name}`, url: `${brand.domain}/terms` },
}

/**
 * TERMS OF SERVICE — the client's own copy, supplied October 2026.
 *
 * The placeholder this replaces carried a "Draft — not yet reviewed" notice and
 * `robots: noindex`, because I had written it myself to describe the site as it
 * stood and it would have been dishonest to let invented terms rank. Both are
 * gone now for the same reason they were there: this is the client's document,
 * not mine, so it indexes.
 *
 * Every word lives in content/legal.ts, parsed from the document rather than
 * retyped. <LegalPage> is the shape.
 */
export default function TermsPage() {
  return <LegalPage doc={terms} />
}
