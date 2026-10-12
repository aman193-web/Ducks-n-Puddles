import type { Metadata } from 'next'
import { brand, contactTopics } from '@/content/brand'
import { ContactForm } from './ContactForm'
import styles from '../legal.module.css'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Have a question about Ducks ’n Puddles, our products, the Duck Squad, or what’s coming next? We’d love to hear from you.',
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', title: `Contact Us | ${brand.name}`, url: `${brand.domain}/contact` },
}

/**
 * CONTACT, on the client's own copy (supplied Oct 2026) and laid out to suit
 * it rather than the other way round.
 *
 * That copy is the reason this page changed shape. The placeholder it replaces
 * was three small cards; this is a welcome, an invitation, SEVEN subjects they
 * want to hear about, and a sign-off. So: a warm head, the form first because
 * the whole page is an invitation to write, and the seven subjects underneath
 * as a grid that doubles as the form's own topic list — one array in
 * content/brand.ts feeds both, so a card and an option can never disagree.
 *
 * ⚠️ TODO(client): the document gives the email address as
 * "[Add official support email]". Until that arrives this page shows
 * brand.email, which is still the personal Gmail that content/brand.ts has had
 * a TODO against since September.
 */
export default function ContactPage() {
  return (
    <>
      <div className={styles.page}>
        <div className="wrap">
          <header className={styles.masthead}>
            <p className="mono">Say hello</p>
            <h1 className="d d-xl">We&rsquo;d Love to Hear From You!</h1>
            <p className={`lead ${styles.lede}`}>
              Have a question about Ducks &rsquo;n Puddles, our products, the Duck Squad,
              or what&rsquo;s coming next? We&rsquo;d love to hear from you!
            </p>
            <p className={styles.sub}>
              At Ducks &rsquo;n Puddles, we believe that meaningful connections make
              everything a little more special. We&rsquo;re building more than a brand
              &mdash; we&rsquo;re growing a community, and we&rsquo;re so happy
              you&rsquo;re part of it.
            </p>
          </header>

          {/* THE FORM FIRST. The whole page is an invitation to write, so the
              thing you write in should not be below seven paragraphs about
              what you might write about. */}
          <section className={styles.band} aria-labelledby="get-in-touch">
            <h2 id="get-in-touch" className={styles.bandTitle}>Get in Touch</h2>
            <p className={styles.bandBlurb}>
              Whether you have a question, an idea to share, some feedback, or simply
              want to say hello, our inbox is always open. Send us a message, and
              we&rsquo;ll get back to you as soon as we can!
            </p>
            <ContactForm email={brand.email} />
          </section>

          <section className={styles.band} aria-labelledby="specific">
            <h2 id="specific" className={styles.bandTitle}>Looking for Something Specific?</h2>
            <ul className={styles.topics}>
              {contactTopics.map((t) => (
                <li key={t.key} className={styles.topic}>
                  <h3 className={styles.topicTitle}>{t.label}</h3>
                  <p>{t.body}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* THE SIGN-OFF, on the blue the footer's wave expects above it. The
          client's closing lines, which say the thing a "contact us" page
          usually says badly. */}
      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>We&rsquo;re So Happy You&rsquo;re Here.</h2>
          <p className={styles.closeBlurb}>
            Every message, idea, and connection is another little part of the
            Ducks &rsquo;n Puddles story. Thank you for being here, growing with us,
            and helping us bring this dream to life.
          </p>
          <p className={`d ${styles.closeTagline}`}>A Friend for Every Adventure.</p>
        </div>
      </section>
    </>
  )
}
