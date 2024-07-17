/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  //reactStrictMode: false, // Uncomment to test API behavior using front-end
  env: {
    // variable call would be process.env.BELINDAS_CLOSET_PUBLIC_API_URL,
    BELINDAS_CLOSET_PUBLIC_API_URL: "https://belindascloset.com/api",
  },
};

module.exports = nextConfig;
