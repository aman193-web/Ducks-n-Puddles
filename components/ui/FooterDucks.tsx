'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReduced } from '@/lib/motion'
import styles from './FooterDucks.module.css'

/**
 * Chi Chi, Goosey and Vincey at the foot of the page.
 *
 * IT PLAYS NOW. IT USED TO BE SCRUBBED, and the difference is the clip, not a
 * change of mind: the old video was authored as a single head-turn, frame 0
 * looking hard left and the last frame hard right, so pointer X mapped onto
 * `currentTime` and the heads followed the cursor. The clip supplied on 4 Oct
 * is an idle animation instead — the three of them look around, glance at each
 * other, and Chi Chi winks about two thirds through. Measured across all 144
 * frames, the motion is not monotonic on any axis, so dragging a cursor through
 * it would land on unrelated poses and read as jitter. Playing it is both what
 * the clip is for and the smoother of the two: 24fps of real playback against a
 * scrub that can only ever be as smooth as the seek rate.
 *
 * THE LOOP IS A PING-PONG, baked into the file rather than done here. The source
 * starts and ends in different poses — measured, the frame 143 -> 0 seam is
 * 13.3 mean channel difference against 1.0 for an ordinary frame step, and a
 * search over every start/end pair at least four seconds apart found nothing
 * better than 10.1. So the file is the clip followed by its own reverse, which
 * makes both ends identical by construction: the seam measures 1.02, which is
 * an ordinary frame step. 287 frames, 11.96s, and `loop` on the element is all
 * that is needed.
 *
 * WHAT IS LEFT OF THE INTERACTION: the parallax. A few pixels of counter-motion
 * on the container, opposite the pointer. It never touches the video timeline,
 * so it cost nothing to keep and it is the thing that makes the group feel
 * present rather than pasted on.
 *
 * MANNERS
 *  - paused whenever it is off screen. This is the last thing on a ~20-screen
 *    page, so for most of a visit it would otherwise be decoding into nothing.
 *  - under reduced motion it never plays and never binds a listener; the poster
 *    frame, where all three face forward, is what everyone else sees first.
 *  - aria-hidden and not focusable: it is the brand waving goodbye, not content.
 */
export function FooterDucks() {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    const w = wrap.current
    if (!v || !w) return

    const reduced = prefersReduced()

    /* Visibility gates PLAYBACK, not just the listener — a looping video in a
       footer nobody has scrolled to is pure battery. */
    let onScreen = false
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (reduced) return
        if (onScreen) v.play().catch(() => { /* autoplay refused; the poster stands in */ })
        else v.pause()
      },
      { rootMargin: '160px 0px' },
    )
    io.observe(w)

    if (reduced || !window.matchMedia('(pointer: fine)').matches) {
      return () => io.disconnect()
    }

    const ctx = gsap.context(() => {
      const px = gsap.quickTo(w, 'x', { duration: 0.7, ease: 'power2.out' })
      const py = gsap.quickTo(w, 'y', { duration: 0.7, ease: 'power2.out' })

      const onMove = (e: PointerEvent) => {
        if (!onScreen) return
        const nx = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1)
        const ny = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1)
        px((0.5 - nx) * 14)
        py((0.5 - ny) * 8)
      }
      const onLeave = () => { px(0); py(0) }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)

      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerleave', onLeave)
      }
    }, w)

    return () => {
      ctx.revert()
      io.disconnect()
    }
  }, [])

  return (
    <div className={styles.stage} ref={wrap}>
      <video
        ref={video}
        className={styles.video}
        poster="/video/ducks-idle-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* 1600 covers the 900 CSS px it renders at on a retina display; the
            800 is for phones, where the stage is about 390 wide and the big one
            would be four times the pixels for no visible gain. */}
        <source src="/video/ducks-idle-1600.mp4" type="video/mp4" media="(min-width: 700px)" />
        <source src="/video/ducks-idle-800.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
