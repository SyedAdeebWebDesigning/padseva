"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonRevealProps {
	children: ReactNode; // Allow ReactNode to accept any valid React children
	className?: string;
}

export const ButtonReveal: FC<ButtonRevealProps> = ({
	children,
	className,
}) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef, // track the scroll position of this specific target
	});

	// Ensure that we handle text or JSX as children
	const words = typeof children === "string" ? children.split(" ") : [children];

	return (
		<div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
			<div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
				<span className="flex flex-wrap text-2xl font-bold text-black/20 dark:text-white/20 md:text-3xl lg:text-4xl xl:text-5xl">
					{words.map((word, index) => {
						const start = index / words.length;
						const end = start + 1 / words.length;

						return (
							<Word key={index} progress={scrollYProgress} range={[start, end]}>
								{word}
							</Word>
						);
					})}
				</span>
			</div>
		</div>
	);
};

interface WordProps {
	children: ReactNode;
	progress: MotionValue<number>;
	range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
	// Animate opacity based on the scroll position (progress)
	const opacity = useTransform(progress, range, [0, 1]); // Fade in word when scroll position hits range
	const y = useTransform(progress, range, [20, 0]); // Optional: move word vertically for added effect

	return (
		<motion.span
			className="relative mx-1"
			style={{
				opacity: opacity,
				y: y, // Apply vertical movement based on scroll
			}}>
			{children}
		</motion.span>
	);
};
