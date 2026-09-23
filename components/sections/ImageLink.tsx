import Image from 'next/image'
import Link from 'next/link'

type Props = {
  href: string
  label: string
  image: { src: string; alt?: string; position?: string }
}

/** Full-bleed image with a centred label; the whole band is the link. */
export default function ImageLink({ href, label, image }: Props) {
  return (
    <Link href={href} className="image-link hover-zoom">
      <span className="media image-link__media">
        <Image src={image.src} alt="" fill sizes="100vw" style={{ objectPosition: image.position ?? '50% 50%' }} />
      </span>
      <span className="image-link__label">{label}</span>
    </Link>
  )
}
