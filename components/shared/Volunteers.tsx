import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

interface VolunteersProps {}

const Volunteers = ({}: VolunteersProps) => {
	return (
		<div
			className="mx-auto flex w-full flex-col justify-center items-start p-14 "
			id="team">
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
				<Image
					src={"/assets/team.png"}
					fill
					className="lg:ml-[300px] object-left"
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
					{Array.from({ length: 5 }).map((_, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
							<div className="p-1">
								<Card>
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-3xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
};

export default Volunteers;
