"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import BlurFade from "@/components/ui/blur-fade";

interface NavLinksProps {
	NavBarLinks: { name: string; href: string }[];
}

const NavLinks = ({ NavBarLinks }: NavLinksProps) => {
	const [activeSection, setActiveSection] = useState<string>(""); // Track the active section
	const sectionRefs = useRef<Map<string, HTMLElement>>(new Map()); // Store section elements

	// Register sections into the ref map.
	useEffect(() => {
		NavBarLinks.forEach((link) => {
			const element = document.querySelector(link.href) as HTMLElement;
			if (element) sectionRefs.current.set(link.href, element);
		});
	}, [NavBarLinks]);

	// Use IntersectionObserver to detect which section is in view.
	useEffect(() => {
		const screenWidth = window.innerWidth;
		const threshold = screenWidth < 1280 ? 0.2 : 0.6; // Adjust threshold based on screen width

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(`#${entry.target.id}`); // Set active section based on the element's ID
					}
				});
			},
			{ threshold } // Use the dynamic threshold value
		);

		// Observe each section element.
		sectionRefs.current.forEach((section) => observer.observe(section));
		return () => {
			observer.disconnect(); // Cleanup observer on unmount.
		};
	}, []);

	return (
		<nav className="flex justify-around items-center flex-wrap xl:w-[70%] w-full">
			<BlurFade inView delay={0.25 * 2}>
				<Image
					src={"/padseva.png"}
					width={150}
					height={70}
					alt="logo"
					loading="lazy"
					className="mr-auto ml-10 xl:hidden hidden min-[500px]:block"
				/>
			</BlurFade>
			{NavBarLinks.map(
				(link: { name: string; href: string }, index: number) => {
					const isActive = activeSection === link.href; // Check if the section is active.

					return (
						<BlurFade inView delay={0.25 * index}>
							<Link
								href={link.href}
								key={link.name}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-xs pt-5 sm:text-sm lg:text-lg times-new-roman  font-semibold",
									isActive ? "text-[#91373E] underline" : "" // Apply active styles.
								)}>
								{link.name}
							</Link>
						</BlurFade>
					);
				}
			)}
		</nav>
	);
};

export default NavLinks;
