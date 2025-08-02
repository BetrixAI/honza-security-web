/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
  // Exclude Firebase Functions from Next.js build
  webpack: (config, { isServer }) => {
    // Ignore functions directory during TypeScript compilation
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('./functions/**')
    }
    return config
  },
  // Exclude functions directory from TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
  // Use custom tsconfig that excludes functions
  experimental: {
    typedRoutes: false,
  }
}

module.exports = nextConfig 