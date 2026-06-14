import { notFound } from 'next/navigation'
import { getTestimonyBySlug } from '@/lib/sanity'

export default async function TestimonyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const testimony = await getTestimonyBySlug(slug)

  if (!testimony) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <article className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          {testimony.category}
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          {testimony.title}
        </h1>

        <p className="mt-6 text-xl text-[#2f3f34]">
          {testimony.person?.name}
        </p>

        {testimony.shortDescription && (
          <p className="mt-8 text-2xl leading-relaxed text-[#2a2a27]/80">
            {testimony.shortDescription}
          </p>
        )}

        {testimony.story && (
          <div className="mt-12 space-y-4 text-lg leading-8 text-[#2a2a27]/80">
            {testimony.story.map((block: any) => (
              <p key={block._key}>
                {block.children?.map((child: any) => child.text).join('')}
              </p>
            ))}
          </div>
        )}
      </article>
    </main>
  )
}