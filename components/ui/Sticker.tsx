import { Motif, type MotifName } from '@/components/Motif'
import styles from './Sticker.module.css'

type StickerProps = {
  children: React.ReactNode
  colour?: string
  rot?: number
} & React.HTMLAttributes<HTMLSpanElement>

export function Sticker({ children, colour = 'var(--sun-soft)', rot = -3, className, style, ...rest }: StickerProps) {
  return (
    <span
      {...rest}
      className={`${styles.sticker} ${className ?? ''}`}
      style={{ ['--bg' as string]: colour, ['--rot' as string]: `${rot}deg`, ...style } as React.CSSProperties}
    >
      {children}
    </span>
  )
}

/**
 * A sticker that sits INSIDE a headline, interrupting the words — the Koa device
 * ("POWERFUL [trophy] NUTRITION"). Decorative, so it is hidden from assistive tech
 * and the sentence still reads cleanly to a screen reader.
 */
export function Glyph({ motif, colour = 'var(--sun-soft)', rot = -6 }: {
  motif: MotifName; colour?: string; rot?: number
}) {
  return (
    <span className={styles.glyph} aria-hidden="true"
          style={{ ['--bg' as string]: colour, ['--rot' as string]: `${rot}deg` } as React.CSSProperties}>
      <Motif name={motif} size={64} />
    </span>
  )
}
