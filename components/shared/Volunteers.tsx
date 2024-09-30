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
			className="mx-auto flex w-full flex-col justify-center items-start p-14"
			id="team">
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
				<Image
					src={"/assets/our-core-team.png"}
					fill
					className="lg:ml-[300px] object-left drop-shadow-pink"
					alt="founder"
					objectFit="contain"
				/>
			</picture>
			<Carousel
				opts={{
					align: "center",
				}}
				className="w-full max-w-7xl mx-auto my-10">
				<CarouselContent>
					{Array.from({ length: 6 }).map((_, index) => (
						<Volunteer index={index} />
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div className="flex items-center flex-col mx-auto">
				<h3 className="text-3xl">Want to become a volunteer?</h3>
				<Link
					href={
						"https://docs.google.com/forms/d/1zIZVMRkoxEilSwDCoBdWnwsWeehlv__DI3UpPSEDRpg/edit"
					}
					className={
						"px-4 py-2 border-2 bg-transparent border-[#91373e] rounded transition-all duration-150 ease-in-out my-2 hover:bg-[#91373e] hover:text-white"
					}>
					Fill out the form
				</Link>
			</div>
		</div>
	);
};

export default Volunteers;
