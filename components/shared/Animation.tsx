"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface AnimationProps {}

const Animation = ({}: AnimationProps) => {
	const { scrollY } = useScroll();

	const scrollRange = [119, 120];

	const leaf1X = useTransform(scrollY, scrollRange, [0, -240]);
	const leaf1Y = useTransform(scrollY, scrollRange, [0, -240]);
	const leaf2X = useTransform(scrollY, scrollRange, [0, 240]);
	const leaf2Y = useTransform(scrollY, scrollRange, [0, -240]);
	const leaf3X = useTransform(scrollY, scrollRange, [0, -240]);
	const leaf3Y = useTransform(scrollY, scrollRange, [0, 240]);
	const leaf4X = useTransform(scrollY, scrollRange, [0, 240]);
	const leaf4Y = useTransform(scrollY, scrollRange, [0, 240]);
	return (
		<div>
			<motion.div
				initial={{ x: -100 }}
				animate={{ x: 0 }}
				className="flowers-topleft"
				style={{
					x: leaf1X,
					y: leaf1Y,
					display: "block",
					zIndex: 0,
				}}
			/>
			<motion.div
				initial={{ x: 100 }}
				animate={{ x: 0 }}
				className="flowers-topright"
				style={{
					x: leaf2X,
					y: leaf2Y,
					display: "block",
					zIndex: 0,
				}}
			/>
			<motion.div
				initial={{ x: -100 }}
				animate={{ x: 0 }}
				className="flowers-bottomleft"
				style={{
					x: leaf3X,
					y: leaf3Y,
					display: "block",
					zIndex: 0,
				}}
			/>
			<motion.div
				initial={{ x: 100 }}
				animate={{ x: 0 }}
				className="flowers-bottomright"
				style={{
					x: leaf4X,
					y: leaf4Y,
					display: "block",
					zIndex: 0,
				}}
			/>
		</div>
	);
};

export default Animation;
