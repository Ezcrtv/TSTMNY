import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { DONATION_MAX, DONATION_MIN } from '@/lib/donations'
import { site } from '@/lib/site'

/**
 * Creates a one-time Stripe Checkout session and returns its URL.
 * Requires STRIPE_SECRET_KEY. Success/cancel URLs use NEXT_PUBLIC_BASE_URL.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.json(
      { error: 'Online giving is being set up. Please check back soon.' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const amount = Number(body?.amount)
  if (!Number.isFinite(amount) || amount < DONATION_MIN || amount > DONATION_MAX) {
    return NextResponse.json(
      { error: `Enter an amount between $${DONATION_MIN} and $${DONATION_MAX.toLocaleString()}.` },
      { status: 400 },
    )
  }

  try {
    const session = await new Stripe(secret).checkout.sessions.create({
      mode: 'payment',
      submit_type: 'donate',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Gift to ${site.name}` },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${site.url}/donate/success`,
      cancel_url: `${site.url}/donate`,
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[stripe] checkout failed', error)
    return NextResponse.json({ error: 'We couldn’t open checkout. Please try again.' }, { status: 502 })
  }
}
