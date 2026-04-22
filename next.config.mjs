import withBundleAnalyzer from '@next/bundle-analyzer'

const analyze = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      { source: '/for',          destination: '/lp/index.html' },
      { source: '/for-agencies', destination: '/lp/agencies.html' },
      { source: '/for-startups', destination: '/lp/startups.html' },
      { source: '/for-founders', destination: '/lp/startups.html' },
      { source: '/for-saas',     destination: '/lp/saas.html' },
      { source: '/for-ecommerce',destination: '/lp/ecommerce.html' },
      { source: '/for-dtc',      destination: '/lp/ecommerce.html' },
      { source: '/for-shopify',  destination: '/lp/ecommerce.html' },
    ]
  },
  async redirects() {
    return [
      { source: '/agencies-lp',  destination: '/for-agencies',  permanent: false },
      { source: '/startups',     destination: '/for-startups',  permanent: false },
      { source: '/founders',     destination: '/for-startups',  permanent: false },
      { source: '/mvp',          destination: '/for-startups',  permanent: false },
      { source: '/saas',         destination: '/for-saas',      permanent: false },
      { source: '/ecommerce',    destination: '/for-ecommerce', permanent: false },
      { source: '/dtc',          destination: '/for-ecommerce', permanent: false },
      { source: '/shopify',      destination: '/for-ecommerce', permanent: false },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ngswutcpsgdgmmjnfddi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'heade-livv-page.vercel.app',
        pathname: '/images/**',
      },
    ],
  },
}

export default analyze(nextConfig)
