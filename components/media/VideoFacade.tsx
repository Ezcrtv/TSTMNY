'use client'

import Image from 'next/image'
import { useState } from 'react'
import { parseVideo } from '@/lib/video'

type Props = {
  /** YouTube, Vimeo, or direct file URL. Empty renders an "in production" state. */
  url?: string
  poster: string
  posterAlt: string
  title: string
  /** Short line shown over the poster. */
  label?: string
  /** WebVTT captions for direct video files. */
  captions?: string
  sizes?: string
}

/**
 * Click-to-load video. Only the poster loads with the page; the player (and any
 * third-party script) mounts after the visitor presses play. Never autoplays on load.
 */
export default function VideoFacade({ url, poster, posterAlt, title, label, captions, sizes = '100vw' }: Props) {
  const video = parseVideo(url)
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle')

  return (
    <div className="video">
      {state === 'idle' && (
        <>
          <Image src={poster} alt={posterAlt} fill sizes={sizes} />
          <button
            type="button"
            className="video__trigger"
            onClick={() => setState('loading')}
            disabled={!video}
            aria-label={video ? `Play film: ${title}` : `${title} — film in production`}
          >
            <span className="stack-2">
              <span className="t-meta" style={{ display: 'block', opacity: 0.85 }}>
                {video ? 'Watch the film' : 'Film in production'}
              </span>
              {label && (
                <span className="serif" style={{ display: 'block', fontSize: 'var(--text-h3)', lineHeight: 1.1 }}>
                  {label}
                </span>
              )}
            </span>
            {video && (
              <span className="video__play" aria-hidden="true">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor">
                  <path d="M17 10 1 19V1l16 9Z" />
                </svg>
              </span>
            )}
          </button>
        </>
      )}

      {state !== 'idle' && video && (
        <>
          {state === 'loading' && <span className="video__loading" role="status" aria-label="Loading video" />}
          {video.kind === 'embed' ? (
            <iframe
              src={video.src}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              //allowFullScreen
              onLoad={() => setState('playing')}
            />
          ) : (
            <video
              src={video.src}
              poster={poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              onCanPlay={() => setState('playing')}
            >
              {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
            </video>
          )}
        </>
      )}
    </div>
  )
}
