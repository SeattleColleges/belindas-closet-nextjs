/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    // TODO: PULL THIS FROM GITHUB ACTIONS
    BELINDAS_API_URL: "https://belindascloset.com/api",
  },
};

module.exports = nextConfig;
