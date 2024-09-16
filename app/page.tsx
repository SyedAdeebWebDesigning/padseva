import Animation from "@/components/shared/Animation";
import HeroSection from "@/components/shared/HeroSection";
import Mission from "@/components/shared/Mission";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";

export default function Home() {
	return (
		<main>
			{/* Animation Component */}
			<Animation />

			{/* HeroSection Component */}
			<div className="relative z-20">
				<HeroSection />
			</div>

			{/* The content sections with the fixed PlaceHolderImage */}
			<div>
				{/* Section 1 */}
				<section className="relative z-10">
					<Section />
				</section>

				{/* PlaceHolderImage (Fixed Background) */}
				<section className="relative z-0">
					<PlaceHolderImage />
				</section>

				{/* Section 2 */}
				<section className="relative">
					<Mission />
				</section>
			</div>
		</main>
	);
}
