/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
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
