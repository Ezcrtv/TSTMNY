'use client'

export default function SubmitTestimonyForm() {
  return (
    <form className="space-y-4 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6">
      <h2 className="text-2xl font-semibold">Share your testimony</h2>

      <input type="text" placeholder="Your name" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <input type="email" placeholder="Email address" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <textarea placeholder="Your testimony" rows={6} className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />
      <input type="url" placeholder="Video URL optional" className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none" />

      <button type="button" className="rounded-full bg-[#2f3f34] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]">
        Submit Testimony
      </button>
    </form>
  )
}