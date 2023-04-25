/** @type {import('next').NextConfig} */
const commonRuntimeConfig = {
  ENV: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL || 'https://ecosystem.osinit.net/api/v1',
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
