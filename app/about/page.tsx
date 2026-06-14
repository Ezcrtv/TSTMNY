import { getSiteSettings } from '@/lib/sanity'

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          About
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          About TSTMNY
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-8 text-[#2a2a27]/80">
          {settings?.aboutContent ? (
            settings.aboutContent.map((block: any) => (
              <p key={block._key}>
                {block.children?.map((child: any) => child.text).join('')}
              </p>
            ))
          ) : (
            <p>
              TSTMNY is a testimony-centered platform built around authentic stories of faith, discipline, and movement.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}