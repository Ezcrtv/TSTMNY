/**
 * Donation settings. The payment provider is Stripe Checkout via
 * /api/stripe/checkout. To switch providers (Givebutter, Donorbox, …),
 * replace `startDonation` — the form only depends on its return value.
 */
import { postJSON } from './forms/submit.ts'

export const DONATION_PRESETS = [25, 50, 100, 250] as const
export const DONATION_MIN = 1
export const DONATION_MAX = 10000
export const DONATION_CURRENCY = 'USD'

export type DonationStart = { ok: true; redirectUrl: string } | { ok: false; error: string }

export async function startDonation(amount: number): Promise<DonationStart> {
  const result = await postJSON<{ url?: string }>('/api/stripe/checkout', { amount })
  if (result.ok && result.data.url) return { ok: true, redirectUrl: result.data.url }
  return { ok: false, error: result.ok ? 'Checkout is unavailable right now.' : result.error }
}
