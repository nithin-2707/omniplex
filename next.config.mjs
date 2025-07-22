/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Skip dynamic routes during export since they're not needed for Stripe demo
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/success': { page: '/success' },
      '/cancel': { page: '/cancel' },
    };
  },
};

export default nextConfig;
