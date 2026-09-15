import { Sticker } from '@/components/ui/Sticker'
import { roadmap } from '@/content/brand'
import styles from './WhatsNext.module.css'

const FILLS = ['var(--sun)', 'var(--chichi)', 'var(--sky)', 'var(--goosey)', 'var(--orange)']

export function WhatsNext() {
  return (
    <section className={styles.section} id="next" aria-labelledby="next-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky)" rot={-2} data-pop="" data-pop-rot="-2">What&rsquo;s next</Sticker>
          <h2 id="next-title" className="d d-xl" data-anim="">
            We&rsquo;re building this in order, not all at once.
          </h2>
          <p className="lead" data-anim="">
            Nothing here has a date yet. When something does, the Duck Squad hears first.
          </p>
        </div>

        <ol className={styles.list}>
          {roadmap.map((r, i) => (
            <li key={r.title} className={styles.item} data-anim="" data-anim-y="40"
                style={{ ['--n-bg' as string]: FILLS[i % FILLS.length] } as React.CSSProperties}>
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
