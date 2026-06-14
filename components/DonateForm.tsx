'use client'

import { useState } from 'react'

export default function DonateForm() {
  const [amount, setAmount] = useState('25')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  async function handleDonate() {
    setStatus('loading')

    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })

    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="mt-12 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6 text-left">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#a57865]">
        Choose an amount
      </p>

      <div className="grid grid-cols-3 gap-3">
        {['10', '25', '50'].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setAmount(preset)}
            className={`rounded-xl border border-[#e6d7b8] px-4 py-4 text-lg font-semibold transition ${
              amount === preset ? 'bg-[#2f3f34] text-[#fbf8ef]' : 'bg-[#fbf8ef] hover:bg-white'
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>

      <input
        type="number"
        min="1"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        placeholder="Custom amount"
        className="mt-4 w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
      />

      <button
        type="button"
        disabled={status === 'loading'}
        onClick={handleDonate}
        className="mt-6 w-full rounded-full bg-[#2f3f34] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]"
      >
        {status === 'loading' ? 'Redirecting...' : 'Continue to Donation'}
      </button>

      {status === 'error' && (
        <p className="mt-4 text-center text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}