import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { Motif } from '@/components/Motif'
import { foundation } from '@/content/brand'
import styles from './Foundation.module.css'

/**
 * THE FOUNDATION — the one section besides the hero that claims a whole screen.
 *
 * The client asked for this "even if it's just a small section for now"; the
 * brief here was to make it PROMINENT. The resolution is to give it presence
 * without giving it substance it does not have: full viewport, its own colour
 * world, a heading at hero scale, and copy that is honest about being intent.
 *
 * ⚠️ Nothing here names a partner, a percentage, a pledge or a programme. See the
 * TODO(client) on `foundation` in content/brand.ts — a charitable claim about
 * children is a real-world claim and is not something to fill in with a guess.
 *
 * Goosey's ground and Goosey's line, because "there's always room for one more
 * friend" IS the argument of the section. The empty half of the composition is
 * reserved for the three characters together in one puddle once the illustrated
 * poses land (Batch 4) — that is the picture this copy is describing.
 */
export function Foundation() {
  return (
    <section className={styles.section} id="foundation" aria-labelledby="foundation-title">
      {/* decorative puddle field — the subtle brand elements the client asked for,
          drawn from the existing motif set rather than new art */}
      <span className={styles.puddles} aria-hidden="true">
        <Motif name="droplets" /><Motif name="footprint" /><Motif name="droplets" />
      </span>

      <div className={`wrap ${styles.inner}`}>
        {/* The headline runs the FULL content width. Inside the 60% copy column it
            broke over five lines of 144px type and pushed the section to 1.6
            screens; across the full width it lands in two, which is what a
            statement at this scale is supposed to look like. */}
        <Sticker colour="var(--paper)" rot={-2} data-pop="" data-pop-rot="-2">
          {foundation.eyebrow}
        </Sticker>
        <h2 id="foundation-title" className={`d d-mega ${styles.title}`} data-anim="">
          {foundation.title}
        </h2>

        <div className={styles.copy}>
          {foundation.body.map((p) => (
            <p key={p.slice(0, 24)} className={`lead ${styles.body}`} data-anim="">{p}</p>
          ))}

          <figure className={styles.quote} data-anim="" data-anim-rot="-1">
            <blockquote className="hand">&ldquo;{foundation.quote}&rdquo;</blockquote>
            <figcaption className="eyebrow">&mdash; {foundation.quoteBy}</figcaption>
          </figure>

          <div className={styles.cta}>
            <Btn href="/#squad" colour="var(--paper)">Join the Duck Squad</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
