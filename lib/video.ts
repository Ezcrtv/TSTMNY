export type ParsedVideo = { kind: 'embed'; src: string } | { kind: 'file'; src: string }

const YOUTUBE = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
const VIMEO = /vimeo\.com\/(?:video\/)?(\d+)/

/** Normalises a YouTube, Vimeo, or direct file URL into something the player can mount. */
export function parseVideo(url: string | undefined): ParsedVideo | null {
  if (!url) return null

  const youtube = url.match(YOUTUBE)
  if (youtube) {
    return {
      kind: 'embed',
      src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    }
  }

  const vimeo = url.match(VIMEO)
  if (vimeo) {
    return { kind: 'embed', src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1&title=0&byline=0` }
  }

  return { kind: 'file', src: url }
}
