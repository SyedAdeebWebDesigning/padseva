/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
    enableUndici: true, // For better HTTP client performance in server components
  },
};

export default nextConfig;
