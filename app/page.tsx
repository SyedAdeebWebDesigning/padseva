import Animation from "@/components/shared/Animation";
import HeroSection from "@/components/shared/HeroSection";
import Journey from "@/components/shared/Journey";
import Missions from "@/components/shared/Missions";
import OurFounder from "@/components/shared/OurFounder";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";
import Volunteers from "@/components/shared/Volunteers";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
				<section className="sticky bg-white xl:w-[50%] w-full z-[999] top-10 py-4">
					<nav className="flex flex-wrap items-center justify-end w-full">
						<ul className="flex justify-around items-center xl:w-[50%] w-full">
							<Link
								href={"#founder"}
								className={buttonVariants({ variant: "link" })}>
								Founder
							</Link>
							<Link
								href={"#team"}
								className={buttonVariants({ variant: "link" })}>
								Team
							</Link>
							<Link href={"#"} className={buttonVariants({ variant: "link" })}>
								Link 3
							</Link>
							<Link href={"#"} className={buttonVariants({ variant: "link" })}>
								Link 4
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
			</div>
		</main>
	);
}
