import { FooterSignup } from '@/components/FooterSignup'
import { personalization } from '@/content/brand'
import styles from './Newsletter.module.css'

/**
 * The newsletter band, on the benchmark's pattern: one rounded colour panel
 * inset on the page, display heading left, copy and a pill input right.
 *
 * It sits directly above the footer and TAKES OVER the footer's signup column
 * rather than adding to it. Three email captures on one page (the Duck Squad
 * form, this, and a footer field) is two too many — the same list, asked for
 * three times, reads as nagging rather than as an offer.
 *
 * THE PERSONALISATION VARIANT (on hold since Nov 2026, kept for launch) is
 * SECTION 7 OF THE CLIENT'S OCT 2026 BRIEF, verbatim: the coming
 * personalisation is used as the reason to join. Their instruction was to put
 * it on the EXISTING newsletter rather than a separate signup, so this band
 * carries it and tags the subscriber `interest:personalization` (see
 * INTERESTS); the Personalize section's button points here.
 */
/* THE PLAIN NEWSLETTER, the default since Nov 2026: personalisation is on
   hold, so the blog's band asks for the newsletter itself. Its words are the
   site's own — the article pages' sign-off says exactly this. */
const NEWSLETTER = {
  title: 'Get the next one by email.',
  body: 'We send one short note every couple of weeks, and the Duck Squad hears about the bottles before this site does.',
  button: 'Subscribe',
}

/**
 * `variant="personalization"` brings back the personalisation teaser below,
 * built and kept for its launch.
 */
export function Newsletter({ variant = 'newsletter' }: { variant?: 'newsletter' | 'personalization' }) {
  if (variant === 'newsletter') {
    return (
      <section id="newsletter" className={styles.section} aria-labelledby="newsletter-title">
        <div className="wrap">
          <div className={styles.panel}>
            <h2 id="newsletter-title" className={`d ${styles.title}`}>{NEWSLETTER.title}</h2>
            <div className={styles.right}>
              <p className={styles.blurb}>{NEWSLETTER.body}</p>
              <FooterSignup label={NEWSLETTER.button} showLabel />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="newsletter" className={styles.section} aria-labelledby="newsletter-title">
      <div className="wrap">
        <div className={styles.panel}>
          <h2 id="newsletter-title" className={`d ${styles.title}`}>
            {personalization.signup.title}
          </h2>
          <div className={styles.right}>
            <p className={styles.blurb}>{personalization.signup.body}</p>
            <p className={styles.blurb}>{personalization.signup.invite}</p>
            <FooterSignup
              label={personalization.signup.button}
              showLabel
              interest="personalization"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
