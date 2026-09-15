import Link from 'next/link'
import styles from './Pill.module.css'

/**
 * The fused two-part capsule, measured off coquelicots.nl.
 *
 * Anatomy (their numbers): a 100px-radius label capsule + a perfectly circular
 * icon disc that OVERLAPS it by 5px, so the pair reads as one swollen shape
 * rather than as a button with an icon inside it. Sibling buttons take a
 * contrasting colour pair, which is how their header gets a hierarchy without a
 * single border.
 *
 * The label roll is their nicest trick and costs nothing: the span carries
 * `text-shadow: currentColor 0 1.3em`, which paints a duplicate of the text
 * exactly one line-height below. Hover translates the span up by 1.3em and the
 * ghost slides into its place. No duplicated DOM, no JS, and the copy is still
 * one text node for a screen reader.
 *
 * Deliberately NOT a replacement for <Btn>. Btn is the Koa-derived in-page
 * button and stays as it is; this is chrome — header and hero only.
 */
interface Props {
  children?: React.ReactNode
  href?: string
  onClick?: () => void
  /** Label capsule + disc colours. */
  bg?: string
  ink?: string
  discBg?: string
  discInk?: string
  icon?: 'arrow' | 'menu' | 'down' | 'none'
  size?: 'md' | 'lg'
  label?: string
  className?: string
  type?: 'button' | 'submit'
  'aria-expanded'?: boolean
  'aria-controls'?: string
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13M12.5 5.5 19 12l-6.5 6.5" />
  </svg>
)
const Down = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 5v13M5.5 11.5 12 18l6.5-6.5" />
  </svg>
)
const Menu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
       strokeLinecap="round" aria-hidden="true">
    <path d="M4.5 8.5h15M4.5 15.5h15" />
  </svg>
)

export function Pill({
  children, href, onClick, bg, ink, discBg, discInk,
  icon = 'arrow', size = 'md', label, className, type = 'button', ...aria
}: Props) {
  const cls = [styles.pill, size === 'lg' && styles.lg, !children && styles.discOnly, className]
    .filter(Boolean).join(' ')

  const style = {
    ...(bg && { ['--pill-bg' as string]: bg }),
    ...(ink && { ['--pill-ink' as string]: ink }),
    ...(discBg && { ['--disc-bg' as string]: discBg }),
    ...(discInk && { ['--disc-ink' as string]: discInk }),
  } as React.CSSProperties

  const Icon = icon === 'menu' ? Menu : icon === 'down' ? Down : Arrow

  const inner = (
    <>
      {children != null && (
        <span className={styles.label}>
          {/* .roll clips; the span inside carries its own ghost via text-shadow */}
          <span className={styles.roll}><span>{children}</span></span>
        </span>
      )}
      {icon !== 'none' && (
        <span className={styles.disc} aria-hidden="true">
          {/* two glyphs, so hover can hand the arrow over rather than slide one */}
          <Icon /><Icon />
        </span>
      )}
      {label && <span className="vh">{label}</span>}
    </>
  )

  if (href) return <Link href={href} className={cls} style={style} {...aria}>{inner}</Link>
  return (
    <button type={type} className={cls} style={style} onClick={onClick} {...aria}>
      {inner}
    </button>
  )
}
