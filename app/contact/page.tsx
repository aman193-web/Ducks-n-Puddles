import type { Metadata } from 'next'
import Link from 'next/link'
import { Btn } from '@/components/ui/Btn'
import { brand } from '@/content/brand'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Questions, ideas, feedback — we’re all ears. Here’s how to reach the two people behind Ducks ’n Puddles.',
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', title: `Contact Us | ${brand.name}`, url: `${brand.domain}/contact` },
}

/**
 * CONTACT.
 *
 * NO FORM, on purpose. A contact form needs somewhere to post to, and the only
 * endpoint this site has is /api/subscribe, which is a mailing-list signup —
 * wiring a general enquiry into it would file support questions as newsletter
 * subscriptions. The brand's own email address is already in content/brand.ts
 * and is the honest answer until there is somewhere for a form to go.
 *
 * TODO(client): if you want a form here, say which inbox or helpdesk it should
 * reach and it is an afternoon's work — the provider abstraction in
 * lib/providers already has the shape for it.
 */
export default function ContactPage() {
  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <header className={styles.masthead}>
            <p className="mono">Say hello</p>
            <h1 className="d d-xl">Come talk to us.</h1>
            <p className={`lead ${styles.lede}`}>
              We&rsquo;d love to hear from you. Questions, ideas, feedback &mdash;
              we&rsquo;re all ears, and it reaches the two of us directly.
            </p>
          </header>

          <ul className={styles.ways}>
            <li className={styles.way}>
              <p className={styles.wayTitle}>Email</p>
              <p>
                The quickest way in. We read everything, and we answer as fast as two
                parents reasonably can.
              </p>
              <p><a href={`mailto:${brand.email}`}>{brand.email}</a></p>
            </li>

            <li className={styles.way}>
              <p className={styles.wayTitle}>Instagram</p>
              <p>
                Where the pictures live, and the fastest place to catch us for something
                short.
              </p>
              <p><a href={brand.instagram} rel="me noopener">@ducksnpuddles</a></p>
            </li>

            <li className={styles.way}>
              <p className={styles.wayTitle}>Already answered?</p>
              <p>
                Bottle sizes, cleaning, safety testing and when you can buy one are all
                in the FAQs.
              </p>
              <p><Link href="/#faq">Read the FAQs</Link></p>
            </li>
          </ul>

          <div className={styles.prose} style={{ marginBlockStart: 'var(--s-7)' }}>
            <section>
              <h2>Press and partnerships</h2>
              <p>
                Writing about us, stocking us, or working with us on something? Send it to{' '}
                <a href={`mailto:${brand.email}`}>{brand.email}</a> with a line about what
                you have in mind and it will reach the right person, because the right
                person is one of us.
              </p>
            </section>
          </div>
        </div>
      </div>

      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>Or just come into the pond.</h2>
          <p className={styles.closeBlurb}>
            Little notes from the pond, first looks at what&rsquo;s coming, and a chance to
            help shape what we create next.
          </p>
          <Btn href="/#squad" colour="var(--sun-soft)">Join the family</Btn>
        </div>
      </section>
    </>
  )
}
