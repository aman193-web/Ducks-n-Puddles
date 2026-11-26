/**
 * Builds self-contained copies of the prototype pages: one .html file each,
 * with every font, the stylesheet, the script and every image inlined as
 * data URIs. No network, no folder of assets — open the file and it works.
 *
 *   node shopify-design/tools/build-standalone.mjs
 *
 * Output: shopify-design/standalone/index.html and reserve.html.
 * The two files link to each other by name, so keep them side by side.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'standalone')
const GOOGLE =
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Edu+QLD+Beginner:wght@400;600&family=Poppins:wght@400;500;600;700&display=swap'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'

const dataUri = (buf, type) => `data:${type};base64,${buf.toString('base64')}`

/* Google Fonts, latin subset only, each file fetched once. */
async function googleFonts() {
  const css = await (await fetch(GOOGLE, { headers: { 'User-Agent': UA } })).text()
  const blocks = css.split('/* ').filter((b) => b.startsWith('latin */'))
  const cache = new Map()
  let out = ''
  for (const b of blocks) {
    const face = b.slice(b.indexOf('@font-face'))
    const url = face.match(/url\((https:[^)]+)\)/)[1]
    if (!cache.has(url)) {
      const buf = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer())
      cache.set(url, dataUri(buf, 'font/woff2'))
    }
    out += face.replace(url, cache.get(url)).replace(/unicode-range:[^;]+;\s*/, '')
  }
  return out
}

async function build(page, fontsCss, themeCss, themeJs) {
  let html = await readFile(path.join(ROOT, page), 'utf8')

  /* Every image the page or its script can ask for. The script builds some
     names at runtime (the duck picker swaps bottles), so those are expanded. */
  const names = new Set([...html.matchAll(/assets\/img\/([\w.-]+\.webp)/g)].map((m) => m[1]))
  for (const m of themeJs.matchAll(/assets\/img\/([\w.-]+\.webp)/g)) names.add(m[1])
  if (html.includes('data-stage')) {
    for (const f of ['vincey', 'chichi', 'goosey']) {
      for (const s of ['-621', '-back-621', '-peeking-320', '-idle-420']) names.add(`${f}${s}.webp`)
    }
    names.add('trio-walk-560.webp')
  }
  const img = {}
  for (const n of names) img[n] = dataUri(await readFile(path.join(ROOT, 'assets/img', n)), 'image/webp')

  /* Each image is stored ONCE, in a script map; <img> tags carry the name and
     a tiny script fills them in. Inlining into every src would repeat the big
     ones (the bottles appear several times per page). */
  html = html.replace(/<img([^>]*?)\ssrc="assets\/img\/([\w.-]+\.webp)"/g, '<img$1 data-inline-src="$2"')
  html = html.replace(/href="assets\/img\/([\w.-]+\.webp)"/g, (_, n) => `href="${img[n]}"`)

  const js = themeJs
    .replace(/`assets\/img\/([^`]*)`/g, 'IMG[`$1`]')
    .replace(/'assets\/img\/([^']*)'/g, "IMG['$1']")

  html = html
    .replace(/\s*<link rel="preconnect"[^>]*>/g, '')
    .replace(/\s*<link rel="preload"[^>]*>/g, '')
    .replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>/, `<style>${fontsCss}</style>`)
    .replace(/<link rel="stylesheet" href="assets\/theme\.css[^"]*">/, () => `<style>${themeCss}</style>`)
    .replace(
      /<script src="assets\/theme\.js[^"]*" defer><\/script>/,
      () => `<script>
const IMG = ${JSON.stringify(img)};
document.querySelectorAll('img[data-inline-src]').forEach((el) => { el.src = IMG[el.dataset.inlineSrc] });
</script>
<script>${js}</script>`,
    )

  const left = html.match(/\s(src|href)="(?!data:|#|https?:|mailto:|index\.html|reserve\.html)[^"]+"/g)
  if (left) throw new Error(`${page}: unresolved references ${left.join(', ')}`)

  await writeFile(path.join(OUT, page), html)
  return (Buffer.byteLength(html) / 1024 / 1024).toFixed(1)
}

await mkdir(OUT, { recursive: true })
const fontsCss = await googleFonts()
const bangbang = dataUri(await readFile(path.join(ROOT, 'assets/fonts/Bangbang-Regular.woff2')), 'font/woff2')
const themeCss = (await readFile(path.join(ROOT, 'assets/theme.css'), 'utf8'))
  .replace('url("fonts/Bangbang-Regular.woff2")', `url("${bangbang}")`)
const themeJs = await readFile(path.join(ROOT, 'assets/theme.js'), 'utf8')
for (const page of ['index.html', 'reserve.html']) {
  console.log(`${page}: ${await build(page, fontsCss, themeCss, themeJs)} MB`)
}
