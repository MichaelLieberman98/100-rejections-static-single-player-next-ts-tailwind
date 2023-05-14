/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
}

module.exports = nextConfig

const withImages = require('next-images')

module.exports = withImages()