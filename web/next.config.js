/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    localeDetection: false,
  },
  experimental: {
    // Ensure proper transpilation of server components
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
