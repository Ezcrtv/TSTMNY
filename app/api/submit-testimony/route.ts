import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'
import { validateContact } from '@/lib/forms/contact'

/**
 * Testimony submission handler. Saves a pending `testimony` draft to Sanity for
 * review and notifies the team by email.
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN,
 * RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL.
 */
export async function POST(request: Request) {
  const env = process.env
  const token = env.SANITY_API_TOKEN?.trim()
  if (
    !env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !env.NEXT_PUBLIC_SANITY_DATASET ||
    !token ||
    !env.RESEND_API_KEY ||
    !env.RESEND_FROM_EMAIL ||
    !env.RESEND_TO_EMAIL
  ) {
    return NextResponse.json(
      { error: 'Story submissions aren’t connected yet. Please try again soon.' },
      { status: 503 },
    )
  }

  const body = await request.json().catch(() => null)
  const result = validateContact({
    name: body?.name,
    email: body?.email,
    reason: 'testimony',
    message: body?.story,
  })
  if (!result.ok) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', fieldErrors: result.errors },
      { status: 400 },
    )
  }

  const { name, email, message: story } = result.data
  const videoUrl = typeof body?.videoUrl === 'string' && /^https?:\/\//.test(body.videoUrl) ? body.videoUrl : undefined
  const slugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'story'

  try {
    const writeClient = createClient({
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: '2025-01-01',
      token,
      useCdn: false,
    })

    await writeClient.create({
      _type: 'testimony',
      title: `${name}'s story`,
      slug: { _type: 'slug', current: `${slugBase}-${Date.now()}` },
      person: { name },
      story: story.split(/\n{2,}/).map((paragraph, i) => ({
        _type: 'block',
        _key: `p${i}`,
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: `s${i}`, text: paragraph.trim(), marks: [] }],
      })),
      videoUrl,
      status: 'pending',
      featured: false,
      publishedAt: new Date().toISOString(),
    })

    await new Resend(env.RESEND_API_KEY).emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.RESEND_TO_EMAIL,
      replyTo: email,
      subject: `New story submission from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `Video: ${videoUrl ?? '—'}`, '', story, '', 'Review in Sanity Studio.'].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[submit-testimony] failed', error)
    return NextResponse.json({ error: 'We couldn’t save your story. Please try again.' }, { status: 502 })
  }
}
