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
  // Long-lived caching for the static assets under public/. Without this
  // the platform serves them `max-age=0, must-revalidate`, so every repeat
  // visit re-validates every font, video and image over the network.
  // Fonts and videos are immutable under a given filename; images can be
  // re-exported in place, so they get a shorter TTL plus revalidation.
  async headers() {
    const immutable = 'public, max-age=31536000, immutable'
    const revalidating = 'public, max-age=2592000, stale-while-revalidate=86400'
    return [
      { source: '/fonts/:path*',  headers: [{ key: 'Cache-Control', value: immutable }] },
      { source: '/videos/:path*', headers: [{ key: 'Cache-Control', value: immutable }] },
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: revalidating }] },
      { source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: revalidating }] },
      { source: '/badges/:path*', headers: [{ key: 'Cache-Control', value: revalidating }] },
    ]
  },
  async rewrites() {
    return [
      { source: '/for',          destination: '/lp/index.html' },
      { source: '/for-agencies', destination: '/lp/agencies.html' },
      { source: '/for-startups', destination: '/lp/startups.html' },
      { source: '/for-saas',     destination: '/lp/saas.html' },
      { source: '/for-ecommerce',destination: '/lp/ecommerce.html' },
    ]
  },
  async redirects() {
    return [
      // Campaign aliases. These used to REWRITE to the same HTML as their
      // canonical sibling, which published several URLs serving identical
      // uncanonicalized content. Redirecting instead leaves one indexable
      // URL per landing and consolidates link equity onto it; query strings
      // (and therefore ad-campaign parameters) carry across a redirect.
      { source: '/for-founders', destination: '/for-startups',  permanent: true },
      { source: '/for-dtc',      destination: '/for-ecommerce', permanent: true },
      { source: '/for-shopify',  destination: '/for-ecommerce', permanent: true },
      // Short aliases. Permanent so the destination accumulates the signals
      // rather than each temporary hop holding onto them.
      { source: '/agencies-lp',  destination: '/for-agencies',  permanent: true },
      { source: '/startups',     destination: '/for-startups',  permanent: true },
      { source: '/founders',     destination: '/for-startups',  permanent: true },
      { source: '/mvp',          destination: '/for-startups',  permanent: true },
      { source: '/saas',         destination: '/for-saas',      permanent: true },
      { source: '/ecommerce',    destination: '/for-ecommerce', permanent: true },
      { source: '/dtc',          destination: '/for-ecommerce', permanent: true },
      { source: '/shopify',      destination: '/for-ecommerce', permanent: true },
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
