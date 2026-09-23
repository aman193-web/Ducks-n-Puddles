import styles from './NameSticker.module.css'

interface Props {
  name: string
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
/* The motif that used to sit after the name is gone from every one of these.
   The client asked for it twice — first off the signup's picker, then "remove
   icons from chi chi, vincey, goosey button from everywhere". The name is the
   whole label now, and the space the mark was taking has gone into the type. */
export function NameSticker({
  name, colour, size = 'm', as = 'span', onClick, role, ariaChecked, tabIndex, className,
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
    </Tag>
  )
}
