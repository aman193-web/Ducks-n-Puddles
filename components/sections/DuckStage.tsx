'use client'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { ducks } from '@/content/brand'
import { play as playQuack } from '@/lib/sound'
import styles from './DuckStage.module.css'

const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)

/**
 * The founder's "clickable characters that introduce themselves", built so it
 * works without hover, without sound and without JavaScript: all three panels are
 * always in the DOM and every introduction is real text, not injected on click.
 */
export function DuckStage() {
  return (
    <section className={styles.section} id="ducks" aria-labelledby="ducks-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--chichi)" rot={2} data-pop="" data-pop-rot="2">The Duck Squad</Sticker>
          <h2 id="ducks-title" className="d d-xl" data-anim="">
            Three ducks. Three strong opinions.
          </h2>
          <p className="lead measure" data-anim="">
            They are named after our kids, and they behave like them.
          </p>
        </div>
      </div>

      <div className={styles.stack}>
        {ducks.map((d, i) => (
          <article
            key={d.slug}
            className={styles.panel}
            style={{ ['--duck' as string]: d.colour } as React.CSSProperties}
            aria-labelledby={`duck-${d.slug}`}
          >
            <span className={styles.index} aria-hidden="true">{i + 1}</span>
            <div className={`wrap ${styles.inner}`}>
              <div className={styles.text}>
                <Sticker colour="var(--cream)" rot={-2}>{d.motif === 'droplets' ? 'Splash' : d.motif === 'flower' ? 'Bloom' : 'Waddle'}</Sticker>
                <h3 id={`duck-${d.slug}`} className={`d d-mega ${styles.name}`}>{d.name}</h3>
                <p className={styles.personality}>{d.personality}</p>
                <p className={`hand ${styles.says}`}>&ldquo;{d.says}&rdquo;</p>
                <p className={styles.parents}>{d.forParents}</p>
                <span className={styles.quackBtn}>
                  <Btn colour="var(--cream)" arrow={false} onClick={() => void playQuack()}>
                    Hear {d.name} quack
                  </Btn>
                </span>
              </div>

              <div className={styles.figure}>
                <span className={styles.puddle} aria-hidden="true" />
                <Picture
                  id={assetFor(d.slug)}
                  sizes="(min-width: 880px) 30vw, 70vw"
                  alt={`The ${d.name} bottle`}
                  data-bob=""
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
