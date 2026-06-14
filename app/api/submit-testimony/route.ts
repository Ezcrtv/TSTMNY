import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_TOKEN?.trim(),
  useCdn: false,
})

export async function POST(request: Request) {
  try {
    const { name, email, story, videoUrl } = await request.json()

    if (!name || !email || !story) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }


    await writeClient.create({
      _type: 'testimony',
      title: `${name}'s Testimony`,
      slug: {
        _type: 'slug',
        current: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      },
      person: {
        name,
      },
      story: [
        {
          _type: 'block',
          _key: 'story',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'text',
              text: story,
            },
          ],
          markDefs: [],
        },
      ],
      videoUrl: videoUrl || undefined,
      category: 'other',
      status: 'pending',
      featured: false,
      publishedAt: new Date().toISOString(),
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `New testimony submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Video URL: ${videoUrl || 'None'}

Story:
${story}

Review this submission in Sanity Studio.
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit testimony error:', error)

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}