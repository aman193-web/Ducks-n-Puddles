import type { Metadata } from 'next'
import Link from 'next/link'
import { Btn } from '@/components/ui/Btn'
import { brand } from '@/content/brand'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms you agree to when you use the Ducks ’n Puddles website.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: true },
  openGraph: { type: 'website', title: `Terms of Service | ${brand.name}`, url: `${brand.domain}/terms` },
}

/**
 * TERMS OF SERVICE — PLACEHOLDER WORDING, at the client's request.
 *
 * Scoped to what the site currently is: a brochure with a mailing-list signup.
 * There is no store, no checkout, no account and no shipping, so there is
 * deliberately nothing in here about orders, refunds or returns — inventing
 * those terms before the shop exists would mean publishing promises about a
 * process nobody has designed yet.
 *
 * TODO(client): a lawyer before launch, and a full rewrite the day the store
 * opens. Sale of goods, returns, warranty and shipping all belong here then,
 * and "Shipping & Returns (when live)" is already waiting in the footer list.
 *
 * `robots: noindex` until reviewed, same reasoning as /privacy.
 */
export default function TermsPage() {
  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <header className={styles.masthead}>
            <p className="mono">Terms</p>
            <h1 className="d d-xl">The small print.</h1>
            <p className={`lead ${styles.lede}`}>
              What you agree to by using this site. There is nothing to buy here yet, so
              this is shorter than you are expecting.
            </p>
          </header>

          <div className={styles.draft}>
            <p className={styles.draftTitle}>Draft &mdash; not yet reviewed</p>
            <p>
              This is placeholder wording written to describe the site as it stands. It has
              not been reviewed by a lawyer and should not be relied on. It will need
              rewriting in full before the shop opens. (Delete this notice when a reviewed
              version goes in.)
            </p>
          </div>

          <div className={styles.prose}>
            <section>
              <h2>Using this site</h2>
              <p>
                You are welcome here. Please use the site for what it is for &mdash; reading
                about what we make, and joining the Duck Squad if you would like to. Please
                do not try to break it, scrape it, or use it to send anyone anything they did
                not ask for.
              </p>
            </section>

            <section>
              <h2>What is on it</h2>
              <p>
                We write everything here ourselves and we try hard to keep it accurate.
                Product details are described as they stand while we are still in samples,
                and some of them will change before anything ships. Nothing on this site is
                an offer to sell, because there is not yet anything to sell.
              </p>
            </section>

            <section>
              <h2>The Duck Squad</h2>
              <p>
                Joining the Duck Squad means we will email you occasionally. You can leave at
                any time from the link in any email we send. We do not charge for it and we
                do not promise a schedule &mdash; we write when there is something worth
                saying. How we handle your details is in our{' '}
                <Link href="/privacy">privacy policy</Link>.
              </p>
            </section>

            <section>
              <h2>Our characters and artwork</h2>
              <p>
                Chi&nbsp;Chi, Goosey and Vincey, the Ducks &rsquo;n Puddles name, and the
                illustrations, photographs and writing on this site belong to us. Please do
                not reuse them commercially without asking. If you want to write about us or
                share something, ask &mdash; the answer is usually yes.
              </p>
            </section>

            <section>
              <h2>Links out</h2>
              <p>
                We link to other places, including our Instagram and the Ducks &rsquo;n
                Puddles Foundation campaign. Those sites have their own terms and we are not
                responsible for what is on them.
              </p>
            </section>

            <section>
              <h2>Where we stand</h2>
              <p>
                We keep the site up and accurate as best we can, but we cannot promise it
                will always be available or always be free of mistakes. Nothing here is
                advice, medical or otherwise.
              </p>
            </section>

            <section>
              <h2>Changes</h2>
              <p>
                These terms will change &mdash; substantially, when the shop opens. The
                version on this page is the one that applies, and the date below says when it
                last moved.
              </p>
            </section>

            <section>
              <h2>Getting in touch</h2>
              <p>
                Anything here you want to ask about goes to{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a>, or through our{' '}
                <Link href="/contact">contact page</Link>.
              </p>
            </section>
          </div>

          <p className={styles.updated}>Last updated: placeholder &mdash; set this when the reviewed terms go in.</p>
        </div>
      </div>

      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>Anything else?</h2>
          <p className={styles.closeBlurb}>
            Send us an email &mdash; we&rsquo;re always happy to talk.
          </p>
          <Btn href="/contact" colour="var(--sun-soft)">Contact us</Btn>
        </div>
      </section>
    </>
  )
}
