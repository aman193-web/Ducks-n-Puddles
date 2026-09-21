import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { Motif } from '@/components/Motif'
import { foundation } from '@/content/brand'
import styles from './Foundation.module.css'

/**
 * THE FOUNDATION — the one section besides the hero that claims a whole screen.
 *
 * Designed against the two banner references the client sent. What those share,
 * and what this now does:
 *
 *   - the headline carries ONE word in an accent colour
 *     ("Give to CHARITY. Create Change." / "A FOUNDATION for The Future")
 *   - the art sits on an ORGANIC BLOB rather than floating as a bare cutout
 *   - small marks are scattered in the margins, not a flat field
 *   - a labelled chip names the thing, top-left
 *
 * The earlier pass got the substance right and the design wrong: it never said
 * the word "Foundation" and the art was a transparent PNG on a flat ground,
 * which is why it read as a values paragraph rather than as a banner.
 *
 * ⚠️ The copy is still INTENT ONLY. No partner, percentage, pledge or
 * programme — see the TODO(client) on `foundation` in content/brand.ts. A
 * charitable claim about children is a real-world claim, not a copy placeholder.
 */
export function Foundation() {
  return (
    <section className={styles.section} id="foundation" aria-labelledby="foundation-title">
      {/* Scattered brand marks, on the references' pattern: a few small shapes
          in the margins rather than one flat decorative field. */}
      <span className={styles.scatter} aria-hidden="true">
        <Motif name="droplets" /><Motif name="wave" /><Motif name="splash" />
        <Motif name="footprint" /><Motif name="droplets" />
      </span>

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          {/* The chip names the Foundation, which the first pass never did. */}
          <p className={styles.chip}>
            <span className={styles.chipMark} aria-hidden="true"><Motif name="duck" /></span>
            {foundation.name}
          </p>

          <h2 id="foundation-title" className={`d d-mega ${styles.title}`} data-anim="">
            {foundation.title.before}
            <em className={styles.accent}>{foundation.title.accent}</em>
            {foundation.title.after}
          </h2>

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

        {/* The art sits ON a blob, the way both references seat their photo in
            an organic shape. The blob is the ground; the characters keep their
            alpha and stand on it. Not decorative — this image IS the section's
            argument, so it carries a real alt and renders on a phone too. */}
        <div className={styles.art}>
          <span className={styles.blob} aria-hidden="true" />
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
