import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseVideo } from '../lib/video.ts'

test('parses YouTube URLs', () => {
  for (const url of ['https://www.youtube.com/watch?v=abc123XYZ_-', 'https://youtu.be/abc123XYZ_-', 'https://youtube.com/shorts/abc123XYZ_-']) {
    const v = parseVideo(url)
    assert.equal(v?.kind, 'embed')
    assert.match(v!.src, /^https:\/\/www\.youtube-nocookie\.com\/embed\/abc123XYZ_-\?/)
  }
})

test('parses Vimeo URLs', () => {
  const v = parseVideo('https://vimeo.com/123456789')
  assert.equal(v?.kind, 'embed')
  assert.match(v!.src, /^https:\/\/player\.vimeo\.com\/video\/123456789\?/)
})

test('treats other URLs as files', () => {
  assert.deepEqual(parseVideo('/videos/film.mp4'), { kind: 'file', src: '/videos/film.mp4' })
})

test('returns null for empty input', () => {
  assert.equal(parseVideo(''), null)
  assert.equal(parseVideo(undefined), null)
})
