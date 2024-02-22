/** @type {import('next').NextConfig} */
/** @type {import('next-pwa').PWAConfig} */
import PWA from 'next-pwa';
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

export const withPWA = PWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

export default nextConfig;
