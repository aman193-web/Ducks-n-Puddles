import { BookOpenText, Package, UsersThree } from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { biggerPicture } from '@/content/brand'
import styles from './WhatsNext.module.css'

/**
 * THE BIGGER PICTURE — "the bottles are just the beginning".
 *
 * The client's brief for this section is to plant the idea that the ducks will
 * live through products, stories, books and experiences — a whole world rather
 * than a range. That argument is in the copy and it has not changed.
 *
 * What changed is the shape. Each direction had a full-size illustrated
 * character beside it in an alternating two-column row, and three of those ran
 * to most of a screen each: the section was the tallest on the page for the
 * least content. It is a three-across grid now, one icon per column, matching
 * the details section so the two read as the same kind of list.
 *
 * The icons are Phosphor at the same 44px in the same soft ink well Specs uses.
 * The characters have not gone from the site — they carry the Meet the Ducks
 * panels, the range cards and the footer, all of which have room for them.
 */
const ICONS = [BookOpenText, Package, UsersThree]

export function WhatsNext() {
  return (
    <section className={styles.section} id="next" aria-labelledby="next-title">
      <BrandDetail preset="paddle" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky-soft)" rot={-2} data-pop="" data-pop-rot="-2">The bigger picture</Sticker>
          <h2 id="next-title" className="d d-xl" data-anim="">
            The bottles are just the beginning.
          </h2>
          <p className="lead" data-anim="">
            Chi&nbsp;Chi, Goosey and Vincey are characters first. The bottle is simply where
            most people will meet them &mdash; the rest of their world is already being
            drawn.
          </p>
        </div>

        <ul className={styles.grid}>
          {biggerPicture.map((row, i) => {
            const Icon = ICONS[i] ?? BookOpenText
            return (
              <li key={row.title} className={styles.card} data-anim="" data-anim-y="30">
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={44} weight="regular" />
                </span>
                <h3 className={styles.title}>{row.title}</h3>
                <p className={styles.body}>{row.body}</p>
              </li>
            )
          })}
        </ul>

        <div className={styles.cta}>
          <Btn href="/#squad" colour="var(--sun-soft)">Be first to know</Btn>
        </div>
      </div>
    </section>
  )
}
