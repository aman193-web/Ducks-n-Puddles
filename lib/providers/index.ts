import type { SubscribeInput } from '@/lib/subscribe-schema'

export type Result =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; reason: 'invalid' | 'rate_limited' | 'provider_error' }

export interface Provider {
  name: string
  subscribe(input: SubscribeInput): Promise<Result>
}

/** Local / unconfigured default: logs and succeeds, so the form is live on day one. */
const consoleProvider: Provider = {
  name: 'console',
  async subscribe(input) {
    console.info('[subscribe:console]', {
      email: input.email, firstName: input.firstName, duck: input.duck,
    })
    return { ok: true }
  },
}

const mailchimp: Provider = {
  name: 'mailchimp',
  async subscribe(input) {
    const key = process.env.MAILCHIMP_API_KEY
    const list = process.env.MAILCHIMP_LIST_ID
    const dc = key?.split('-')[1]
    if (!key || !list || !dc) return { ok: false, reason: 'provider_error' }

    const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${list}/members`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: input.email,
        // Double opt-in: Mailchimp sends the confirmation itself. It is a real
        // consent record and it protects deliverability for a new sending domain.
        status: 'pending',
        merge_fields: { FNAME: input.firstName || '' },
        tags: [`duck:${input.duck}`],
      }),
    })
    if (res.status === 400) {
      const body = await res.json().catch(() => ({}))
      if (body?.title === 'Member Exists') return { ok: true, alreadySubscribed: true }
      return { ok: false, reason: 'invalid' }
    }
    return res.ok ? { ok: true } : { ok: false, reason: 'provider_error' }
  },
}

const resend: Provider = {
  name: 'resend',
  async subscribe(input) {
    const key = process.env.RESEND_API_KEY
    const audience = process.env.RESEND_AUDIENCE_ID
    if (!key || !audience) return { ok: false, reason: 'provider_error' }
    const res = await fetch(`https://api.resend.com/audiences/${audience}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email, first_name: input.firstName || undefined, unsubscribed: false,
      }),
    })
    return res.ok ? { ok: true } : { ok: false, reason: 'provider_error' }
  },
}

const webhook: Provider = {
  name: 'webhook',
  async subscribe(input) {
    const url = process.env.SUBSCRIBE_WEBHOOK_URL
    if (!url) return { ok: false, reason: 'provider_error' }
    const res = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    return res.ok ? { ok: true } : { ok: false, reason: 'provider_error' }
  },
}

const REGISTRY: Record<string, Provider> = {
  console: consoleProvider, mailchimp, resend, webhook,
}

/**
 * One seam. Swapping the client's email platform is an env var, not a rebuild —
 * which matters because the discovery call left the platform genuinely undecided.
 */
export function getProvider(): Provider {
  const name = process.env.SUBSCRIBE_PROVIDER ?? 'console'
  return REGISTRY[name] ?? consoleProvider
}
