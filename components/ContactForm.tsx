'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const formData = new FormData(event.currentTarget)

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    })

    setStatus(response.ok ? 'success' : 'error')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6">
      <h2 className="text-2xl font-semibold">Contact us</h2>

      <input name="name" required type="text" placeholder="Your name" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <input name="email" required type="email" placeholder="Email address" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <textarea name="message" required placeholder="Your message" rows={5} className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />

      <button disabled={status === 'loading'} type="submit" className="rounded-full bg-[#2f3f34] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && <p className="text-sm text-[#2f3f34]">Message sent successfully.</p>}
      {status === 'error' && <p className="text-sm text-red-700">Something went wrong. Please try again.</p>}
    </form>
  )
}