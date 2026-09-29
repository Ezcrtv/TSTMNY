import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secret || !webhookSecret) {
    console.error('[stripe webhook] Missing Stripe configuration')
    return NextResponse.json(
      { error: 'Stripe webhook is not configured.' },
      { status: 503 },
    )
  }

  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing Stripe signature.' },
      { status: 400 },
    )
  }

  const body = await request.text()
  const stripe = new Stripe(secret)

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    )
  } catch (error) {
    console.error('[stripe webhook] Invalid signature', error)

    return NextResponse.json(
      { error: 'Invalid webhook signature.' },
      { status: 400 },
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('[stripe webhook] Donation completed', {
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
    })
  }

  return NextResponse.json({ received: true })
}