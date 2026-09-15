import { z } from 'zod'

export const DUCKS = ['vincey', 'chi-chi', 'goosey', 'undecided'] as const

export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('That email doesn’t look right.').max(200),
  firstName: z.string().trim().max(80).optional().or(z.literal('')),
  duck: z.enum(DUCKS),
  consent: z.literal(true, { message: 'We need your okay before we can email you.' }),
  /**
   * Honeypot. Bots fill it; people never see it.
   * Deliberately NOT constrained here — validating it to max(0) made the request
   * fail at the schema with a 400 that named the exact field, which teaches a bot
   * to leave it alone next time and leaks an internal message to the response.
   * The route inspects it instead and returns a silent fake success.
   */
  company: z.string().max(200).optional(),
  /** Time-trap: the client stamps mount time; submissions faster than 3s are bots. */
  elapsedMs: z.number().int().nonnegative().optional(),
})

export type SubscribeInput = z.infer<typeof subscribeSchema>
