import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { faqs, brand } from '@/content/brand'
import styles from './Faq.module.css'

/**
 * FAQs, on the benchmark's pattern: a stack of hairline-separated rows, the
 * question on the left, a coloured square affordance on the right, the answer
 * revealed underneath.
 *
 * Built on <details>/<summary> rather than a JS accordion. It is keyboard
 * operable and screen-reader correct for free, it works with JS off, and
 * ctrl/cmd-F finds text inside a closed row in Chrome. The first one ships open,
 * as theirs does, so the pattern explains itself.
 */
export function Faq() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun-soft)" rot={-2} data-pop="" data-pop-rot="-2">Questions</Sticker>
          <h2 id="faq-title" className="d d-xl" data-anim="">Things parents ask us.</h2>
          <p className="lead" data-anim="">
            If it is not here, email us &mdash; it goes straight to {brand.founders}.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((f, i) => (
            <details key={f.q} className={styles.row} name="faq" open={i === 0}>
              <summary className={styles.q}>
                <span>{f.q}</span>
                <span className={styles.mark} aria-hidden="true">
                  <ArrowUpRight size={20} weight="bold" />
                </span>
              </summary>
              <div className={styles.a}><p>{f.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
