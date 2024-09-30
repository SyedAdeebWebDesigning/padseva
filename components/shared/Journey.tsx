"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface JourneyProps {}

const Journey = ({}: JourneyProps) => {
	// Define initial state to hold the animated values
	const [animatedValues, setAnimatedValues] = useState<number[]>([
		0, 0, 0, 0, 0,
	]);
	const [isVisible, setIsVisible] = useState(false); // Visibility state
	const journeyRef = useRef<HTMLDivElement | null>(null); // Ref to the section

	const JourneyItems = [
		{
			title: "Bamboo Pads Synthesized",
			value: 7500,
			isMore: false,
		},
		{
			title: "Womans Met",
			value: 9000,
			isMore: true,
		},
		{
			title: "Volunteers",
			value: 30,
			isMore: false,
		},
		{
			title: "Dollars Raised",
			value: 6000,
			isMore: true,
		},
	];

	// Function to animate the numbers
	const animateNumbers = (start: number, end: number, index: number) => {
		let startTime: number | null = null;
		const duration = 2000; // Duration of the animation in milliseconds

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1); // Progress between 0 and 1

			const currentValue = Math.floor(start + (end - start) * progress);
			setAnimatedValues((prevValues) => {
				const newValues = [...prevValues];
				newValues[index] = currentValue;
				return newValues;
			});

			if (progress < 1) {
				requestAnimationFrame(animate); // Continue the animation
			}
		};

		requestAnimationFrame(animate);
	};

	// Set up the IntersectionObserver to trigger animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setIsVisible(true); // Set visible when the section is in view
					observer.unobserve(entry.target); // Stop observing once it's visible
				}
			},
			{ threshold: 0.2 } // Trigger when 20% of the section is visible
		);

		if (journeyRef.current) {
			observer.observe(journeyRef.current);
		}

		return () => {
			if (journeyRef.current) {
				observer.unobserve(journeyRef.current); // Clean up observer
			}
		};
	}, []);

	// Trigger animation when section becomes visible
	useEffect(() => {
		if (isVisible) {
			JourneyItems.forEach((item, index) => {
				animateNumbers(0, item.value, index); // Start the animation for each item
			});
		}
	}, [isVisible]);

	return (
		<div
			ref={journeyRef}
			className="mx-auto flex w-full flex-col justify-center items-center sm:items-start p-10">
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-[100] ">
				<Image
					src={"/assets/journey.png"}
					fill
					alt="founder"
					objectFit="contain"
					className="lg:ml-[300px] object-left"
				/>
			</picture>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  text-white w-full py-10 container mx-auto">
				{JourneyItems.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center p-4 times-new-roman">
						<h2 className="text-6xl font-medium text-gray-200">
							{animatedValues[index]}
							{item.isMore && <span>+</span>}
						</h2>
						<p className="text-xl">{item.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Journey;
