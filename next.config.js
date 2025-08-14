/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
