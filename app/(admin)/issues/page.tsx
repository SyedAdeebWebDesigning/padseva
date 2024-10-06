import { buttonVariants } from "@/components/ui/button";
import { getAllNewsLetters } from "@/lib/actions/Newsletter.action";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getAllNewsLetters();
	const newsletters = JSON.parse(JSON.stringify(data));
	return (
		<div>
			{newsletters.length < 1 ? (
				<div className="min-h-screen flex flex-col items-center justify-center">
					<h3 className="text-3xl">No Newsletter found</h3>
					<Link
						href={"/issues/new"}
						className={cn(
							buttonVariants({ variant: "default" }),
							"bg-[#91373E] hover:bg-[#af4c54] mt-4"
						)}>
						Create Newsletter
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{newsletters.map((newsletter: any, index: number) => (
						<div
							key={newsletter._id}
							className="bg-white shadow-lg p-4 rounded-md">
							<div className="relative size-[500px]">
								<Image
									src={newsletter.issueCoverPhoto}
									alt="Cover Photo"
									className="w-full"
									fill
								/>
							</div>
							<Link
								href={newsletter.issuePDF}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500">
								View PDF
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default page;
