import { NextResponse } from 'next/server'
import { subscribeSchema } from '@/lib/subscribe-schema'
import { getProvider } from '@/lib/providers'

/** In-memory sliding window. Adequate for this traffic; swap for KV at the edge. */
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  list.push(now)
  hits.set(ip, list)
  return list.length > LIMIT
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ?? 'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'That’s a lot of tries. Give it a minute?' },
      { status: 429, headers: { 'Retry-After': '600' } },
    )
  }

  const json = await req.json().catch(() => null)
  const parsed = subscribeSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? 'Something in the form isn’t right.' },
      { status: 400 },
    )
  }

  const input = parsed.data

  // Honeypot + time-trap. Both return a *fake success* so a bot learns nothing.
  if (input.company) return NextResponse.json({ ok: true })
  if (typeof input.elapsedMs === 'number' && input.elapsedMs < 3000) {
    return NextResponse.json({ ok: true })
  }

  const result = await getProvider().subscribe(input)
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: 'Something broke on our end, not yours. Try again in a minute?' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed ?? false })
}
