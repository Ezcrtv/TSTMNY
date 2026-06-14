import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()
    const amountInCents = Math.round(Number(amount) * 100)

    if (!amountInCents || amountInCents < 100) {
      return NextResponse.json(
        { error: 'Minimum donation is $1.' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'TSTMNY Donation',
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)

    return NextResponse.json(
      { error: 'Unable to create checkout session.' },
      { status: 500 }
    )
  }
}