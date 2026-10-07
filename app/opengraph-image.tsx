import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

/**
 * Link preview (WhatsApp, iMessage, social) for the site: the homepage hero —
 * wordmark and purpose line on khaki. Generated at build time, so it follows
 * changes to `site.name` / `site.purpose`. Testimony pages set their own image.
 */
export const alt = `${site.name} — ${site.purpose}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const font = await readFile(join(process.cwd(), 'assets/fonts/MonaSans-Regular.ttf'))
  const lines = site.purpose.split('. ').map((line, i, all) => (i < all.length - 1 ? `${line}.` : line))

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 420,
          background: '#cfc3a8',
          fontFamily: 'Mona Sans',
        }}
      >
        <div style={{ display: 'flex', fontSize: 172, lineHeight: 0.9, letterSpacing: '-0.06em', color: '#f8f7f2', marginLeft: -10 }}>
          {site.name}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 36, fontSize: 38, lineHeight: 1.08, color: '#161712' }}>
          {lines.map((line) => (
            <span key={line}>{line.toUpperCase()}</span>
          ))}
        </div>
        <div style={{ display: 'flex', marginTop: 30, marginLeft: 150, maxWidth: 360, fontSize: 21, lineHeight: 1.45, color: '#161712' }}>
          {site.intro}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Mona Sans', data: font, style: 'normal', weight: 400 }] },
  )
}
