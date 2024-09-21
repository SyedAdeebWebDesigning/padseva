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

interface VolunteersProps {}

const Volunteers = async ({}: VolunteersProps) => {
	const user = await currentUser();
	const mongoUser = (await getUserById(user?.id ?? "")) as User;
	return (
		<div
			className="mx-auto flex w-full flex-col justify-center items-start p-14"
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
			<SignedOut>
				<div className="flex flex-col justify-center items-center  w-full">
					<h3 className="text-2xl text-center w-full">Want to join us?</h3>
					<Link
						href="/sign-in"
						className="py-2 px-6 my-2 border-[#91373E] border-2 rounded hover:bg-[#91373E] hover:text-white">
						Sign In
					</Link>
				</div>
			</SignedOut>
			<SignedIn>
				{mongoUser?.hasCompletedProfile ? (
					<div className="flex flex-col justify-center items-center  w-full">
						<h3 className="text-2xl text-center w-full">
							{mongoUser?.firstName} {mongoUser?.lastName}
						</h3>
						<Link
							href="/sign-in"
							className="py-2 px-6 my-2 border-[#91373E] border-2 rounded hover:bg-[#91373E] hover:text-white">
							Sign In
						</Link>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center  w-full">
						<h3 className="text-2xl text-center w-full">
							Your profile is not completed
						</h3>
						<Link
							href="/profile"
							className="py-2 px-6 my-2 border-[#91373E] border-2 rounded hover:bg-[#91373E] hover:text-white">
							Complete Profile
						</Link>
					</div>
				)}
			</SignedIn>
		</div>
	);
};

export default Volunteers;
