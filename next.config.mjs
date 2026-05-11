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
      // Journal -> Blog 301s. The /journal surface was built then folded
      // back into /blog after the user clarified intent was for editorial
      // content to live INSIDE the existing blog. These permanent
      // redirects catch any externally shared /journal URL from the
      // brief window it was live and resolve it to the canonical /blog
      // location.
      { source: '/journal',                                          destination: '/blog',                                          permanent: true },
      { source: '/journal/category/process-craft',                   destination: '/blog/category/platform-comparisons',            permanent: true },
      { source: '/journal/category/industry',                        destination: '/blog/category/creative-engineering',            permanent: true },
      { source: '/journal/category/case-study',                      destination: '/work',                                          permanent: true },
      { source: '/journal/argentine-creative-engineering-tradition', destination: '/blog/argentine-creative-engineering-tradition', permanent: true },
      { source: '/journal/webflow-vs-framer-2026',                   destination: '/blog/webflow-vs-framer-in-2026',                permanent: true },
      // Catch-all for any other /journal/<slug> URLs. Sends them to
      // /blog index so the reader still lands somewhere useful.
      { source: '/journal/:slug*',                                   destination: '/blog',                                          permanent: true },
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
