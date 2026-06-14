'use client'

import { useState } from 'react'

export default function SubmitTestimonyForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const formData = new FormData(event.currentTarget)

    const response = await fetch('/api/submit-testimony', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        story: formData.get('story'),
        videoUrl: formData.get('videoUrl'),
      }),
    })

    setStatus(response.ok ? 'success' : 'error')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6">
      <h2 className="text-2xl font-semibold">Share your testimony</h2>

      <input name="name" required type="text" placeholder="Your name" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <input name="email" required type="email" placeholder="Email address" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <textarea name="story" required placeholder="Your testimony" rows={6} className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <input name="videoUrl" type="url" placeholder="Video URL optional" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />

      <button disabled={status === 'loading'} type="submit" className="rounded-full bg-[#2f3f34] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]">
        {status === 'loading' ? 'Submitting...' : 'Submit Testimony'}
      </button>

      {status === 'success' && <p className="text-sm text-[#2f3f34]">Testimony submitted for review.</p>}
      {status === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try again.</p>}
    </form>
  )
}