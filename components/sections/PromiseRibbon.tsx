import { Motif } from '@/components/Motif'
import styles from './PromiseRibbon.module.css'

/**
 * Only claims we can actually stand behind today. No certification badge, no
 * "10K+ happy families", no star rating — the store has never sold anything, and
 * unattributed social proof on a pre-launch children's brand reads as a lie.
 */
const PROOFS = [
  'Made by two parents',
  'Sized for small hands',
  'Bottle goes in the dishwasher',
  'Nothing sold until it is right',
]

export function PromiseRibbon() {
  return (
    <section className={styles.ribbon} data-depth="deep" aria-label="What we can promise today">
      <div className="container">
        <ul className={styles.row}>
          {PROOFS.map((p, i) => (
            <li key={p} className={styles.cell}>
              <span className={styles.item}>{p}</span>
              {i < PROOFS.length - 1 && (
                <span className={styles.sep} aria-hidden="true">
                  <Motif name="droplets" size={15} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
