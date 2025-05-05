/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "media.beehiiv.com",
      },
      {
        protocol: 'https',
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
    serverActions: true,   // Enable server actions with default configuration
    optimizePackageImports: ['@mui/material', '@nextui-org/react', 'recharts'],
    optimizeServerReact: true,
    scrollRestoration: true
  },

  // Optimize loading of third-party scripts
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in production
  },

  // Enable gzip compression
  compress: true,
};

export default nextConfig;
