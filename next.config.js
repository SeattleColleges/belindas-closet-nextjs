/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    // variable call would be process.env.BELINDAS_CLOSET_PUBLIC_API_URL,
    BELINDAS_CLOSET_PUBLIC_API_URL: "https://belindascloset.com/api",
  },
};

module.exports = nextConfig;
