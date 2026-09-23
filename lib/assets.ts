import manifest from './asset-manifest.json'

export type AssetId = keyof typeof manifest

export interface AssetEntry {
  id: string
  tier: 'A' | 'B' | 'C'
  alt?: string
  widths: number[]
  colour?: string
  aspect: number
  formats: string[]
  alpha?: boolean
  nativeWidth?: number
  nativeHeight?: number
  /** Short content hash of the source, appended to URLs as ?v= — see below. */
  v?: string
}

const assets = manifest as unknown as Record<string, AssetEntry>

export function asset(id: string): AssetEntry {
  const a = assets[id]
  if (!a) throw new Error(`Unknown asset "${id}". Run: npm run assets:images`)
  return a
}

/**
 * `?v=<hash>` on every URL, from the source file's content hash.
 *
 * Derivative filenames are `<id>-<width>.<ext>` and do not change when the art
 * behind an id does, so without this a browser that has already been to the
 * site keeps serving the old picture from cache — silently, with nothing to
 * notice until someone reports that a new image "is not there". Exactly that
 * happened to the peeking characters.
 */
const ver = (a: AssetEntry) => (a.v ? `?v=${a.v}` : '')

export function srcSet(id: string, format: string): string {
  const a = asset(id)
  return a.widths.map((w) => `/img/${id}-${w}.${format}${ver(a)} ${w}w`).join(', ')
}

/** Largest available width — the <img> src fallback. */
export function fallbackSrc(id: string): string {
  const a = asset(id)
  const ext = a.alpha ? 'webp' : 'jpg'
  return `/img/${id}-${a.widths[a.widths.length - 1]}.${ext}${ver(a)}`
}
