import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { reasonLabel, validateContact } from '@/lib/forms/contact'

/**
 * Contact submission handler. Sends the message by email through Resend.
 * Requires RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL.
 */
export async function POST(request: Request) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } = process.env
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    return NextResponse.json(
      { error: 'Our inbox isn’t connected yet. Please try again soon.' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const result = validateContact(body ?? {})
  if (!result.ok) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', fieldErrors: result.errors },
      { status: 400 },
    )
  }

  const { name, email, organization, reason, message } = result.data

  try {
    const { error } = await new Resend(RESEND_API_KEY).emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo: email,
      subject: `[${reasonLabel(reason)}] ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization ?? '—'}`,
        `Reason: ${reasonLabel(reason)}`,
        '',
        message,
      ].join('\n'),
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[contact] send failed', error)
    return NextResponse.json({ error: 'We couldn’t send your message. Please try again.' }, { status: 502 })
  }
}
