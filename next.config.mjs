/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['firebase-admin'],
  // Render metadata in <head> for every visitor rather than streaming it into
  // <body>, so crawlers and Lighthouse find the meta description
  htmlLimitedBots: /.*/,
  images: {
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
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
