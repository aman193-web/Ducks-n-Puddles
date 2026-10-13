import { CaretRight, Lightbulb } from '@phosphor-icons/react/dist/ssr'
import styles from './blog-extras.module.css'

/**
 * KEY TAKEAWAYS — the reference's box at the head of the article.
 *
 * ⚠️ IT RENDERS ONLY WHERE THERE ARE TAKEAWAYS TO SHOW, and the client's own
 * three posts have none. Four summary lines per article is editorial copy, and
 * the standing instruction is not to write any where the client has supplied
 * the text. The nine placeholder posts are mine, so they have them; the
 * client's three show nothing until they write four lines each.
 *
 * Absent rather than empty, deliberately — unlike the contents rail, which the
 * client asked to keep visible as a marker. A "Key Takeaways" heading over
 * nothing would read as a failure rather than as a gap.
 */
export function KeyTakeaways({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null

  return (
    <aside className={styles.takeaways} aria-labelledby="key-takeaways">
      <div className={styles.takeawaysHead}>
        <span className={styles.takeawaysIcon} aria-hidden="true">
          <Lightbulb size={20} weight="fill" />
        </span>
        <div>
          <p id="key-takeaways" className={styles.takeawaysTitle}>Key takeaways</p>
          <p className={styles.takeawaysCount}>
            {items.length} {items.length === 1 ? 'thing' : 'things'} worth knowing
          </p>
        </div>
      </div>
      <ul className={styles.takeawaysList}>
        {items.map((t) => (
          <li key={t}>
            <CaretRight size={14} weight="bold" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
