/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/**' },
    ],
  },
  // Faster build: skip ESLint during build (run `npm run lint` separately)
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
