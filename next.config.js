/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    experimental: {
    forceSwcTransforms: true,
  }
}

module.exports = nextConfig
