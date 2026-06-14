export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          Donate
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          Support the mission.
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#2a2a27]/70">
          Your gift helps TSTMNY share real stories of faith, hope, and transformation.
        </p>

        <div className="mt-12 rounded-3xl border border-[#e6d7b8] bg-white/60 p-6 text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#a57865]">
            Choose an amount
          </p>

          <div className="grid grid-cols-3 gap-3">
            {['10', '25', '50'].map((amount) => (
              <button
                key={amount}
                type="button"
                className="rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-4 text-lg font-semibold transition hover:bg-white"
              >
                ${amount}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Custom amount"
            className="mt-4 w-full rounded-xl border border-[#e6d7b8] bg-[#fbf8ef] px-4 py-3 outline-none"
          />

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#2f3f34] px-6 py-4 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]"
          >
            Continue to Donation
          </button>

          <p className="mt-4 text-center text-sm text-[#2a2a27]/60">
            Secure payment processing coming soon.
          </p>
        </div>
      </section>
    </main>
  )
}