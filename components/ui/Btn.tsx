import Link from 'next/link'
import styles from './Btn.module.css'

interface Props {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  colour?: string
  size?: 'md' | 'sm'
  variant?: 'solid' | 'ghost'
  arrow?: boolean
  /** Fill the container — store cards, the hero column, the form. */
  block?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)

export function Btn({
  children, href, onClick, colour, size = 'md',
  variant = 'solid', arrow = true, block, type = 'button', disabled, className,
}: Props) {
  const cls = [
    styles.btn,
    size === 'sm' && styles.sm,
    variant === 'ghost' && styles.ghost,
    !arrow && styles.noArrow,
    block && styles.block,
    className,
  ].filter(Boolean).join(' ')

  const style = colour ? ({ ['--bg' as string]: colour } as React.CSSProperties) : undefined

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className={styles.badge} aria-hidden="true">
          <Arrow /><Arrow />
        </span>
      )}
    </>
  )

  if (href) return <Link href={href} className={cls} style={style}>{inner}</Link>
  return (
    <button type={type} className={cls} style={style} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
