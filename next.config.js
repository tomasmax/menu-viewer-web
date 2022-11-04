/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['flipdish.imgix.net'],
  },
}

module.exports = nextConfig
