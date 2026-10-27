import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import type { Faq } from '@/content/brand'
import styles from './FaqList.module.css'

interface Props {
  items: readonly Faq[]
  /**
   * The `name` that groups these rows into one exclusive accordion. Rows sharing
   * a name close each other; rows with different names do not.
   *
   * ⚠️ IT MUST DIFFER PER GROUP ON /faq. With one name across all four groups,
   * opening a question under "The Puddle" silently closes the one you left open
   * under "The bottles" — three screens away, where you cannot see it happen.
   */
  name: string
  /** Open the first row, so the pattern explains itself without a click. */
  openFirst?: boolean
}

/**
 * THE FAQ ROWS — the homepage section and /faq render the same component.
 *
 * It was the homepage section's own markup until /faq existed. Copying it would
 * have meant two stylesheets describing one row, and the first of the two to be
 * touched would have been the last one anybody remembered to update.
 *
 * <details>/<summary> rather than a JS accordion: keyboard operable and
 * screen-reader correct for free, works with JS off, and ctrl/cmd-F finds text
 * inside a closed row in Chrome.
 */
export function FaqList({ items, name, openFirst }: Props) {
  return (
    <div className={styles.list}>
      {items.map((f, i) => (
        <details key={f.q} className={styles.row} name={name} open={openFirst && i === 0}>
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
  )
}
