'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReduced } from '@/lib/motion'
import styles from './FooterDucks.module.css'

/**
 * Chi Chi, Goosey and Vincey at the foot of the page, following the cursor.
 *
 * The video never plays. Its timeline IS the head-turn: pointer X maps straight
 * onto currentTime, and GSAP interpolates toward the target rather than jumping,
 * which is what makes it read as heads turning instead of as scrubbing.
 *
 * THE FILE IS TRIMMED TO THE PART THAT SWEEPS, and that is why this component is
 * simple. The supplied clip is six seconds that start facing forward, swing left,
 * come back through centre, swing right, and start returning — so only part of it
 * is a left-to-right sweep. Tracked the three beaks across all 144 frames: full
 * left lands on frame 44, full right on frame 130, and that window of 87 frames
 * has ZERO backward steps in it. The file served here is exactly those frames, so
 * pointer 0..1 maps onto 0..duration with no offsets to get wrong, and the whole
 * span is usable travel.
 *
 * ENCODED FOR SEEKING, measured rather than assumed. The obvious move is an
 * all-keyframe encode so no seek has to decode forward from a keyframe — I built
 * one and timed it against a normal GOP in the browser, 80 small cursor-sized
 * steps each. All-intra at 2485KB came out median 3.9ms / max 17.5ms; a six-frame
 * GOP at 1372KB came out median 4.0ms / max 5.1ms. The all-intra frames are big
 * enough that pulling them through the decoder costs more than the five frames it
 * saves decoding. So: g=6, and a third off the file size.
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
 *     it returns immediately when there is nothing to see.
 */
export function FooterDucks() {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    const w = wrap.current
    if (!v || !w) return

    /* THE RESTING POSE: straight ahead, for everyone who does not get the
       interaction — touch, reduced motion, and the moment before the first
       pointermove on a desktop.

       It RETRIES, and it has to. The old version attempted one seek on
       `loadedmetadata` inside a try/catch and gave up silently if the element
       was not ready. Measured on a phone, that left currentTime at 0 — and
       since the file is trimmed to the sweep, frame 0 is now the heads turned
       HARD LEFT, so every phone visitor got three ducks staring off the side of
       the page. Listening on the later readiness events as well costs nothing
       and the handler removes itself the moment the seek sticks. */
    /* ONE TARGET, shared by the park and the tween. `state.t` is the only thing
       that says where the heads should be; everything either writes it or
       chases it. It starts unset rather than at 0, because 0 is now a real
       pose — the file is trimmed to the sweep, so frame 0 is the heads turned
       hard left. A zero default meant the `seeked` handler below kept dragging
       the parked pose back to it, and every visitor who had not yet moved a
       mouse got three ducks staring off the side of the page. */
    const state = { t: Number.NaN }

    const apply = () => {
      if (!Number.isFinite(state.t) || v.readyState < 1 || v.seeking) return
      /* Under half a frame of the source there is nothing new to show, and the
         seek would cost more than it reveals. The clip is 24fps. */
      if (Math.abs(v.currentTime - state.t) < 1 / 48) return
      v.currentTime = state.t
    }

    /* THE RESTING POSE: straight ahead, for everyone who does not get the
       interaction — touch, reduced motion, and the moment before the first
       pointermove on a desktop.

       It RETRIES, and it has to. One attempt on `loadedmetadata` inside a
       try/catch gives up silently when the element is not seekable yet, which
       on a phone left the pose at frame 0. Listening on the later readiness
       events costs nothing and the handler removes itself once it sticks. */
    const PARK_EVENTS = ['loadedmetadata', 'loadeddata', 'canplay'] as const
    const park = () => {
      if (!Number.isFinite(v.duration) || v.duration === 0) return
      if (!Number.isFinite(state.t)) state.t = v.duration / 2
      apply()
      if (Math.abs(v.currentTime - state.t) < 1 / 48) {
        PARK_EVENTS.forEach((e) => v.removeEventListener(e, park))
      }
    }
    PARK_EVENTS.forEach((e) => v.addEventListener(e, park))
    v.addEventListener('seeked', apply)
    park()

    const detach = () => {
      PARK_EVENTS.forEach((e) => v.removeEventListener(e, park))
      v.removeEventListener('seeked', apply)
    }

    if (prefersReduced() || !window.matchMedia('(pointer: fine)').matches) return detach

    const ctx = gsap.context(() => {
      /* THE TARGET IS APPLIED FROM TWO PLACES, and it has to be.
         `onUpdate` drops its write whenever a seek is already in flight — which
         is correct, queueing seeks faster than the decoder retires them is what
         makes the picture stall. But the LAST update of a tween is dropped by
         the same rule, and nothing came along afterwards to apply it. Measured:
         driving the cursor across the footer left currentTime at 0.47s where the
         target was 1.45s, and it never caught up — the heads simply stopped
         somewhere wrong. (This is almost certainly the "animation not working"
         reported in September, which never reproduced by hand because a slow
         human mouse rarely finishes a tween mid-seek.)
         So `seeked` re-checks the target and goes again if it has drifted — see
         `apply` above. The loop ends on its own: each pass lands within half a
         frame or stops. */
      const seek = gsap.quickTo(state, 't', {
        duration: 0.32,
        ease: 'power2.out',
        onUpdate: apply,
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
      detach()
    }
  }, [])

  return (
    <div className={styles.stage} ref={wrap}>
      <video
        ref={video}
        className={styles.video}
        poster="/video/ducks-follow-poster.jpg"
        muted
        playsInline
        preload="auto"
        /* Never plays: the timeline is a head-turn, driven by the pointer. */
        aria-hidden="true"
        tabIndex={-1}
      >
        {/* 1600 covers the 900 CSS px it renders at on a retina display; the 800
            is for phones, where the stage is about 390 wide — and where nothing
            is scrubbing it anyway, so it only has to look right parked. */}
        <source src="/video/ducks-follow-1600.mp4" type="video/mp4" media="(min-width: 700px)" />
        <source src="/video/ducks-follow-800.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
