'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
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

  /* Re-run when the OS setting changes rather than only reading it at mount.
     Without this, turning "Reduce motion" off leaves the ducks frozen until the
     page is reloaded — which looks exactly like the feature being broken, and
     is the single most likely reason someone reports it as dead. */
  const [reduced, setReduced] = useState<boolean | null>(null)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const v = video.current
    const w = wrap.current
    if (!v || !w || reduced === null) return

    /* The straight-facing pose, and the resting state for everyone who does not
       get the interaction. Set as soon as the duration is known. */
    const park = () => {
      if (!Number.isFinite(v.duration) || v.duration === 0) return
      try { v.currentTime = v.duration / 2 } catch { /* seek not ready yet */ }
    }
    if (v.readyState >= 1) park()
    else v.addEventListener('loadedmetadata', park, { once: true })

    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    const ctx = gsap.context(() => {
      const state = { t: 0 }

      /* 0.45s, up from 0.32. Longer means each 60fps tick asks for a SMALLER
         step, and smaller steps are what the decoder can actually keep up
         with — the stutter at 0.32 was the tween outrunning the seeks, not the
         easing itself.

         There is deliberately NO `if (v.seeking) return` guard. It looks like
         the careful thing to do and it is the opposite: skipping every tick
         while a seek is in flight lets the tween run on, so the next accepted
         write lands a long way ahead. Measured over a full sweep, the guard
         produced a 0.667s worst-case jump between presented frames against
         0.25s when every tick writes — browsers already coalesce rapid
         currentTime writes, and the newest one wins. */
      const seek = gsap.quickTo(state, 't', {
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          if (v.readyState < 1) return
          /* A request landing inside the SAME frame of video would decode to
             the identical picture, so issuing it is pure cost. One frame at
             30fps is the floor; below it there is nothing to see. */
          if (Math.abs(v.currentTime - state.t) < 1 / 30) return
          v.currentTime = state.t
        },
      })
      /* Parallax on the container, a few pixels only, opposite the cursor.
         Slower than the head turn so it reads as depth rather than as a second
         thing moving. */
      const px = gsap.quickTo(w, 'x', { duration: 0.8, ease: 'power2.out' })
      const py = gsap.quickTo(w, 'y', { duration: 0.8, ease: 'power2.out' })

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
  }, [reduced])

  return (
    <div className={styles.stage} ref={wrap}>
      {/* Carries the edge mask. The headroom crop lives in the encode, not
          here — see the module. */}
      <div className={styles.frame}>
      <video
        ref={video}
        className={styles.video}
        src="/video/ducks-follow.1cbddaf3.mp4"
        muted
        playsInline
        preload="auto"
        /* Never plays: the timeline is a head-turn, driven by the pointer. */
        aria-hidden="true"
        tabIndex={-1}
      />
      </div>
    </div>
  )
}
