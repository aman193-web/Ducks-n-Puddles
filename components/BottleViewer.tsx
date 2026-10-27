'use client'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { initGsap, prefersReduced, EASE } from '@/lib/motion'
import styles from './BottleViewer.module.css'

interface Props {
  /** The two renders, already built as <Picture> on the server — passed in as
   *  nodes so this component owns only the toggle, not the image pipeline. */
  front: React.ReactNode
  back: React.ReactNode
  name: string
  className?: string
}

type Face = 'front' | 'back'

/**
 * TURN IT AROUND.
 *
 * Every bottle's back carries something its front does not: all three ducks
 * and "A Friend for Every Adventure", printed on the Puddle. Those renders sat
 * in media/brand/products from the 28 Sep delivery and were never used.
 *
 * THE BOTTLE ACTUALLY TURNS. It rotates edge-on, the faces swap while it is a
 * sliver nobody can see, and it swings back round on the site's own overshoot
 * curve (EASE.bounce, the house entrance) with a small lift at the halfway
 * point — so it reads as picking the bottle up and turning it in your hand.
 * Under reduced motion the swap is instant.
 *
 * BOTH IMAGES ARE IN THE DOM AT ONCE, stacked in one grid cell, and the toggle
 * only decides which is visible. So:
 *   - without JavaScript you get the front, which is the right default;
 *   - nothing loads on click, and the two renders share a 626 x 1404 canvas,
 *     so the swap cannot shift layout;
 *   - the hidden face is `inert` and aria-hidden, so a screen reader hears the
 *     view that is showing and not both.
 *
 * The control is a pair of real buttons with aria-pressed, rather than a
 * click-the-picture gesture, because nobody would think to click a product
 * photo to turn it round and nothing on a touch screen would tell them to.
 */
export function BottleViewer({ front, back, name, className }: Props) {
  const [view, setView] = useState<Face>('front')
  const stage = useRef<HTMLDivElement>(null)
  const turning = useRef(false)

  const turnTo = (next: Face) => {
    if (next === view || turning.current) return
    const el = stage.current
    if (!el || prefersReduced()) { setView(next); return }

    initGsap()
    turning.current = true
    /* Turning to the back spins one way and back to the front the other, so
       the gesture always reads as turning it OVER rather than as a loop. */
    const dir = next === 'back' ? 1 : -1
    gsap.timeline({
      onComplete: () => {
        turning.current = false
        /* Hand the transform back — nothing else on this element owns it, and
           a leftover inline matrix is how the card tilt broke elsewhere. */
        gsap.set(el, { clearProps: 'transform' })
      },
    })
      .to(el, { rotationY: 90 * dir, y: -12, duration: 0.24, ease: 'power2.in' })
      .add(() => setView(next))
      .set(el, { rotationY: -90 * dir })
      .to(el, { rotationY: 0, y: 0, duration: 0.62, ease: EASE.bounce })
  }

  return (
    <div className={[styles.viewer, className].filter(Boolean).join(' ')} data-view={view}>
      <div className={styles.stage} ref={stage}>
        <div className={styles.face} data-face="front" inert={view !== 'front'} aria-hidden={view !== 'front'}>
          {front}
        </div>
        <div className={styles.face} data-face="back" inert={view !== 'back'} aria-hidden={view !== 'back'}>
          {back}
        </div>
      </div>

      <div className={styles.toggle} role="group" aria-label={`View the ${name} bottle`}>
        {(['front', 'back'] as const).map((v) => (
          <button
            key={v}
            type="button"
            className={styles.btn}
            aria-pressed={view === v}
            onClick={() => turnTo(v)}
          >
            {v === 'front' ? 'Front' : 'Back'}
          </button>
        ))}
      </div>
    </div>
  )
}
