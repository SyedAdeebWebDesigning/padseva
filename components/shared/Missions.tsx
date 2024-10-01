import Image from "next/image";

interface MissionsProps {}

const Missions = ({}: MissionsProps) => {
	return (
		<div>
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px]">
				<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] mb-4 font-semibold z-10">
					<Image
						src={"/assets/mission.png"}
						fill
						alt="Mission"
						className="object-left drop-shadow-pink"
						objectFit="contain"
					/>
				</picture>

				<p className="mb-8 leading-relaxed text-[#2e2e2e] times-new-roman sm:w-[30%] z-10 text-justify">
					Empowering communities, one pad at a time. We believe in dignity,
					equality, and the basic right to menstrual hygiene. Join us in our
					mission to eradicate period poverty and uplift undeserved communities
					in southern India. Together, we can create a more equitable society.
					<br />
				</p>
			</section>
			{/* Right Sections */}
			<section className="absolute hidden lg:flex right-0 -top-[200px] z-[1]">
				<picture className="relative mb-4">
					<img
						src={"/assets/img-2.jpg"}
						alt="Background"
						className="2xl:w-[900px] 2xl:h-[500px] aspect-[19/6] object-cover xl:w-[700px] xl:h-[400px] w-[500px] h-[300px]" // Custom size for 1725px
					/>
				</picture>
			</section>
		</div>
	);
};

export default Missions;
