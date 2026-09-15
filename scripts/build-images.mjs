/**
 * Source photos / renders -> responsive AVIF + WebP + JPEG derivatives.
 *
 * Non-negotiables:
 *  - .rotate() with NO argument applies EXIF orientation. Without it half the
 *    iPhone set renders sideways.
 *  - Metadata is stripped (sharp's default). These are photographs of the client's
 *    children taken on a phone, and iPhone JPEGs carry GPS coordinates. Stripping
 *    is a safeguarding requirement, not an optimisation.
 *  - Widths are clamped to the source width. We never upscale: the pro set contains
 *    odd widths (1365, 1366, 1386) and the renders are only 621px wide.
 */
import sharp from 'sharp'
import { mkdir, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { photos, alphaAssets, videos, PHOTO_DIR, WIDTHS } from './lib/manifest.mjs'
import { grades } from './lib/grades.mjs'

const OUT = 'public/img'
const exists = async (p) => { try { await stat(p); return true } catch { return false } }

sharp.cache(false)
sharp.concurrency(4)

/** Dominant colour -> a solid placeholder. Zero bytes in the HTML, no CLS, looks deliberate. */
async function dominant(pipeline) {
  const { dominant: d } = await pipeline.clone().stats()
  return `#${[d.r, d.g, d.b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

async function emit(base, pipeline, widths, { alpha = false } = {}) {
  const out = []
  for (const w of widths) {
    const resized = () => pipeline.clone().resize(w, null, {
      fit: 'inside', kernel: 'lanczos3', withoutEnlargement: true,
    })
    const avif = path.join(OUT, `${base}-${w}.avif`)
    const webp = path.join(OUT, `${base}-${w}.webp`)
    if (!(await exists(avif))) {
      await resized().avif(alpha
        // 4:4:4 is required for alpha art — 4:2:0 destroys the hard edges on a logo or a beak.
        ? { quality: 60, effort: 6, chromaSubsampling: '4:4:4' }
        : { quality: 50, effort: 6, chromaSubsampling: '4:2:0' }).toFile(avif)
    }
    if (!(await exists(webp))) {
      // Lossy-but-high-quality with alphaQuality 100: lossless WebP measured 452 KB
      // on a 621px render vs 31 KB for the AVIF. This is only the fallback path.
      await resized().webp(alpha
        ? { quality: 90, alphaQuality: 100, effort: 6 }
        : { quality: 78, effort: 6 }).toFile(webp)
    }
    if (!alpha) {
      const jpg = path.join(OUT, `${base}-${w}.jpg`)
      if (!(await exists(jpg))) {
        await resized().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(jpg)
      }
    }
    out.push(w)
  }
  return out
}

const entries = {}

// ---------- photographs ----------
for (const p of photos) {
  const src = path.join(PHOTO_DIR, p.src)
  let pipeline = sharp(src).rotate()                      // EXIF orientation FIRST

  const meta = await pipeline.metadata()
  // width/height after rotation
  const rot = meta.orientation && meta.orientation >= 5
  const srcW = rot ? meta.height : meta.width
  const srcH = rot ? meta.width : meta.height

  if (p.crop) {
    const h = Math.round(srcH * p.crop.heightPct)
    pipeline = pipeline.extract({
      left: 0, top: Math.round(srcH * (p.crop.top ?? 0)), width: srcW, height: h,
    })
  }
  pipeline = (grades[p.grade] ?? grades.none)(pipeline)

  const widths = WIDTHS.filter((w) => w <= srcW)
  const colour = await dominant(pipeline)
  const done = await emit(p.id, pipeline, widths)
  const final = await sharp(await pipeline.clone().toBuffer()).metadata()

  entries[p.id] = {
    id: p.id, tier: p.tier, alt: p.alt, widths: done, colour,
    aspect: +(final.width / final.height).toFixed(4), formats: ['avif', 'webp', 'jpg'],
  }
  console.log(`photo  ${p.id.padEnd(18)} ${widths.length} widths  src ${srcW}x${srcH}  ${colour}`)
}

// ---------- video posters ----------
for (const v of videos) {
  const src = path.join('.cache/posters', `${v.id}.jpg`)
  if (!(await exists(src))) continue
  let pipeline = sharp(src).rotate()
  pipeline = grades[v.hdr ? 'overcast' : 'chlorine'](pipeline)
  const meta = await pipeline.metadata()
  const widths = [540, 1080].filter((w) => w <= meta.width)
  const colour = await dominant(pipeline)
  const done = await emit(`poster-${v.id}`, pipeline, widths)
  entries[`poster-${v.id}`] = {
    id: `poster-${v.id}`, tier: 'B', alt: `Video still: ${v.id}`, widths: done, colour,
    aspect: +(meta.width / meta.height).toFixed(4), formats: ['avif', 'webp', 'jpg'],
  }
  console.log(`poster ${v.id.padEnd(18)} ${widths.length} widths  ${colour}`)
}

// ---------- alpha art: renders, logos, patterns ----------
for (const a of alphaAssets) {
  const pipeline = sharp(a.src)
  const meta = await pipeline.metadata()
  const widths = a.widths.filter((w) => w <= meta.width)
  const done = await emit(a.id, pipeline, widths, { alpha: true })
  entries[a.id] = {
    id: a.id, tier: 'A', widths: done, alpha: true,
    aspect: +(meta.width / meta.height).toFixed(4), formats: ['avif', 'webp'],
    nativeWidth: meta.width, nativeHeight: meta.height,
  }
  console.log(`alpha  ${a.id.padEnd(18)} ${widths.length} widths  native ${meta.width}x${meta.height}`)
}

await mkdir('lib', { recursive: true })
await writeFile('lib/asset-manifest.json', JSON.stringify(entries, null, 2))
console.log(`\nwrote lib/asset-manifest.json (${Object.keys(entries).length} entries)`)
