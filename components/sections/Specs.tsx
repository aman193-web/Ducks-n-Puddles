import { Drop, SealCheck, ShieldCheck, Sparkle, Leaf, Hand, Baby, Heart }
  from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { confirmedSpecs } from '@/content/brand'
import styles from './Specs.module.css'

/**
 * The product section. Benefit-led, not status-led.
 *
 * This used to open with "the bottles are not finished, so we are not going to
 * make claims about them" and close with a count of unconfirmed rows. That
 * framing belongs in exactly two places — the hero and the waitlist — and
 * everywhere else it was talking a reader out of the product before they had
 * seen it.
 *
 * What has NOT changed: only rows marked `confirmed` render. Material,
 * dimensions and the "CDA certified" claim on the current live site (no such
 * standard exists; the intended claim is most likely CPSIA) are still withheld
 * rather than guessed at. Dropping the pre-launch tone does not mean inventing
 * a spec.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: 'light' | 'regular' }>> = {
  capacity: Drop,
  lid: SealCheck,
  spill: ShieldCheck,
  clean: Sparkle,
  bpa: Leaf,
  grip: Hand,
  age: Baby,
}

export function Specs() {
  return (
    <section className={styles.section} id="features" aria-labelledby="specs-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--cream)" rot={2} data-pop="" data-pop-rot="2">
            Built for small hands
          </Sticker>
          <h2 id="specs-title" className="d d-xl" data-anim="">
            Everything a parent checks, checked.
          </h2>
          <p className="lead" data-anim="">
            Nine ounces, a straw that snaps shut, and a bottle that goes straight in the
            dishwasher. The rest is a duck your kid will not put down.
          </p>
        </div>

        <dl className={styles.grid}>
          {confirmedSpecs.map((s) => {
            const Icon = ICONS[s.key] ?? Drop
            return (
              <div key={s.key} className={styles.card} data-anim="" data-anim-y="24">
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={44} weight="regular" />
                </span>
                <dt className={styles.key}>{s.label}</dt>
                <dd className={styles.value}>{s.value}</dd>
              </div>
            )
          })}

          <div className={`${styles.card} ${styles.open}`} data-anim="" data-anim-y="24">
            <span className={styles.icon} aria-hidden="true">
              <Heart size={44} weight="fill" />
            </span>
            <dt className={styles.key}>And the bit that matters</dt>
            <dd className={styles.value}>
              A bottle with a name on it gets carried. That is the whole idea.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
