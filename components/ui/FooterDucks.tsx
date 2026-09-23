'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReduced } from '@/lib/motion'
import styles from './FooterDucks.module.css'

/**
 * Chi Chi, Goosey and Vincey at the foot of the page, following the cursor.
 *
 * Replaces the row of three cropped bottle renders that used to close the
 * footer. The page now ends on the characters rather than on the product,
 * which is the whole argument the client has been making: this is a character
 * brand whose first product happens to be a bottle.
 *
 * HOW IT WORKS
 * The video never plays. Its timeline IS the head-turn: frame 0 has them
 * looking hard left and the last frame hard right, so pointer X maps straight
 * onto currentTime. GSAP interpolates toward the target rather than jumping,
 * which is what makes it read as heads turning instead of as scrubbing.
 *
 * FOUR THINGS THAT MATTER, in order of how easily they break:
 *
 *  1. Seeks are expensive. A naive `video.currentTime = x` on every pointermove
 *     queues a seek per event — far more than the decoder can retire, and the
 *     picture stalls. So the tween writes to a plain object and the write to
 *     currentTime is guarded twice: skip while a seek is already in flight, and
 *     skip deltas under a frame, which are invisible anyway.
 *
 *  2. `transform` is safe HERE but is not safe everywhere on this site. The
 *     hero owns `translate` for its pointer parallax, and reduced motion forces
 *     `transform: none` on [data-anim]/[data-pop]. This element carries neither
 *     attribute and is not inside the hero panel, so GSAP's x/y are free.
 *
 *  3. No listener at all unless the visitor has a fine pointer AND has not
 *     asked for less motion. Touch and reduced-motion users get the middle
 *     frame — the straight-facing pose — and nothing is bound.
 *
 *  4. The footer is the last thing on a ~20-screen page, so for most of a visit
 *     it is off screen. An IntersectionObserver gates the work; the listener
 *     stays attached (re-binding on scroll costs more than an early return) but
 *     does nothing while the footer is out of view.
 */
export function FooterDucks() {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    const w = wrap.current
    if (!v || !w) return

    /* The straight-facing pose, and the resting state for everyone who does not
       get the interaction. Set as soon as the duration is known. */
    const park = () => {
      if (!Number.isFinite(v.duration) || v.duration === 0) return
      try { v.currentTime = v.duration / 2 } catch { /* seek not ready yet */ }
    }
    if (v.readyState >= 1) park()
    else v.addEventListener('loadedmetadata', park, { once: true })

    if (prefersReduced() || !window.matchMedia('(pointer: fine)').matches) return

    const ctx = gsap.context(() => {
      const state = { t: 0 }

      const seek = gsap.quickTo(state, 't', {
        duration: 0.32,
        ease: 'power2.out',
        onUpdate: () => {
          if (v.readyState < 1 || v.seeking) return
          /* Under one frame at 60fps there is nothing to see, and the seek
             would cost more than it shows. */
          if (Math.abs(v.currentTime - state.t) < 1 / 60) return
          v.currentTime = state.t
        },
      })
      /* Parallax on the container, a few pixels only, opposite the cursor.
         Slower than the head turn so it reads as depth rather than as a second
         thing moving. */
      const px = gsap.quickTo(w, 'x', { duration: 0.7, ease: 'power2.out' })
      const py = gsap.quickTo(w, 'y', { duration: 0.7, ease: 'power2.out' })

      let onScreen = false
      const io = new IntersectionObserver(
        ([entry]) => { onScreen = entry.isIntersecting },
        { rootMargin: '160px 0px' },
      )
      io.observe(w)

      const onMove = (e: PointerEvent) => {
        if (!onScreen || !Number.isFinite(v.duration) || v.duration === 0) return
        const nx = Math.min(Math.max(e.clientX / window.innerWidth, 0), 1)
        const ny = Math.min(Math.max(e.clientY / window.innerHeight, 0), 1)
        seek(nx * v.duration)
        px((0.5 - nx) * 14)
        py((0.5 - ny) * 8)
      }

      /* Back to straight ahead when the pointer leaves the window, so the page
         is never left with the ducks staring off the edge. */
      const onLeave = () => {
        if (!Number.isFinite(v.duration)) return
        seek(v.duration / 2)
        px(0); py(0)
      }

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)

      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerleave', onLeave)
        io.disconnect()
      }
    }, w)

    return () => {
      ctx.revert()
      v.removeEventListener('loadedmetadata', park)
    }
  }, [])

  return (
    <div className={styles.stage} ref={wrap}>
      <video
        ref={video}
        className={styles.video}
        src="/video/ducks-follow.mp4"
        muted
        playsInline
        preload="auto"
        /* Never plays: the timeline is a head-turn, driven by the pointer. */
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}
