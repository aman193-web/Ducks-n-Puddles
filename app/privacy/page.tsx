import type { Metadata } from 'next'
import Link from 'next/link'
import { Btn } from '@/components/ui/Btn'
import { brand } from '@/content/brand'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Ducks ’n Puddles handles the information you share with us.',
  alternates: { canonical: '/privacy' },
  robots: { index: false, follow: true },
  openGraph: { type: 'website', title: `Privacy Policy | ${brand.name}`, url: `${brand.domain}/privacy` },
}

/**
 * PRIVACY POLICY — PLACEHOLDER WORDING, at the client's request.
 *
 * Every section below describes what this site ACTUALLY does today, which is
 * the useful half of a privacy policy and the half I can write honestly: one
 * email form, one mailing-list provider, no analytics, no advertising
 * cookies, no payments. What it is NOT is a reviewed legal document, and it
 * says so on the page rather than only in a comment.
 *
 * TODO(client): this needs a lawyer before launch, and specifically before any
 * of the following go live — a store, analytics, ad pixels, or anything that
 * collects a child's information. A children's brand in the US falls under
 * COPPA the moment a child can submit anything, and the signup forms here are
 * written for a PARENT to fill in. That distinction is the one to get right.
 *
 * `robots: noindex` until it is reviewed: a placeholder policy that ranks is
 * worse than one nobody can find.
 */
export default function PrivacyPage() {
  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <header className={styles.masthead}>
            <p className="mono">Privacy</p>
            <h1 className="d d-xl">What we do with your details.</h1>
            <p className={`lead ${styles.lede}`}>
              The short version: we ask for an email address so we can send you notes from
              the pond, and that is the only thing we collect.
            </p>
          </header>

          <div className={styles.draft}>
            <p className={styles.draftTitle}>Draft &mdash; not yet reviewed</p>
            <p>
              This is placeholder wording written to describe how the site works today. It
              has not been reviewed by a lawyer and should not be relied on. Please replace
              it with a reviewed policy before launch. (Delete this notice when you do.)
            </p>
          </div>

          <div className={styles.prose}>
            <section>
              <h2>What we collect</h2>
              <p>
                If you join the Duck Squad we store the email address you give us, the first
                name you give us if you choose to, and which duck you picked. Nothing else.
                We do not ask for an address, a phone number or a date of birth, and there is
                nothing on this site to buy yet, so we take no payment details at all.
              </p>
            </section>

            <section>
              <h2>Why we collect it</h2>
              <p>
                To send you the thing you asked for: occasional notes about what we are
                making, first looks at what is coming, and the launch when there is one. We
                send these ourselves. We do not sell, rent or trade your details, and we do
                not share them with anyone except the email provider that delivers the mail
                for us.
              </p>
            </section>

            <section>
              <h2>Children</h2>
              <p>
                Our products are made for little ones, but this website is written for the
                grown-ups who buy them. The signup forms are intended for adults, and we do
                not knowingly collect information from children. If you believe a child has
                given us their details, email us at{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a> and we will delete it.
              </p>
            </section>

            <section>
              <h2>Cookies and measurement</h2>
              <p>
                This site sets no advertising cookies and runs no third-party tracking. Your
                browser may store a small amount of information locally to remember things
                like whether you have muted the sound or asked for reduced motion; that
                stays on your own device and never reaches us.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                Until you ask us to stop. Every email we send has an unsubscribe link, one
                click, no questions. You can also write to us and ask us to delete your
                details entirely, and we will.
              </p>
            </section>

            <section>
              <h2>Your choices</h2>
              <ul>
                <li>Ask us what we hold about you.</li>
                <li>Ask us to correct it.</li>
                <li>Ask us to delete it.</li>
                <li>Unsubscribe at any time, from any email we send.</li>
              </ul>
              <p>
                All of these go to the same place:{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a>.
              </p>
            </section>

            <section>
              <h2>Changes</h2>
              <p>
                If this policy changes in a way that matters, we will say so here and update
                the date below. If it changes in a way that affects what we do with details
                we already hold, we will email you about it first.
              </p>
            </section>

            <section>
              <h2>Getting in touch</h2>
              <p>
                Questions about any of this go to{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a>, or through our{' '}
                <Link href="/contact">contact page</Link>.
              </p>
            </section>
          </div>

          <p className={styles.updated}>Last updated: placeholder &mdash; set this when the reviewed policy goes in.</p>
        </div>
      </div>

      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>Still wondering something?</h2>
          <p className={styles.closeBlurb}>
            Send us an email &mdash; we&rsquo;re always happy to talk.
          </p>
          <Btn href="/contact" colour="var(--sun-soft)">Contact us</Btn>
        </div>
      </section>
    </>
  )
}
