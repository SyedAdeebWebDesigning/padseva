"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection: React.FC = () => {
	const { scrollY } = useScroll();

	// Adjust transform ranges for enhanced parallax effect towards corners
	const leaf1X = useTransform(scrollY, [0, 1000], [0, -350]);
	const leaf1Y = useTransform(scrollY, [0, 1000], [0, -350]);
	const leaf2X = useTransform(scrollY, [0, 1000], [0, 350]);
	const leaf2Y = useTransform(scrollY, [0, 1000], [0, -350]);
	const leaf3X = useTransform(scrollY, [0, 1000], [0, -350]);
	const leaf3Y = useTransform(scrollY, [0, 1000], [0, 350]);
	const leaf4X = useTransform(scrollY, [0, 1000], [0, 350]);
	const leaf4Y = useTransform(scrollY, [0, 1000], [0, 350]);

	return (
		<div className="relative h-screen bg-[#F7E7EF] overflow-hidden flex items-center justify-center">
			{/* Background text/logo */}
			<div className="absolute text-center z-20">
				<h1 className="text-[#91373E] font-bold oswald-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
					Padseva
				</h1>
			</div>

			{/* Moving flower images with fixed positioning */}
			<motion.div
				className="flowers-topleft"
				style={{ x: leaf1X, y: leaf1Y, display: "block" }}
			/>

			<motion.div
				className="flowers-topright"
				style={{ x: leaf2X, y: leaf2Y, display: "block" }}
			/>

			<motion.div
				className="flowers-bottomleft"
				style={{ x: leaf3X, y: leaf3Y, display: "block" }}
			/>

			<motion.div
				className="flowers-bottomright"
				style={{ x: leaf4X, y: leaf4Y, display: "block" }}
			/>
		</div>
	);
};

export default HeroSection;
