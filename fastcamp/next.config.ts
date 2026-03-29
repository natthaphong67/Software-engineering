/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
    // ✅ อนุญาต private IP (localhost)
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

module.exports = nextConfig;