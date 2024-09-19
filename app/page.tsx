import Animation from "@/components/shared/Animation";
import Contact from "@/components/shared/Contact";
import HeroSection from "@/components/shared/HeroSection";
import Journey from "@/components/shared/Journey";
import Missions from "@/components/shared/Missions";
import NewsLetter from "@/components/shared/NewsLetter";
import OurFounder from "@/components/shared/OurFounder";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";
import Volunteers from "@/components/shared/Volunteers";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
	return (
		<main>
			<Animation />

			<div className="relative z-20">
				<HeroSection />
			</div>

			<div>
				<section className="relative z-10">
					<Section />
				</section>

				<section className="relative z-0">
					<PlaceHolderImage />
				</section>

				<section className="w-full bg-[#ffe8e8] relative ">
					<Missions />
				</section>
				<section className="sticky bg-white xl:w-[50%] w-full z-[999] top-10 py-4 shadow-md shadow-[#4f4f4f]">
					<nav className="flex flex-wrap items-center justify-end w-full ">
						<ul className="flex justify-around items-center xl:w-[60%] w-full">
							<Link
								href={"#founder"}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-xs sm:text-sm lg:text-base"
								)}>
								Founder
							</Link>
							<Link
								href={"#team"}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-xs sm:text-sm lg:text-base"
								)}>
								Team
							</Link>
							<Link
								href={"#newsletter"}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-xs sm:text-sm lg:text-base"
								)}>
								Newsletter
							</Link>
							<Link
								href={"#contact"}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-xs sm:text-sm lg:text-base"
								)}>
								Contact Us
							</Link>
						</ul>
					</nav>
				</section>
				<section className="w-full bg-[#ffe8e8] relative -mt-20">
					<OurFounder />
				</section>

				<section className="bg-black/50 relative z-[900]  backdrop-blur-xl">
					<Journey />
				</section>
				<section className="bg-[#ffe8e8] relative">
					<Volunteers />
				</section>
				<section className="bg-[#ffe8e8] relative">
					<NewsLetter />
				</section>
				<section className="bg-[#ffe8e8] relative">
					<Contact />
				</section>
				<footer className="relative ">
					<div className="bg-[#43191d] text-white">
						<div className="container mx-auto flex flex-col md:flex-row items-center justify-around p-4">
							<div className="flex items-center justify-center">
								<p className="text-sm">
									&copy; 2024 PadSeva - All rights reserved.
								</p>
							</div>
							<div className="flex items-center justify-center text-lg">
								<Link href={"https://www.instagram.com/pad.seva"}>
									<FaInstagram />
								</Link>
							</div>
							<div className="flex items-center justify-center">
								<p className="text-sm">
									Designed by
									<Link
										href="https://syedadeeb.vercel.app/"
										target="_blank"
										rel="noreferrer"
										className={cn(
											buttonVariants({ variant: "link" }),
											"text-white"
										)}>
										Syed Adeeb
									</Link>
								</p>
							</div>
						</div>
					</div>
				</footer>
			</div>
		</main>
	);
}
