import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      { source: '/testimonies', destination: '/testimony', permanent: true },
      { source: '/testimonies/:slug', destination: '/testimony/:slug', permanent: true },
    ]
  },
}

export default nextConfig
