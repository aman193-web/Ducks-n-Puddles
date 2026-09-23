'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Picture } from '@/components/Picture'
import { asset } from '@/lib/assets'
import { prefersReduced } from '@/lib/motion'
import styles from './HeroDucks.module.css'

/**
 * Ducks leaning in from the walls of the pond.
 *
 * Three of them, one per character, each sliding out from behind a side wall,
 * holding, and sliding back. No change to the hero's layout, colour, type or
 * CTAs — this sits on top of the existing scene.
 *
 * WHY THE SWIMMER WENT. A duck crossing the pond had to pass behind the copy
 * column, and the copy ends exactly AT the waterline: anything tall enough to
 * break the surface there is also tall enough to reach the CTA row. Keeping it
 * clear meant sinking it into the dark water below the wave band, where it read
 * as something lost rather than something swimming. The wall ducks do not have
 * that problem — they sit at the edges, outside the text column entirely, so
 * they can rise above the waterline where they are actually visible.
 *
 * WHICH ART. The `-peeking` set, cut off at its left edge — drawn to come round
 * something, so a panel wall is exactly what it wants to be behind. All three
 * are mirrored in CSS, which puts that cut against the right wall.
 *
 * TIMING. Each has its own delay, and the cycle is long enough that no two are
 * out together: 2.2s out, 2.2s back, 9s waiting — a 13.4s round trip against
 * delays 5s apart. Sharing one wall, they would otherwise stack up.
 *
 * TRANSFORM DISCIPLINE. This hero runs four motion systems and its own module
 * comment insists each element belongs to exactly one. These belong to GSAP:
 * none carries `data-depth` (pointer parallax writes `translate`), `data-bob`,
 * or a CSS entrance.
 */
type Wall = {
  id: string
  /** how far the duck's feet sit ABOVE the waterline, in px */
  rise: number
  delay: number
}

/* All three from the RIGHT wall, stacked blue over pink over yellow, every one
   of them clear of the water. Order here is top to bottom.
   The right edge is the only column with room for this: the copy owns the left
   and the bottles sit inboard of it, so a 60px-wide duck at the frame's edge
   passes outside both. They also arrive one at a time — 4.4s out against a
   13.4s cycle, 5s apart — so the stack is never three ducks at once. */
const WALLS: Wall[] = [
  { id: 'vincey-peeking', rise: 250, delay: 2.5 },
  { id: 'chichi-peeking', rise: 130, delay: 7.5 },
  { id: 'goosey-peeking', rise: 34, delay: 12.5 },
]

export function HeroDucks() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReduced()) return

    const ctx = gsap.context(() => {
      const ducks = gsap.utils.toArray<HTMLElement>(`.${styles.wall}`)
      ducks.forEach((d) => {
        gsap.fromTo(
          d,
          { xPercent: 104 },
          {
            xPercent: 14,
            duration: 2.2,
            ease: 'power3.out',
            repeat: -1,
            repeatDelay: 9,
            yoyo: true,
            delay: Number(d.dataset.delay ?? 0),
          },
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.pond} ref={root} aria-hidden="true">
      {WALLS.map((w) => (
        <span
          key={w.id}
          className={styles.wall}
          data-delay={w.delay}
          style={{
            ['--rise' as string]: `${w.rise}px`,
            /* The box needs a real aspect ratio. `block-size: 100%` on the <img>
               resolves against the <picture> wrapper, whose height is auto, so
               the percentage collapses and the image sizes itself by WIDTH
               instead — measured, 120x295 inside a 152px box, overflowing it by
               143px. With a definite height AND ratio here the width is
               determined and the picture can simply fill it. Per duck from the
               manifest, because the three silhouettes differ slightly. */
            ['--peek-aspect' as string]: String(asset(w.id).aspect),
          } as React.CSSProperties}
        >
          <Picture id={w.id} sizes="120px" alt="" />
        </span>
      ))}
    </div>
  )
}
