import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/User.action";
import User from "@/lib/database/model/User.model";
import Volunteer from "./Volunteer";
import { buttonVariants } from "../ui/button";

interface VolunteersProps {}

const Volunteers = async ({}: VolunteersProps) => {
	return (
		<div
			className="relative mx-auto flex w-full flex-col justify-center items-start p-14 z-50"
			id="team"
			style={{ overflow: "hidden" }}>
			{/* Wave background */}
			<div className="absolute inset-x-0 bottom-0 z-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fill-opacity="1"
						d="M0,64L120,80C240,96,480,128,720,128C960,128,1200,96,1320,80L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
				</svg>
			</div>

			{/* Main content */}
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 mt-32">
				<Image
					src={"/assets/our-core-team.png"}
					fill
					className="lg:ml-[300px] object-left drop-shadow-pink"
					alt="founder"
					objectFit="contain"
				/>
			</picture>

			{/* Carousel */}
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full max-w-7xl mx-auto my-10 z-10">
				<CarouselContent>
					{Array.from({ length: 6 }).map((_, index) => (
						<Volunteer key={index} index={index} />
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			{/* Call to action */}
			<div className="flex items-center flex-col mx-auto z-10">
				<h3 className="text-3xl">Want to become a volunteer?</h3>
				<Link
					href={
						"https://docs.google.com/forms/d/1zIZVMRkoxEilSwDCoBdWnwsWeehlv__DI3UpPSEDRpg/edit"
					}
					className="px-4 py-2 border-2 bg-transparent border-[#91373e] rounded transition-all duration-150 ease-in-out my-2 hover:bg-[#91373e] hover:text-white">
					Fill out the form
				</Link>
			</div>
		</div>
	);
};

export default Volunteers;
