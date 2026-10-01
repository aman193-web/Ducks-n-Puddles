import { FooterSignup } from '@/components/FooterSignup'
import styles from './Newsletter.module.css'

/**
 * The newsletter band, on the benchmark's pattern: one rounded colour panel
 * inset on the page, display heading left, copy and a pill input right.
 *
 * It sits directly above the footer and TAKES OVER the footer's signup column
 * rather than adding to it. Three email captures on one page (the Duck Squad
 * form, this, and a footer field) is two too many — the same list, asked for
 * three times, reads as nagging rather than as an offer.
 */
export function Newsletter() {
  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className="wrap">
        <div className={styles.panel}>
          <h2 id="newsletter-title" className={`d ${styles.title}`}>
            Join the Duck Squad!
          </h2>
          <div className={styles.right}>
            <p className={styles.blurb}>
              Come be part of the Ducks &rsquo;n Puddles world as it grows &mdash; with
              little notes from the pond, behind-the-scenes peeks, and first access to
              what&rsquo;s coming next.
            </p>
            <FooterSignup />
          </div>
        </div>
      </div>
    </section>
  )
}
