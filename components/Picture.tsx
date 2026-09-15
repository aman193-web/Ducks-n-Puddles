import { asset, srcSet, fallbackSrc } from '@/lib/assets'

type Props = {
  id: string
  /** The `sizes` attribute. Get this right or the browser over-downloads. */
  sizes: string
  alt?: string
  className?: string
  priority?: boolean
  /** Render the dominant colour behind the image: zero bytes, no CLS, looks deliberate. */
  tint?: boolean
  style?: React.CSSProperties
} & React.ImgHTMLAttributes<HTMLImageElement>

/**
 * AVIF -> WebP -> JPEG, from pre-generated derivatives.
 *
 * Width/height are always emitted so the box is reserved before load. No blurred
 * base64 placeholder: it costs bytes in the HTML and looks worse than a solid
 * dominant-colour ground.
 */
export function Picture({ id, sizes, alt, className, priority, tint = true, style, ...rest }: Props) {
  const a = asset(id)
  const w = a.widths[a.widths.length - 1]
  const h = Math.round(w / a.aspect)
  const text = alt ?? a.alt ?? ''

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(id, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(id, 'webp')} sizes={sizes} />
      <img
        {...rest}
        src={fallbackSrc(id)}
        srcSet={a.alpha ? undefined : srcSet(id, 'jpg')}
        sizes={a.alpha ? undefined : sizes}
        width={w}
        height={h}
        alt={text}
        /* An empty alt must be paired with role="presentation" intent, not a title. */
        aria-hidden={text === '' ? true : undefined}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding={priority ? 'sync' : 'async'}
        style={{
          backgroundColor: tint && !a.alpha ? a.colour : undefined,
          ...style,
        }}
      />
    </picture>
  )
}
