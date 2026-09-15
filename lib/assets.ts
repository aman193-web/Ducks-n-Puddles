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
}

const assets = manifest as unknown as Record<string, AssetEntry>

export function asset(id: string): AssetEntry {
  const a = assets[id]
  if (!a) throw new Error(`Unknown asset "${id}". Run: npm run assets:images`)
  return a
}

export function srcSet(id: string, format: string): string {
  const a = asset(id)
  return a.widths.map((w) => `/img/${id}-${w}.${format} ${w}w`).join(', ')
}

/** Largest available width — the <img> src fallback. */
export function fallbackSrc(id: string): string {
  const a = asset(id)
  const ext = a.alpha ? 'webp' : 'jpg'
  return `/img/${id}-${a.widths[a.widths.length - 1]}.${ext}`
}
