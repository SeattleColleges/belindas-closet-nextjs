/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  //reactStrictMode: false, // Uncomment to test API behavior using front-end
  env: {
    // Check env.local file to update API address
    BELINDAS_CLOSET_PUBLIC_API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
