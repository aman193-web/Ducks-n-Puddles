import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'
import { brand } from '@/content/brand'
import { privacy } from '@/content/legal'

export const metadata: Metadata = {
  title: privacy.title,
  description:
    'What personal information Ducks ’n Puddles collects, how we use and protect it, when it may be shared, and the choices you have.',
  alternates: { canonical: '/privacy' },
  openGraph: { type: 'website', title: `${privacy.title} | ${brand.name}`, url: `${brand.domain}/privacy` },
}

/**
 * PRIVACY POLICY — the client's own copy, supplied October 2026.
 *
 * Replaces the placeholder I wrote, and with it the draft notice and the
 * `robots: noindex` that went with it. The two consent checkboxes on the site
 * (FooterSignup and Squad) link here, so this is now a real destination rather
 * than a holding page.
 *
 * Worth knowing: §7 Children's Privacy is the clause this brand lives or dies
 * on, and the client's wording is the right one — purchasing, registration and
 * contact are stated as adult-only, which is what the signup forms on this site
 * are built for.
 */
export default function PrivacyPage() {
  return <LegalPage doc={privacy} />
}
