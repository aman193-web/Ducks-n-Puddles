import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { samples } from '@/content/brand'
import styles from './Samples.module.css'

/**
 * "From Sample to Shelf".
 *
 * The photographed bottles are physical prototypes — they carry a yellow ring
 * handle, no character name stickers, and an older sleeve mark. Rather than hide
 * that mismatch, this section owns it, which is also exactly the passion-project
 * proof the founder asked for. Every frame here is Tier C and every one is labelled.
 */
export function Samples() {
  return (
    <section className={styles.section} id="samples" aria-labelledby="samples-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun)" rot={-2} data-pop="" data-pop-rot="-2">From sample to shelf</Sticker>
          <h2 id="samples-title" className="d d-xl" data-anim="">
            These are the ones that didn&rsquo;t make it.
          </h2>
          <p className="lead" data-anim="">
            Every bottle below is a real sample from somewhere along the way. None of them
            is the finished product &mdash; the handle changed, the mark changed, the names
            weren&rsquo;t on them yet. We&rsquo;re showing them because this is what
            &ldquo;nearly ready&rdquo; actually looks like.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className={styles.rail}>
          {samples.map((s, i) => (
            <figure key={s.id + i} className={styles.card} data-anim="" data-anim-rot={i % 2 ? 2 : -2}>
              <span className={styles.media}>
                <span className="frame squircle" style={{ display: 'block' }}>
                  <Picture id={s.id} sizes="(min-width: 1060px) 16vw, 70vw" />
                </span>
                <Sticker className={styles.chip} colour="var(--goosey)" rot={i % 2 ? 4 : -5}>
                  Early sample
                </Sticker>
              </span>
              <span className={styles.label}>{s.label}</span>
              <figcaption className={styles.cap}>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
