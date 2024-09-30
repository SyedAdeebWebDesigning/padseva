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
		</div>
	);
};

export default Volunteers;
