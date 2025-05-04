import { buttonVariants } from "@/components/ui/button";
import { getJourneys } from "@/lib/actions/Journey.action";
import Journey from "@/lib/database/model/Journey.model";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface pageProps {}

const page = async ({}: pageProps) => {
	const journeys = (await getJourneys()) as unknown as Journey[];

	if (journeys && journeys.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-xl text-muted-foreground font-semibold">
					No journeys found.
				</p>
				<Link
					href={"/journey/new"}
					className={cn(
						buttonVariants({ variant: "padseva" }),
						"bg-[#91373E] hover:bg-[#af4c54] mt-4"
					)}>
					Create Journey
					<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
				</Link>
			</div>
		);
	}
	return (
		<div className="">
			<div className="text-xl text-muted-foreground font-semibold">
				<Link
					href={"/journey/new"}
					className={cn(
						buttonVariants({ variant: "padseva" }),
						"bg-[#91373E] hover:bg-[#af4c54] mt-4 w-fit"
					)}>
					Create Journey
					<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
				</Link>
				<Table>
					<TableCaption>A list of all journeys created. </TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="text-left">Title</TableHead>
							<TableHead className="text-left">Value</TableHead>
							<TableHead className="text-left">Is More</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{journeys.map((journey, index) => (
							<TableRow key={journey._id as string}>
								<TableCell className="text-left">
									{index + 1}. {journey.title}
								</TableCell>
								<TableCell className="text-left">{journey.value}</TableCell>
								<TableCell className="text-left">
									{journey.isMore ? "Yes" : "No"}
								</TableCell>
								<TableCell className="text-right">
									<Link
										href={`/journey/${journey._id}`}
										className={cn(buttonVariants({ variant: "link" }))}>
										Edit
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default page;
