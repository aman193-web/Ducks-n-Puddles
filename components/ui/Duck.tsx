import { Picture } from '@/components/Picture'
import styles from './Duck.module.css'

/** Content slug -> asset stem. The ducks are `chi-chi` in content and `chichi`
 *  in the manifest; this is the same adapter Hero.tsx already carries. */
const STEM: Record<string, string> = {
  'chi-chi': 'chichi',
  chichi: 'chichi',
  goosey: 'goosey',
  vincey: 'vincey',
  trio: 'trio',
}

interface Props {
  who: 'chi-chi' | 'chichi' | 'goosey' | 'vincey' | 'trio'
  /** The pose suffix — must match a registered id, e.g. `idle`, `wave`, `peek`. */
  pose: string
  /** Positioning and size live with the SECTION, not here: each section has its
   *  own grid and an anchor DSL would only fight it. */
  className?: string
  sizes?: string
  /** Omit for a decorative cameo. Pass it when the character is real content —
   *  alphaAssets carry no alt of their own, so omitting it yields aria-hidden. */
  alt?: string
  /** Gentle idle float. Deliberately CSS, not `data-bob`: bob() derives its
   *  amplitude and period from DOM index, so every extra bobbing element
   *  silently re-times all the others. */
  float?: boolean
  /** `desktop` (the default) removes the cameo below 900px. The client asked for
   *  mobile to feel as intentional as desktop, which means FEWER characters
   *  there, not the same ones squeezed in — so opting in to `always` is a
   *  decision per placement, not the default. */
  density?: 'always' | 'desktop'
  /** Mirror horizontally, for a character that needs to face the other way. */
  flip?: boolean
  /** Resting tilt, in degrees. Uses the `rotate` property, not `transform`:
   *  reduced motion sets `transform: none !important` and would erase it. */
  tilt?: number
}

/**
 * A character cameo.
 *
 * A component rather than one-off <Picture> calls, because that is the whole
 * difference between characters living in the site and PNGs placed on it: the
 * accessibility contract, the mobile density rule and the float are decided
 * once, here, and every placement inherits them. Adding a duck to a new section
 * is one line.
 *
 * Decorative by default — `aria-hidden` and `pointer-events: none` — so a cameo
 * can never intercept a click meant for the content it sits beside, and a screen
 * reader never has to hear about it.
 */
export function Duck({
  who, pose, className, sizes = '(min-width: 900px) 22vw, 44vw',
  alt, float = false, density = 'desktop', flip = false, tilt = 0,
}: Props) {
  const id = `${STEM[who] ?? who}-${pose}`
  const decorative = alt === undefined

  return (
    <span
      className={[styles.duck, float && styles.float, className].filter(Boolean).join(' ')}
      data-density={density}
      aria-hidden={decorative || undefined}
      style={{
        ...(flip ? { ['--duck-flip' as string]: '-1' } : {}),
        ...(tilt ? { rotate: `${tilt}deg` } : {}),
      } as React.CSSProperties}
    >
      <Picture id={id} sizes={sizes} alt={alt} />
    </span>
  )
}
