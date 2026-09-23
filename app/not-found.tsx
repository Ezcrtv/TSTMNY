import ArrowLink from '@/components/ui/ArrowLink'

export default function NotFound() {
  return (
    <section className="container page-head" style={{ minHeight: '80svh' }}>
      <p className="eyebrow">404</p>
      <h1 className="t-h1" style={{ marginTop: 'var(--space-5)', maxWidth: '14ch' }}>
        This page isn’t here.
      </h1>
      <p className="t-body-lg muted prose" style={{ marginTop: 'var(--space-6)' }}>
        The story may have moved, or the link may be wrong. The archive is a good place to start again.
      </p>
      <div style={{ marginTop: 'var(--space-7)' }}>
        <ArrowLink href="/testimony" variant="primary">
          Browse stories
        </ArrowLink>
      </div>
    </section>
  )
}
