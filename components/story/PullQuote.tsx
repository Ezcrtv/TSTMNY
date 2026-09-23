import Reveal from '@/components/ui/Reveal'

type Props = {
  quote: string
  name?: string
  detail?: string
  className?: string
}

export default function PullQuote({ quote, name, detail, className }: Props) {
  return (
    <Reveal as="figure" className={className}>
      <blockquote className="pullquote">
        <p>{quote}</p>
      </blockquote>
      {name && (
        <figcaption className="pullquote__cite t-caption">
          {name}
          {detail && <span className="muted"> — {detail}</span>}
        </figcaption>
      )}
    </Reveal>
  )
}
