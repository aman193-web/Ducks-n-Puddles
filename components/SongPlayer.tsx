'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './SongPlayer.module.css'

interface Props {
  src: string
  /** The track's name, as the client titled the file — "Chi Chi Song". */
  title: string
  className?: string
}

const clock = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

/**
 * THE DUCK'S SONG — a compact player: play / pause, the track and the time.
 * One 52px pill, centred under the 360° bottle. No title and no volume on
 * screen (the client's call); the title is still the player's accessible name,
 * and the device's own volume does the rest.
 *
 * It starts on its own (see the autoplay effect below), so it preloads.
 *
 * DELIBERATELY SEPARATE FROM THE HEADER'S SOUND BUTTON (the client's call).
 * That button is for the ducks' quacks; this is a song someone chose to play,
 * and neither one touches the other.
 */
export function SongPlayer({ src, title, className }: Props) {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const root = useRef<HTMLDivElement>(null)
  const slot = useRef<HTMLDivElement>(null)
  const [floating, setFloating] = useState(false)
  const [returned, setReturned] = useState(false)
  useEffect(() => { if (floating) setReturned(true) }, [floating])

  /* FLOATS ONCE THE HERO IS PASSED. When its place in the hero has scrolled
     up out of view, the player pins itself bottom right, beside the
     back-to-top button, and goes back into place when the visitor scrolls up
     to it. The slot keeps its size the whole time, so nothing on the page
     moves when it leaves. */
  useEffect(() => {
    const el = slot.current
    if (!el) return
    /* A scroll check, not an IntersectionObserver: an observer only reports
       crossings, and a jump from below the screen to above it (a phone, where
       the player starts under the fold, scrolled fast) crosses nothing. */
    let raf = 0
    const check = () => { raf = 0; setFloating(el.getBoundingClientRect().bottom < 0) }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check) }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /* AUTOPLAY, on the client's instruction. Browsers refuse sound before the
     visitor has interacted with the site, so this tries at once — which
     succeeds when they arrived by clicking through from another page — and
     otherwise starts on their first press, tap or key anywhere on the page.
     A press ON the player is left alone, or the play button would start the
     song and then immediately pause it. */
  useEffect(() => {
    const a = audio.current
    if (!a) return
    /* The element is server-rendered with preload="auto", so it can load its
       metadata before React has attached onLoadedMetadata — that event is
       then gone, the duration stays 0, and the scrubber sits disabled at the
       start with nothing to seek through. Read what has already happened. */
    if (a.readyState >= 1 && Number.isFinite(a.duration)) setDuration(a.duration)
    setTime(a.currentTime)
    setPlaying(!a.paused)
    const events = ['pointerdown', 'keydown', 'touchstart'] as const
    const off = () => events.forEach((t) => window.removeEventListener(t, onGesture, true))
    const start = () => a.play().then(() => { off(); announce() })
    function onGesture(e: Event) {
      if (root.current?.contains(e.target as Node)) { off(); return }
      if (a!.paused) void start().catch(() => {})
    }
    start().catch(() => events.forEach((t) => window.addEventListener(t, onGesture, true)))
    return () => { off(); a.pause() }
  }, [])

  /* The lock screen and the OS media keys get the track's name. */
  const announce = () => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title, artist: 'Ducks ’n Puddles' })
    }
  }

  const toggle = async () => {
    const a = audio.current
    if (!a) return
    if (!a.paused) { a.pause(); return }
    try {
      await a.play()
      announce()
    } catch { /* decode failure or a blocked play — the button simply stays on Play */ }
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audio.current
    if (!a || !duration) return
    a.currentTime = Number(e.target.value)
    setTime(a.currentTime)
  }

  const pct = duration ? (time / duration) * 100 : 0

  const pill = (
    <div className={styles.player} data-floating={floating || undefined}
         data-returned={(!floating && returned) || undefined} role="group" aria-label={title} ref={root}>
      <button
        type="button"
        className={styles.play}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {playing
            ? <><rect x="6.5" y="5" width="4" height="14" rx="1.2" /><rect x="13.5" y="5" width="4" height="14" rx="1.2" /></>
            : <path d="M8 5.6v12.8c0 .8.9 1.3 1.6.8l9.6-6.4c.6-.4.6-1.2 0-1.6L9.6 4.8C8.9 4.3 8 4.8 8 5.6Z" />}
        </svg>
      </button>

      <input
        type="range"
        className={styles.seek}
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(time, duration || 0)}
        onChange={seek}
        disabled={!duration}
        aria-label={`${title}: position`}
        aria-valuetext={`${clock(time)} of ${clock(duration)}`}
        style={{ ['--pct' as string]: `${pct}%` } as React.CSSProperties}
      />
      <span className={styles.time} aria-hidden="true">{clock(time)}</span>
    </div>
  )

  /* The audio element stays in the slot whatever the pill does, so moving the
     pill never interrupts the song. While floating, the pill is portalled to
     <body>: the hero is its own stacking context (z-index 1), and a fixed
     element inside one cannot rise above anything painted after it — the
     footer's links were drawing straight through the player. */
  return (
    <div className={[styles.slot, className].filter(Boolean).join(' ')} ref={slot}>
      <audio
        ref={audio}
        src={src}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0) }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />
      {floating ? createPortal(pill, document.body) : pill}
    </div>
  )
}
