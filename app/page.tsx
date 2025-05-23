import Animation from "@/components/shared/Animation";
import Contact from "@/components/shared/Contact";
import HeroSection from "@/components/shared/HeroSection";
import InstagramFeeds from "@/components/shared/InstagramFeeds";
import Missions from "@/components/shared/Missions";
import NewsLetter from "@/components/shared/NewsLetter";
import OurFounder from "@/components/shared/OurFounder";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";
import { buttonVariants } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/User.action";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import NavLinks from "@/components/shared/NavLinks";
import DropdownLinks from "@/components/shared/DropdownLinks";
import Journey from "@/components/shared/Journey";
import Image from "next/image";
import Impact from "@/components/shared/Impact";
import Podcast from "@/components/shared/Podcast";
import Video from "@/components/shared/Video";
import Gallery from "@/components/shared/Gallery";

export default async function Home() {
	const clerkUser = await currentUser();
	const clerkUserId = clerkUser?.id || "";
	const user = (await getUserById(clerkUserId)) as any;
	const isAdmin = user?.role === "Admin";

	const NavBarLinks = [
		{ name: "Founder", href: "#founder" },
		{ name: "Newsletter", href: "#newsletter" },
		{ name: "Podcast", href: "#podcast" },
		{ name: "Contact Us", href: "#contact" },
	];
	return (
		<main
			className={`scroll-smooth relative ${
				process.env.IS_PAID == "false" && "invisible"
			}`}>
			<DropdownLinks isAdmin={isAdmin} />
			<Animation />

			<div className="relative z-30">
				<HeroSection />
			</div>
			<div>
				<section className="relative z-30">
					<Section />
				</section>

				<section className="relative z-[0] bg-black/40">
					<PlaceHolderImage />
					<div className="absolute bottom-0 left-0 overflow-hidden">
						<Image
							src={"/svg/LongFlower.svg"}
							width={2050}
							height={470}
							loading="lazy"
							alt="logo"
							className="opacity-70"
						/>
					</div>
				</section>
				<section className="w-full bg-[#ffb6d5] z-30 relative">
					<div className="relative z-0"></div>
					<Missions />
				</section>

				<section className="sticky bg-white/60 rounded-r-full backdrop-blur-xl xl:w-[50%] w-full z-[9999] top-10 py-4 shadow-md shadow-[#4f4f4f]">
					<nav className="flex flex-wrap items-center justify-end w-full">
						<div>
							<Image
								src={"/Padseva.webp"}
								width={150}
								height={70}
								alt="logo"
								loading="lazy"
								className="mr-auto ml-10 hidden xl:flex"
							/>
						</div>
						<NavLinks NavBarLinks={NavBarLinks} />
					</nav>
				</section>
				<section className="w-full bg-[#ffe8e8] relative z-30 -mt-20 ">
					<OurFounder />
				</section>

				<section className="w-full h-auto relative z-30 backdrop-blur ">
					<Journey />
				</section>
				<section className="bg-white relative z-[30]">
					<NewsLetter />
				</section>
				<section className="bg-[#ffe8e8] relative bg-bag z-[30]">
					<Impact />
				</section>
				<section className="bg-[#ffbaba] relative z-[30]">
					<Podcast />
				</section>

				<section className="relative bg-white">
					<Video />
				</section>
				<section className="bg-[#fff2f2] relative z-30">
					<InstagramFeeds />
				</section>
				<section className="bg-[#ffbaba] relative z-30">
					<Gallery />
				</section>
				<section className="bg-[#ffbaba] relative z-30">
					<Contact />
				</section>
				<footer className="relative z-30">
					<div className="bg-[#43191d] text-white">
						<div className="container mx-auto flex flex-col md:flex-row items-center justify-around p-4">
							<div className="flex items-center justify-center">
								<p className="text-sm">
									&copy; 2024 PadSeva - All rights reserved.
								</p>
							</div>

							<div className="flex items-center justify-center text-gray-300">
								<p className="text-xs">
									Designed by
									<Link
										href="https://syedadeeb.vercel.app/"
										target="_blank"
										rel="noreferrer"
										className={cn(
											buttonVariants({ variant: "link" }),
											"text-gray-300 text-sm -ml-3"
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
