"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import flowerImage from "/public/flowers.webp"; // Ensure correct path to the image
import leaf from "/public/leaf.webp"; // Ensure correct path to the image

const HeroSection: React.FC = () => {
	const { scrollY } = useScroll();

	// Adjust transform ranges for enhanced parallax effect towards corners
	const leaf1X = useTransform(scrollY, [0, 1000], [0, -200]);
	const leaf1Y = useTransform(scrollY, [0, 1000], [0, -200]);
	const leaf2X = useTransform(scrollY, [0, 1000], [0, 200]);
	const leaf2Y = useTransform(scrollY, [0, 1000], [0, -200]);
	const leaf3X = useTransform(scrollY, [0, 1000], [0, -200]);
	const leaf3Y = useTransform(scrollY, [0, 1000], [0, 200]);
	const leaf4X = useTransform(scrollY, [0, 1000], [0, 200]);
	const leaf4Y = useTransform(scrollY, [0, 1000], [0, 200]);

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
				className="fixed z-10"
				style={{ top: "0", left: "0", x: leaf1X, y: leaf1Y }}>
				<Image
					src={flowerImage}
					alt="Flower Top Left"
					width={600}
					height={600}
					className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[600px] h-auto"
				/>
			</motion.div>

			<motion.div
				className="fixed z-10"
				style={{ top: "0", right: "0", x: leaf2X, y: leaf2Y }}>
				<Image
					src={leaf}
					alt="Flower Top Right"
					width={600}
					height={600}
					className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[600px] h-auto"
				/>
			</motion.div>

			<motion.div
				className="fixed z-10"
				style={{ bottom: "0", left: "0", x: leaf3X, y: leaf3Y }}>
				<Image
					src={leaf}
					alt="Flower Bottom Left"
					width={600}
					height={600}
					className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[600px] h-auto"
				/>
			</motion.div>

			<motion.div
				className="fixed z-10"
				style={{ bottom: "0", right: "0", x: leaf4X, y: leaf4Y }}>
				<Image
					src={flowerImage}
					alt="Flower Bottom Right"
					width={600}
					height={600}
					className="w-[200px] sm:w-[300px] md:w-[350px] lg:w-[600px] h-auto"
				/>
			</motion.div>
		</div>
	);
};

export default HeroSection;
