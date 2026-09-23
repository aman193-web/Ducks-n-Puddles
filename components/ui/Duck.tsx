import { Picture } from '@/components/Picture'
import { Quacker } from '@/components/ui/Quacker'
import styles from './Duck.module.css'

/** Content slug -> asset stem. The ducks are `chi-chi` in content and `chichi`
 *  in the manifest; this is the same adapter Hero.tsx already carries. */
/** For the accessible name on a clickable character. */
const DISPLAY: Record<string, string> = {
  'chi-chi': 'Chi Chi', chichi: 'Chi Chi', goosey: 'Goosey', vincey: 'Vincey',
  trio: 'the ducks',
}

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
  /** Make the character clickable, and quack when it is. Opt-in per placement:
   *  a cameo tucked behind a bottle is not something anyone would think to
   *  press, and turning every duck on the page into a control would put a dozen
   *  extra tab stops in front of the actual form. */
  speak?: boolean
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
  alt, float = false, density = 'desktop', flip = false, tilt = 0, speak = false,
}: Props) {
  const id = `${STEM[who] ?? who}-${pose}`
  const decorative = alt === undefined

  const art = (
    <span
      /* When this is wrapped in a button, the POSITIONING class moves to the
         button — it is the element the section's grid places — and this keeps
         only the duck's own styles. */
      className={[styles.duck, float && styles.float, !speak && className].filter(Boolean).join(' ')}
      data-density={speak ? undefined : density}
      aria-hidden={decorative || undefined}
      style={{
        ...(flip ? { ['--duck-flip' as string]: '-1' } : {}),
        ...(tilt ? { rotate: `${tilt}deg` } : {}),
      } as React.CSSProperties}
    >
      <Picture id={id} sizes={sizes} alt={alt} />
    </span>
  )

  if (!speak) return art

  /* data-density rides on the BUTTON here. Left on the inner span it would hide
     the picture below 900px and leave an empty, still-focusable button behind —
     a tab stop with nothing in it. */
  return (
    <Quacker name={DISPLAY[who] ?? 'the duck'} className={className} density={density}>
      {art}
    </Quacker>
  )
}
