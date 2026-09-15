/** Full-page screenshot -> reviewable slices. */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
const [,, src, outDir, step = '2300'] = process.argv
rmSync(outDir, { recursive: true, force: true }); mkdirSync(outDir, { recursive: true })
const g = (f, k) => parseInt(execFileSync('sips', ['-g', k, f]).toString().trim().split(/\s+/).pop(), 10)
const w = g(src, 'pixelWidth'), h = g(src, 'pixelHeight')
let n = 0
for (let y = 0; y < h; y += +step) {
  const hh = Math.min(+step, h - y)
  const p = `${outDir}/s${String(n).padStart(2, '0')}.jpg`
  // sips --cropOffset is (top,left) measured from the top-left of the ORIGINAL.
  execFileSync('sips', ['-c', String(hh), String(w), '--cropOffset', String(y), '0', src, '--out', p])
  execFileSync('sips', ['-Z', '980', p])
  n++
}
console.log(`${n} slices from ${w}x${h}`)
