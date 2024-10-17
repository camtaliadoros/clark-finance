/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOST_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
