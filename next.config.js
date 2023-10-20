/** @type {import('next').NextConfig} */
const commonRuntimeConfig = {
  ENV: process.env.NODE_ENV || 'development',
  ADMIN_API_URL: process.env.API_URL || 'https://admin.api.pandoratradingsolutions.com/api/v1',
  QUOTES_API_URL: process.env.API_URL || 'https://quotes.api.pandoratradingsolutions.com/api/v1',
  SCREENER_API_URL: process.env.API_URL || 'https://screener.api.pandoratradingsolutions.com/api/v1',
};

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: commonRuntimeConfig,
  poweredByHeader: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  experimental: {
    appDir: false,
  },
  output: 'standalone',
}

module.exports = nextConfig
