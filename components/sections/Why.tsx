import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { brand } from '@/content/brand'
import { BrandDetail } from '@/components/ui/BrandDetail'
import styles from './Why.module.css'

/**
 * WHY — the section the homepage was missing.
 *
 * The client's first note: "we would like the homepage to communicate the WHY
 * behind Ducks 'n Puddles sooner. We want people to immediately understand what
 * we stand for beyond the products." Their own sentence for it is brand.why, and
 * it runs as the section's headline verbatim.
 *
 * It also solves the "balance between the child + parent sides" note
 * STRUCTURALLY rather than in tone. Two columns, one per audience, side by side
 * and the same size, so neither can get lost:
 *
 *   for parents   — ease, thoughtful design, quality      (rallyCry lives here,
 *                                                          which is where the
 *                                                          client asked for it)
 *   for children  — safe, loved, brave, a friend to carry
 *
 * That the two sit level is the argument. It is why this is a section and not a
 * paragraph under the hero.
 */
const SIDES = [
  {
    k: 'parents',
    eyebrow: 'For parents',
    head: 'One less thing to worry about.',
    body:
      'Everything we make gets used by somebody small, all day, every day. So it is '
      + 'designed around how that actually goes — easy to carry, easy to clean, easy to '
      + 'hand over on a morning that is already running late.',
    foot: brand.rallyCry,
  },
  {
    k: 'children',
    eyebrow: 'For little ones',
    head: 'A friend who comes along.',
    body:
      'Chi Chi, Goosey and Vincey are not decoration. They are three little friends with '
      + 'personalities of their own, and the one your child picks becomes theirs — for the '
      + 'first day of school, the long car ride, and every puddle in between.',
    foot: 'Safe. Loved. Brave.',
  },
]

export function Why() {
  return (
    <section className={styles.section} id="why" aria-labelledby="why-title">
      <BrandDetail preset="shallows" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--goosey-soft)" rot={-2} data-pop="" data-pop-rot="-2">
            Why we make these
          </Sticker>
          <h2 id="why-title" className="d d-xl measure" data-anim="">
            {brand.why}
          </h2>
        </div>

        <div className={styles.split}>
          {SIDES.map((s) => (
            <article key={s.k} className={styles.side} data-anim="" data-anim-y="24">
              <p className={`eyebrow ${styles.eyebrow}`}>{s.eyebrow}</p>
              <h3 className="d d-md">{s.head}</h3>
              <p className={styles.body}>{s.body}</p>
              <p className={`hand ${styles.foot}`}>{s.foot}</p>
              {/* The parent side gets the calm one, the child side the brave
                  one. Two audiences, two characters, same size — which is the
                  section's whole argument made visible. */}
              <Duck who={s.k === 'parents' ? 'vincey' : 'chi-chi'}
                    pose={s.k === 'parents' ? 'idle' : 'wave'}
                    className={styles.cameo} float
                    sizes="(min-width: 820px) 10vw, 22vw" />
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <Btn href="/#ducks">Meet the ducks</Btn>
        </div>
      </div>
    </section>
  )
}
