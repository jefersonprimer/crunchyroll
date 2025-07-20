const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgsrv.crunchyroll.com', 'www.crunchyroll.com', 'res.cloudinary.com', 'a.storyblok.com'],
  },
};

module.exports = withNextIntl(nextConfig);