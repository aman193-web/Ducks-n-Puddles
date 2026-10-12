import type { Metadata } from 'next'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { brand } from '@/content/brand'
import { ContactPanel } from './ContactPanel'
import styles from './contact.module.css'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Have a question about Ducks ’n Puddles, our products, the Duck Squad, or what’s coming next? We’d love to hear from you.',
  alternates: { canonical: '/contact' },
  openGraph: { type: 'website', title: `Contact Us | ${brand.name}`, url: `${brand.domain}/contact` },
}

/**
 * CONTACT, on the client's own copy and rebuilt to put the form beside the
 * welcome rather than under it.
 *
 * The previous version stacked: a welcome, then the form, then seven subject
 * cards, then a sign-off. Everything arrived in turn and nothing arrived
 * together — you had to scroll past a page of prose about writing to us before
 * reaching the thing you write in. Now the welcome holds the left column and
 * the form holds the right, so on any desktop screen the first view of this
 * page contains both the invitation and somewhere to accept it.
 *
 * The seven subjects stay, below, but they are buttons now: pressing one sets
 * the form's subject and sends you back to it. See ContactPanel.
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
        <BrandDetail preset="splashdown" opacity={0.1} />

        <div className="wrap">
          <ContactPanel email={brand.email} instagram={brand.instagram}>
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
            {/* The client's invitation. It sat in the form's own head until the
                card had to fit a screen without scrolling — three lines of
                welcome were the most expensive thing in the only column with a
                height budget, and it belongs with the welcome anyway. */}
            <p className={styles.sub}>
              Whether you have a question, an idea to share, some feedback, or simply
              want to say hello, our inbox is always open. Send us a message, and
              we&rsquo;ll get back to you as soon as we can!
            </p>
          </ContactPanel>
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
