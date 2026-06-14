import DonateForm from '@/components/DonateForm'

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

        <DonateForm />
      </section>
    </main>
  )
}