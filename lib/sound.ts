/**
 * Opt-in audio.
 *
 * The founder asked for the site to quack on arrival. We do not do that, for three
 * reasons worth being able to state out loud:
 *   1. It mostly would not play — Chrome and Safari block unmuted autoplay without a
 *      prior user gesture on the origin, so on most first visits it is silently discarded.
 *   2. When it does play it lands badly: a quiet office, a sleeping baby, headphones.
 *   3. WCAG 1.4.2 requires a mechanism to stop audio that plays automatically for
 *      more than three seconds.
 *
 * Instead: a persistent toggle, default OFF. Once a visitor turns it on, EVERY duck
 * on the site can talk. That turns one blocked sound into a talking website — and it
 * is measurable, which autoplay is not.
 *
 * CLICKING A DUCK is a separate path — `quack()` rather than `play()`.
 * Sound that a visitor asks for by clicking a thing is not autoplay: none of the
 * three reasons above applies to it, and WCAG 1.4.2 governs audio that starts on
 * its own, not audio a click starts. So a click plays unless the visitor has
 * EXPLICITLY silenced the site.
 *
 * That distinction needs three states, not two, which is why `isMuted()` reads
 * localStorage directly instead of consulting `enabled`: absent (never chosen,
 * so a click may speak), 'on' (everything speaks), 'off' (silence, including
 * clicks). Collapsing absent and 'off' would make every duck on a first visit
 * dead to the touch.
 */
const KEY = 'dnp.sound'
const SRC = '/media/audio/quack.mp3'

/* A duck does not quack once. The supplied clip is a single 0.31s quack with no
   trailing silence, so the pair has to be assembled here: play, wait, play. 130ms
   is the gap — short enough to read as one utterance, long enough not to sound
   like a stutter or a dropped buffer. */
const QUACKS = 2
const GAP_MS = 130

type Listener = (on: boolean) => void
const listeners = new Set<Listener>()
let enabled = false
let el: HTMLAudioElement | null = null
let remaining = 0
let sequenceActive = false
let gapTimer: number | undefined

export function initSound() {
  if (typeof window === 'undefined') return false
  try { enabled = window.localStorage.getItem(KEY) === 'on' } catch { enabled = false }
  return enabled
}

export function isSoundOn() { return enabled }

/** Explicitly silenced, as opposed to merely never switched on. */
export function isMuted() {
  if (typeof window === 'undefined') return true
  try { return window.localStorage.getItem(KEY) === 'off' } catch { return false }
}

export function setSound(on: boolean) {
  enabled = on
  try { window.localStorage.setItem(KEY, on ? 'on' : 'off') } catch { /* private mode */ }
  listeners.forEach((l) => l(on))
  // the toggle itself is the user gesture that unlocks audio
  if (on) void play()
  else stop()
}

export function subscribe(l: Listener) {
  listeners.add(l)
  return () => { listeners.delete(l) }
}

/**
 * One element, reused, with a single `ended` listener attached at creation —
 * re-attaching a fresh closure per call would leak a listener on every quack.
 * `remaining` is what the listener reads, so a second click mid-sequence simply
 * restarts the pair rather than stacking two of them.
 */
function element() {
  if (el) return el
  el = new Audio(SRC)
  el.preload = 'none'
  el.volume = 0.55
  el.addEventListener('ended', () => {
    /* `sequenceActive`, not `enabled`: a click-driven quack runs with the
       toggle still off, and gating the second half on `enabled` would clip
       every one of them to a single quack. */
    if (remaining <= 0 || !sequenceActive) return
    remaining -= 1
    gapTimer = window.setTimeout(() => {
      if (!el || !sequenceActive) return
      el.currentTime = 0
      void el.play().catch(() => {})
    }, GAP_MS)
  })
  return el
}

async function begin() {
  const a = element()
  window.clearTimeout(gapTimer)
  remaining = QUACKS - 1 // the call below is the first of the pair
  sequenceActive = true
  a.currentTime = 0
  await a.play()
}

/** Only fetched after opt-in — the file is never on the critical path. */
export async function play() {
  if (!enabled) return
  try { await begin() } catch { /* autoplay policy or decode failure — silent by design */ }
}

/**
 * A duck was clicked. Plays unless the visitor has explicitly silenced the site;
 * the click is itself the gesture that satisfies the autoplay policy, so this
 * does not need the toggle to have been turned on first.
 */
export async function quack() {
  if (isMuted()) return
  try { await begin() } catch { /* blocked or undecodable — silent by design */ }
}

/** Stops mid-pair — used when the toggle is switched off. */
export function stop() {
  remaining = 0
  sequenceActive = false
  window.clearTimeout(gapTimer)
  if (el) { el.pause(); el.currentTime = 0 }
}
