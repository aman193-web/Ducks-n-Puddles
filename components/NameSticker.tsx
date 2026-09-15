import { Motif, type MotifName } from './Motif'
import styles from './NameSticker.module.css'

interface Props {
  name: string
  motif: MotifName
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
 * product's printed white. Measured: navy scores 4.3 / 3.9 / 7.7 on Vincey blue,
 * Chi Chi pink and Goosey yellow (all pass AA-Large at these display sizes),
 * whereas white on Goosey yellow would score 1.7 and is never permitted.
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
      <Motif name={motif} className={styles.motif} />
    </Tag>
  )
}
