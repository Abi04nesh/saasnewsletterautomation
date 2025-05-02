/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.beehiiv.com",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable page level static optimization
  poweredByHeader: false,
  
  // Enable static optimization and code splitting
  experimental: {
    optimizeCss: true,    // Enables CSS optimization
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb'
    },
    optimizePackageImports: ['@mui/material', '@nextui-org/react', 'recharts'],
    optimizeServerReact: true,
    scrollRestoration: true,
    runtime: 'experimental-edge',
  },

  // Optimize loading of third-party scripts
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },

  // Enable gzip compression
  compress: true,
};

export default nextConfig;
