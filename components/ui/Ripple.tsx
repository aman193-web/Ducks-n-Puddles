import styles from './Ripple.module.css'

interface Props {
  /** Number of rings. Three reads as water; more reads as a target. */
  rings?: number
  className?: string
}

/**
 * A puddle rippling — the client's own example, and the one animation primitive
 * the codebase did not already have. Nothing else here expands a ring: the hero
 * has a rise (`heroBubble`), a shimmer (`heroGlint`) and a drift (`heroDrift`),
 * but no ripple.
 *
 * Concentric rings that scale outward and fade, on a long cycle with most of it
 * dead — the same restraint as the `wiggle` keyframe, which nudges rather than
 * nags. Decorative, never interactive, and off entirely under reduced motion
 * (where the rings simply do not render rather than sitting frozen mid-expand).
 */
export function Ripple({ rings = 3, className }: Props) {
  return (
    <span className={[styles.ripple, className].filter(Boolean).join(' ')} aria-hidden="true">
      {Array.from({ length: rings }, (_, i) => (
        <i key={i} style={{ ['--r-i' as string]: i } as React.CSSProperties} />
      ))}
    </span>
  )
}
