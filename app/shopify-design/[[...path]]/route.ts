import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * THE SHOPIFY DESIGN PROTOTYPE — DEV SERVER AND VERCEL PREVIEWS ONLY.
 *
 * `shopify-design/` at the repo root is a static HTML prototype of the Shopify
 * store (homepage + $1 reservation page). This hands its files out under
 * /shopify-design/… under `next dev` and on Vercel PREVIEW deployments (any
 * branch other than main), so it can be shared at a preview URL without
 * touching the live site.
 *
 * The standalone single-file versions are at /shopify-design/standalone/.
 *
 * It is a route handler rather than a copy under public/ on purpose: public/
 * ships with the site, and a mock storefront with a "Reserve for $1" button
 * must never be live on ducksnpuddles.com. On the production deployment
 * (VERCEL_ENV=production) this answers 404 for everything. next.config.ts
 * bundles the folder with this route (outputFileTracingIncludes) so the
 * files exist on a preview deployment's server.
 */

const ROOT = path.join(process.cwd(), 'shopify-design')

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  if (process.env.VERCEL_ENV === 'production') {
    return new Response('Not found', { status: 404 })
  }

  const parts = (await params).path ?? []

  /* The pages link to their assets relatively ("assets/theme.css"), so the
     bare folder URL has to become the index FILE — /shopify-design/ would be
     trailing-slash-redirected to /shopify-design, where those links would
     resolve against the site root and miss. */
  if (parts.length === 0) {
    return Response.redirect(new URL('/shopify-design/index.html', request.url), 307)
  }

  const file = path.join(ROOT, ...parts)
  /* No climbing out of the folder with ../ */
  if (!file.startsWith(ROOT + path.sep)) {
    return new Response('Not found', { status: 404 })
  }

  try {
    const body = await readFile(file)
    return new Response(body, {
      headers: {
        'Content-Type': TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
        /* Always the file on disk: this is for reviewing edits as they land. */
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  } catch {
    return new Response('Not found', { status: 404 })
  }
}
