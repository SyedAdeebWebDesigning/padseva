"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { FC, ReactNode, useRef, useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export interface TextRevealProps {
	children: string;
	className?: string;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	const [buttonVisible, setButtonVisible] = useState(false);

	// Set the button visible when all words are revealed (scrollYProgress is close to 1)
	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((value) => {
			if (value >= 0.9) {
				setButtonVisible(true); // Show button when the scroll progress is 90%
			} else {
				setButtonVisible(false); // Hide button when it's less than 90%
			}
		});

		// Cleanup the subscription
		return () => {
			unsubscribe();
		};
	}, [scrollYProgress]);

	const words = children.split(" ");

	return (
		<div ref={targetRef} className={cn("relative z-0 h-[120vh]", className)}>
			<div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]">
				<div className="flex flex-wrap p-5 times-new-roman text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl items-center justify-center">
					{words.map((word, i) => {
						const start = i / words.length;
						const end = start + 1 / words.length;
						return (
							<Word key={i} progress={scrollYProgress} range={[start, end]}>
								{word}
							</Word>
						);
					})}
					<motion.div className="relative bg-[#91373e] text-white hover:bg-[#7a2d33] transition-all mx-auto mt-5 rounded">
						<Link
							href={"https://forms.gle/krLx3a1jsAZ38bcM9"}
							target="_blank"
							className={cn(
								buttonVariants({ variant: "padseva", size: "lg" }),
								"relative bg-[#91373e] text-white hover:bg-[#7a2d33] transition-all "
							)}>
							<p className="">Donate Now</p>
							<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
						</Link>
						<div className="absolute bottom-0 z-50">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
								<path
									fill="#0099ff"
									fillOpacity="1"
									d="M0,224L80,234.7C160,245,320,267,480,250.7C640,235,800,181,960,138.7C1120,96,1280,64,1360,48L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
							</svg>
						</div>
					</motion.div>
				</div>
			</div>
			<img
				src="/assets/wave.svg"
				className="absolute bottom-0 w-[100vw] left-0"
				alt=""
			/>
		</div>
	);
};

interface WordProps {
	children: ReactNode;
	progress: MotionValue<number>;
	range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
	const opacity = useTransform(progress, range, [0, 1]);

	return (
		<span className="xl:lg-3 relative mx-1 lg:mx-1.5">
			<span className="absolute opacity-30">{children}</span>
			<motion.span
				style={{
					opacity: opacity,
					transition: "opacity 0.5s ease-out", // Added smooth easing for opacity change
				}}
				className={"text-black dark:text-white time-new-roman"}>
				{children}
			</motion.span>
		</span>
	);
};
