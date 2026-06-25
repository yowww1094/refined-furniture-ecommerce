import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // We'll use remote patterns for Supabase storage
    // Replace with your actual Supabase project URL when available
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Optional: experimental typed routes
  // experimental: {
  //   typedRoutes: true,
  // },
};

export default nextConfig;