import Link from 'next/link'
import { getAllTestimonies } from '@/lib/sanity'

export default async function TestimoniesPage() {
  const testimonies = await getAllTestimonies()

  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          Testimonies
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          Real stories of faith.
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonies.map((testimony: any) => (
            <Link
              key={testimony._id}
              href={`/testimonies/${testimony.slug.current}`}
              className="rounded-2xl border border-[#e6d7b8] bg-white/60 p-6 transition hover:bg-white"
            >
              <p className="text-sm uppercase tracking-wide text-[#a57865]">
                {testimony.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {testimony.title}
              </h2>
              <p className="mt-2 text-[#2f3f34]">
                {testimony.person?.name}
              </p>
              <p className="mt-4 text-[#2a2a27]/70">
                {testimony.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}