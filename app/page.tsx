import Animation from "@/components/shared/Animation";
import HeroSection from "@/components/shared/HeroSection";
import Section from "@/components/shared/Section";

export default function Home() {
	return (
		<main>
			<Animation />

			<HeroSection />

			<section className="z-0">
				<Section />
			</section>
		</main>
	);
}
