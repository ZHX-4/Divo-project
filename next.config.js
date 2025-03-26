/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add your image domains if loading from external URLs
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // ...other config options
}

module.exports = nextConfig