import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { Duck } from '@/components/ui/Duck'
import { Motif } from '@/components/Motif'
import { foundation } from '@/content/brand'
import styles from './Foundation.module.css'

/**
 * THE FOUNDATION — the one section besides the hero that claims a whole screen.
 *
 * The client asked for this "even if it's just a small section for now"; the
 * brief was to make it prominent. Prominence on this page is a matter of how
 * much room a thing is given, not how loud it is set: full bleed, its own colour
 * world, a heading at hero scale.
 *
 * The first pass got one thing badly wrong — it never said the word
 * "Foundation" anywhere, so it read as a general brand-values block. The name
 * now leads, and the right half holds the three of them standing in one puddle,
 * which is the literal picture the headline describes. That image is the
 * argument; it was an empty column before.
 *
 * ⚠️ The copy is still INTENT ONLY. No partner, percentage, pledge or programme
 * — see the TODO(client) on `foundation` in content/brand.ts. A charitable claim
 * about children is a real-world claim, not something to fill in with a guess.
 */
export function Foundation() {
  return (
    <section className={styles.section} id="foundation" aria-labelledby="foundation-title">
      {/* Subtle brand elements, from the marks already printed on the bottles. */}
      <span className={styles.puddles} aria-hidden="true">
        <Motif name="droplets" /><Motif name="footprint" /><Motif name="droplets" />
      </span>

      <div className={`wrap ${styles.inner}`}>
        {/* The head spans BOTH columns. Inside the copy column the 144px headline
            broke over five lines (662px) and pushed the section past 1.6 screens;
            across the full width it lands in two. */}
        <div className={styles.head}>
          <Sticker colour="var(--paper)" rot={-2} data-pop="" data-pop-rot="-2">
            {foundation.eyebrow}
          </Sticker>
          <h2 id="foundation-title" className={`d d-mega ${styles.title}`} data-anim="">
            {foundation.title}
          </h2>
          <p className={`mono ${styles.name}`} data-anim="">{foundation.name}</p>
        </div>

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

        {/* Not decorative — this image IS the section's argument, so it carries a
            real alt and renders on a phone too. */}
        <div className={styles.art}>
          <Duck
            who="trio" pose="puddle"
            density="always"
            className={styles.trio}
            sizes="(min-width: 900px) 42vw, 86vw"
            alt="Chi Chi, Goosey and Vincey standing together in one puddle"
          />
        </div>
      </div>
    </section>
  )
}
