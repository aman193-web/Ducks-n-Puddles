import { Motif, type MotifName } from './Motif'
import styles from './NameSticker.module.css'

interface Props {
  name: string
  /** Optional. The decal printed on the bottle carries the character's motif,
   *  so the Store stickers keep it — but in the signup's duck PICKER the marks
   *  were noise inside a control whose whole job is the name, so it is left off
   *  there. Omit the prop and the sticker is name-only. */
  motif?: MotifName
  colour: string
  size?: 's' | 'm' | 'l'
  as?: 'span' | 'button'
  onClick?: () => void
  role?: string
  ariaChecked?: boolean
  tabIndex?: number
  className?: string
}

/**
 * Ink is --ink on all three character colours — a deliberate departure from the
 * product's printed white. RE-MEASURED off the rendered pills, because the
 * figures here before (4.3 / 3.9 / 7.7) were wrong and understated all three:
 * navy scores 4.97 on Vincey blue, 4.50 on Chi Chi pink and 8.88 on Goosey
 * yellow, so every one clears AA for normal-size text. White on Goosey yellow
 * would score 1.7 and is never permitted.
 *
 * Chi Chi lands exactly ON 4.50, with nothing in hand — so if these colours or
 * this ink ever move, re-measure rather than assuming there is slack.
 */
export function NameSticker({
  name, motif, colour, size = 'm', as = 'span', onClick, role, ariaChecked, tabIndex, className,
}: Props) {
  const Tag = as as 'span'
  return (
    <Tag
      role={role}
      aria-checked={ariaChecked}
      tabIndex={tabIndex}
      onClick={onClick}
      className={[styles.sticker, styles[size], className].filter(Boolean).join(' ')}
      style={{ ['--sticker-bg' as string]: colour } as React.CSSProperties}
      {...(as === 'button' ? { type: 'button' as const } : {})}
    >
      {name}
      {motif && <Motif name={motif} className={styles.motif} />}
    </Tag>
  )
}
