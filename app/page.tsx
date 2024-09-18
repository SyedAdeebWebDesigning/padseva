import Animation from "@/components/shared/Animation";
import HeroSection from "@/components/shared/HeroSection";
import Journey from "@/components/shared/Journey";
import MajorSections from "@/components/shared/MajorSections";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";
import Volunteers from "@/components/shared/Volunteers";

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

				<section className="relative">
					<MajorSections />
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
