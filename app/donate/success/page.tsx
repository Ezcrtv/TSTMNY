import Link from 'next/link'

export default function DonateSuccessPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          Thank You
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          Donation received.
        </h1>

        <p className="mt-6 text-lg leading-8 text-[#2a2a27]/70">
          Thank you for supporting TSTMNY and helping share real stories of faith.
        </p>

        <Link
          href="/testimonies"
          className="mt-10 inline-block rounded-full bg-[#2f3f34] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef]"
        >
          Watch Testimonies
        </Link>
      </section>
    </main>
  )
}