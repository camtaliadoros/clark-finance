/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['clarkfinance.wordifysites.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'clarkfinance.wordifysites.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
