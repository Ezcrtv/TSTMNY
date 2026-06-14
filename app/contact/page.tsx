export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          Contact
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          Get in touch.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2a2a27]/70">
          Have a question, want to connect, or feel called to share your testimony?
          Send us a message below.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <form className="space-y-4 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Contact us</h2>

            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <textarea
              placeholder="Your message"
              rows={5}
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <button
              type="button"
              className="rounded-full bg-[#2f3f34] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]"
            >
              Send Message
            </button>
          </form>

          <form className="space-y-4 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6">
            <h2 className="text-2xl font-semibold">Share your testimony</h2>

            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <textarea
              placeholder="Your testimony"
              rows={6}
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <input
              type="url"
              placeholder="Video URL optional"
              className="w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
            />

            <button
              type="button"
              className="rounded-full bg-[#2f3f34] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]"
            >
              Submit Testimony
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}