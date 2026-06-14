import Link from 'next/link'
import {
  getFeaturedTestimony,
  getRecentTestimonies,
  getSiteSettings,
} from '@/lib/sanity'

export default async function Home() {
  const [settings, featured, recent] = await Promise.all([
    getSiteSettings(),
    getFeaturedTestimony(),
    getRecentTestimonies(),
  ])

  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#2a2a27]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#a57865]">
          TSTMNY
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          {settings?.heroHeadline ?? 'Every testimony continues the cycle.'}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-8 text-[#2f3f34]">
          {settings?.heroSubheading ?? 'Faith. Discipline. Movement.'}
        </p>

        <Link
          href={settings?.ctaLink ?? '/testimonies'}
          className="mt-12 rounded-full bg-[#2f3f34] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#fbf8ef] transition hover:opacity-90"
        >
          {settings?.ctaText ?? 'Watch Testimonies'}
        </Link>
      </section>

      {featured && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
            Featured Testimony
          </p>

          <Link
            href={`/testimonies/${featured.slug.current}`}
            className="block rounded-3xl bg-[#2f3f34] p-8 text-[#fbf8ef] transition hover:opacity-95 md:p-12"
          >
            <p className="text-sm uppercase tracking-wide text-[#e6d7b8]">
              {featured.category}
            </p>

            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              {featured.title}
            </h2>

            <p className="mt-4 text-lg text-[#e6d7b8]">
              {featured.person?.name}
            </p>

            {featured.shortDescription && (
              <p className="mt-8 max-w-2xl text-xl leading-8 text-[#fbf8ef]/80">
                {featured.shortDescription}
              </p>
            )}
          </Link>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#a57865]">
              Recent
            </p>
            <h2 className="text-3xl font-semibold">Latest testimonies</h2>
          </div>

          <Link href="/testimonies" className="text-sm font-semibold text-[#2f3f34]">
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {recent.map((testimony: any) => (
            <Link
              key={testimony._id}
              href={`/testimonies/${testimony.slug.current}`}
              className="rounded-2xl border border-[#e6d7b8] bg-white/60 p-6 transition hover:bg-white"
            >
              <p className="text-sm uppercase tracking-wide text-[#a57865]">
                {testimony.category}
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                {testimony.title}
              </h3>

              <p className="mt-2 text-[#2f3f34]">
                {testimony.person?.name}
              </p>

              {testimony.shortDescription && (
                <p className="mt-4 text-[#2a2a27]/70">
                  {testimony.shortDescription}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}