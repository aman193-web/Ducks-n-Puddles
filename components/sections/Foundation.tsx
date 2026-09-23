import Link from 'next/link'
import { ArrowRight, Heart, UsersThree, HandHeart } from '@phosphor-icons/react/dist/ssr'
import { Motif } from '@/components/Motif'
import { Picture } from '@/components/Picture'
import { foundation } from '@/content/brand'
import styles from './Foundation.module.css'

/**
 * THE FOUNDATION — rebuilt to the client's reference.
 *
 * What the reference sets, and what this now does: a labelled chip naming the
 * Foundation, a two-line headline, one paragraph of intent, a small
 * "Our future focus" heading over three tiles, a plain note that the details
 * are not settled, and an underlined text link rather than a button. The art
 * stays on the right, seated on an organic blob.
 *
 * WHAT CHANGED FROM THE PREVIOUS PASS, so it is not re-added by accident:
 *   - the headline no longer picks one word out in an accent colour; the
 *     reference sets the whole thing in ink
 *   - Goosey's pull quote is gone, replaced by the three focus tiles. The line
 *     is kept in content/brand.ts because it is the sentence the whole idea
 *     came from, but it is not rendered here
 *   - the CTA is a link, not a button — a section that says its own details are
 *     coming soon should not present a button as if there were something to do
 *
 * ⚠️ The copy is INTENT ONLY, and the three tiles are DIRECTIONS rather than
 * commitments. No partner, percentage, pledge or launch date anywhere — see the
 * TODO(client) on `foundation` in content/brand.ts. A charitable claim about
 * children is a real-world claim, not a copy placeholder, and the note under the
 * tiles is what keeps the tiles honest.
 */
const ICONS = { children: Heart, families: UsersThree, community: HandHeart } as const

export function Foundation() {
  return (
    <section className={styles.section} id="foundation" aria-labelledby="foundation-title">
      {/* Scattered brand marks, a few small shapes in the margins rather than
          one flat decorative field. */}
      <span className={styles.scatter} aria-hidden="true">
        <Motif name="droplets" /><Motif name="waves" /><Motif name="splash" />
        <Motif name="footprints" /><Motif name="droplets" />
      </span>

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.chip}>
            <span className={styles.chipMark} aria-hidden="true"><Motif name="duck" /></span>
            {foundation.name}
          </p>

          <h2 id="foundation-title" className={`d ${styles.title}`} data-anim="">
            {foundation.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>

          <p className={`lead ${styles.body}`} data-anim="">{foundation.body}</p>

          <div className={styles.focus} data-anim="">
            <h3 className={`d ${styles.focusLabel}`}>{foundation.focusLabel}</h3>
            <ul className={styles.tiles}>
              {foundation.focus.map((f) => {
                const Icon = ICONS[f.key as keyof typeof ICONS] ?? Heart
                return (
                  <li key={f.key} className={styles.tile}>
                    <span className={styles.tileMark} aria-hidden="true">
                      <Icon size={30} weight="fill" />
                    </span>
                    <h4 className={styles.tileTitle}>{f.title}</h4>
                    <p className={styles.tileBody}>{f.body}</p>
                  </li>
                )
              })}
            </ul>
          </div>

          <p className={styles.note}>{foundation.note}</p>

          <Link href="/#next" className={styles.link}>
            {foundation.linkLabel}
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>

        {/* A PHOTOGRAPH, not the characters. The illustrated trio is the brand
            talking about itself; a foundation section is about the children it
            is for, and a real photograph is the only thing that says so.

            Masked to the house organic shape rather than a rectangle, so it
            belongs to the same visual language as the Story photo.

            `tint={false}`: the pipeline sampled this image's dominant colour as
            #080808 — the other photographs on the site land around #a89888 —
            and a near-black placeholder flashing on a pale yellow section is
            worse than none. The mask has nothing behind it to hide anyway. */}
        <figure className={styles.art} data-anim="" data-anim-y="26">
          <Picture
            id="foundation-children"
            sizes="(min-width: 900px) 46vw, 92vw"
            className={styles.photo}
            tint={false}
          />
        </figure>
      </div>
    </section>
  )
}
