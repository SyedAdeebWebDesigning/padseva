import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
// import FlowerBackground from "./flowerBackground";

interface MissionsProps {}

const Missions = ({}: MissionsProps) => {
	return (
		<div className=" flower-bg">
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px]  relative">
				<picture className="relative w-[250px] md:w-[300px] lg:w-[350px] lg:h-20 h-[50px] mb-4 font-semibold z-10">
					<Image
						src={"/assets/mission.png"}
						fill
						alt="Mission"
						className="object-left drop-shadow-pink"
						objectFit="contain"
					/>
				</picture>

				<p className="leading-relaxed text-[#2e2e2e] text-xl times-new-roman md:w-[40%] min-[1536px]:w-[30%] z-10 text-justify font-semibold">
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
				<h3 className="text-xl times-new-roman ml-0 sm:ml-10 min-[1024px]:ml-0">
					Ready to make an impact?
				</h3>
				<div className="flex items-center md:items-center flex-col md:flex-row ml-0 sm:ml-10 min-[1024px]:ml-0">
					<Link
						href="https://docs.google.com/forms/d/e/1FAIpQLSdOFCZOhr9jdbcNsG_RKtxTvf1HIAVWYZmyHxCSWI16rDTTqg/viewform"
						target="_blank"
						className={cn(
							buttonVariants({ variant: "padseva" }),
							"bg-[#91373e] hover:bg-[#63262b] text-white"
						)}>
						Fill out the form
						<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Missions;
