import Image from "next/image";
import Link from "next/link";

interface MissionsProps {}

const Missions = ({}: MissionsProps) => {
	return (
		<div>
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px]  relative">
				<div className="absolute inset-x-0 bottom-0 z-0">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
						<path
							fill="#ffbaba"
							fillOpacity="1"
							d="M0,320L80,277.3C160,235,320,149,480,138.7C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
					</svg>
				</div>
				<picture className="relative w-[250px] md:w-[300px] lg:w-[350px] lg:h-20 h-[50px] mb-4 font-semibold z-10">
					<Image
						src={"/assets/mission.png"}
						fill
						alt="Mission"
						className="object-left drop-shadow-white"
						objectFit="contain"
					/>
				</picture>

				<p className="leading-relaxed text-[#2e2e2e] text-lg times-new-roman md:w-[40%] min-[1536px]:w-[30%] z-10 text-justify">
					Empowering communities, one pad at a time. We believe in dignity,
					equality, and the basic right to menstrual hygiene. Join us in our
					mission to eradicate period poverty and uplift undeserved communities
					in southern India. Together, we can create a more equitable society.
					<br />
				</p>
			</section>
			{/* Right Sections */}
			<section className="absolute hidden xl:flex right-0 -top-[200px] z-[1]">
				<picture className="relative mb-4">
					<img
						src={"/assets/img-2.jpg"}
						alt="Background"
						className="2xl:w-[800px] 2xl:h-[500px] aspect-[19/6] object-contain xl:w-[600px] xl:h-[500px] w-[600px] h-[300px]" // Custom size for 1725px
					/>
				</picture>
			</section>

			<div className="flex items-center md:items-start flex-col mx-auto z-10 justify-start lg:pl-[300px] pb-16 -pt-10">
				<h3 className="text-xl times-new-roman">Ready to make an impact?</h3>
				<Link
					href="https://docs.google.com/forms/d/e/1FAIpQLSdOFCZOhr9jdbcNsG_RKtxTvf1HIAVWYZmyHxCSWI16rDTTqg/viewform"
					target="_blank"
					className="px-4 py-2 border-2 bg-transparent shadow-[#91373e] shadow-[4px_4px_0] border-[#91373e] rounded transition-all duration-150 ease-in-out my-2 hover:bg-[#91373e] hover:text-white hover:shadow-none">
					Fill out the form
				</Link>
			</div>
		</div>
	);
};

export default Missions;
