/**
 * HEVC .MOV -> web video.
 *
 * Two paths:
 *   SDR  (7 clips, portrait 2160x3840, bt709, 8-bit)  -> straight transcode
 *   HDR  (1 clip, 10-bit, BT.2020 / HLG + Dolby Vision P8.4)
 *        -> zscale/tonemap chain. Verified: without it the clip renders milky and
 *           desaturated, and the failure is subtle enough to ship unnoticed.
 *
 * All 8 clips display portrait (the HDR one carries a rotation matrix), so every
 * output is vertical and sized by WIDTH.
 *
 * Every output is forced to yuv420p 8-bit: iPhone HEVC is often 10-bit, and libx264
 * would otherwise emit High10, which Safari and most hardware decoders refuse.
 *
 * H.264 only. Measured on this footage, VP9 came out LARGER than H.264 at matched
 * quality (1.1M vs 624K), so it would cost bytes and build time for nothing.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, stat, readdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import { videos, VIDEO_DIR } from './lib/manifest.mjs'

const run = promisify(execFile)
const OUT = 'public/media/video'
const POSTERS = '.cache/posters'
const BUF = { maxBuffer: 1024 * 1024 * 64 }

/** Widths: 540 for the porthole, 1080 for a 2x / expanded view. */
const RENDITIONS = [
  { w: 540, crf: 29 },
  { w: 1080, crf: 28 },
]

const TONEMAP =
  'zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,' +
  'tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv'

const exists = async (p) => { try { await stat(p); return true } catch { return false } }
const chainFor = (v, w) =>
  [v.hdr ? TONEMAP : null, `scale=${w}:-2:flags=lanczos`, 'format=yuv420p'].filter(Boolean).join(',')

async function encode(v, { w, crf }) {
  const out = path.join(OUT, `${v.id}-${w}.mp4`)
  if (await exists(out)) return
  await run(ffmpegPath, [
    '-hide_banner', '-loglevel', 'error', '-y', '-i', path.join(VIDEO_DIR, v.src),
    '-an', '-sn', '-dn',
    '-vf', chainFor(v, w),
    '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.0', '-preset', 'slow', '-crf', String(crf),
    '-g', '60', '-keyint_min', '60', '-sc_threshold', '0', // fixed 2s GOP -> seamless loops
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
    '-movflags', '+faststart', out,
  ], BUF)
  const { size } = await stat(out)
  process.stdout.write(`  ${w}w  ${(size / 1e6).toFixed(2)} MB\n`)
}

/** Poster goes to .cache; build-images.mjs turns it into AVIF/WebP/JPEG. */
async function poster(v) {
  const out = path.join(POSTERS, `${v.id}.jpg`)
  if (await exists(out)) return
  await run(ffmpegPath, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(v.poster ?? 1), '-i', path.join(VIDEO_DIR, v.src),
    '-frames:v', '1', '-vf', chainFor(v, 1080), '-q:v', '2', out,
  ], BUF)
}

const only = process.argv.slice(2)
await mkdir(OUT, { recursive: true })
await mkdir(POSTERS, { recursive: true })

// clear the earlier experimental renditions
for (const f of await readdir(OUT).catch(() => [])) {
  if (/-1280\.(mp4|webm)$/.test(f) || /-poster\.jpg$/.test(f)) await unlink(path.join(OUT, f))
}

for (const v of videos) {
  if (only.length && !only.includes(v.id)) continue
  console.log(`${v.id}${v.hdr ? '  [HDR -> tone-mapped]' : ''}`)
  await poster(v)
  for (const r of RENDITIONS) await encode(v, r)
}
console.log('done.')
