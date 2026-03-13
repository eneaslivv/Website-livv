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
    ],
  },
}

export default analyze(nextConfig)
