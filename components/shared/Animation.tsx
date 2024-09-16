"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface AnimationProps {}

const Animation = ({}: AnimationProps) => {
	const { scrollY } = useScroll();

	// Define scroll range for the animation
	const scrollRange = [119, 120]; // Adjust this range as needed for more sensitivity

	// Check if the screen is larger than a specific width
	const isSmallScreen = useMediaQuery({ minWidth: 768 }); // Adjust the breakpoint as needed

	// Set the animation distance for different screen sizes
	const animationDistance = isSmallScreen ? 260 : 100;

	// Define leaf positions based on the screen size
	const leaf1X = useTransform(scrollY, scrollRange, [0, -animationDistance]);
	const leaf1Y = useTransform(scrollY, scrollRange, [0, -animationDistance]);
	const leaf2X = useTransform(scrollY, scrollRange, [0, animationDistance]);
	const leaf2Y = useTransform(scrollY, scrollRange, [0, -animationDistance]);
	const leaf3X = useTransform(scrollY, scrollRange, [0, -animationDistance]);
	const leaf3Y = useTransform(scrollY, scrollRange, [0, animationDistance]);
	const leaf4X = useTransform(scrollY, scrollRange, [0, animationDistance]);
	const leaf4Y = useTransform(scrollY, scrollRange, [0, animationDistance]);

	return (
		<div className="z-30">
			<motion.div
				initial={{ x: isSmallScreen ? -100 : -150 }}
				animate={{ x: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flowers-topleft"
				style={{
					x: leaf1X,
					y: leaf1Y,
					display: "block",
					zIndex: 40,
				}}
			/>
			<motion.div
				initial={{ x: isSmallScreen ? 100 : 150 }}
				animate={{ x: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flowers-topright"
				style={{
					x: leaf2X,
					y: leaf2Y,
					display: "block",
					zIndex: 40,
				}}
			/>
			<motion.div
				initial={{ x: isSmallScreen ? -100 : -150 }}
				animate={{ x: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flowers-bottomleft"
				style={{
					x: leaf3X,
					y: leaf3Y,
					display: "block",
					zIndex: 40,
				}}
			/>
			<motion.div
				initial={{ x: isSmallScreen ? 100 : 150 }}
				animate={{ x: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flowers-bottomright"
				style={{
					x: leaf4X,
					y: leaf4Y,
					display: "block",
					zIndex: 40,
				}}
			/>
		</div>
	);
};

export default Animation;
