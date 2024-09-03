"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface AnimationProps {}

const Animation = ({}: AnimationProps) => {
	const { scrollY } = useScroll();

	// Use a short scroll range to achieve instant movement effect
	const scrollRange = [0, 100]; // Adjust the end value to control the sensitivity

	// Transform the positions quickly with minimal scroll
	const leaf1X = useTransform(scrollY, scrollRange, [0, -300]);
	const leaf1Y = useTransform(scrollY, scrollRange, [0, -300]);
	const leaf2X = useTransform(scrollY, scrollRange, [0, 300]);
	const leaf2Y = useTransform(scrollY, scrollRange, [0, -300]);
	const leaf3X = useTransform(scrollY, scrollRange, [0, -300]);
	const leaf3Y = useTransform(scrollY, scrollRange, [0, 300]);
	const leaf4X = useTransform(scrollY, scrollRange, [0, 300]);
	const leaf4Y = useTransform(scrollY, scrollRange, [0, 300]);
	return (
		<div>
			<motion.div
				className="flowers-topleft"
				style={{
					x: leaf1X,
					y: leaf1Y,
					display: "block",
					zIndex: 30,
				}}
			/>
			<motion.div
				className="flowers-topright"
				style={{
					x: leaf2X,
					y: leaf2Y,
					display: "block",
					zIndex: 30,
				}}
			/>
			<motion.div
				className="flowers-bottomleft"
				style={{
					x: leaf3X,
					y: leaf3Y,
					display: "block",
					zIndex: 30,
				}}
			/>
			<motion.div
				className="flowers-bottomright"
				style={{
					x: leaf4X,
					y: leaf4Y,
					display: "block",
					zIndex: 30,
				}}
			/>
		</div>
	);
};

export default Animation;
