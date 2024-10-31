import DeleteIssueButton from "@/components/shared/DeleteIssueButton";
import { buttonVariants } from "@/components/ui/button";
import { getAllNewsLetters } from "@/lib/actions/Newsletter.action";
import { INewsLetter } from "@/lib/database/model/Newsletter.model";
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
						href={"/newsletter/new"}
						className={cn(
							buttonVariants({ variant: "default" }),
							"bg-[#91373E] hover:bg-[#af4c54] mt-4"
						)}>
						Create Newsletter
					</Link>
				</div>
			) : (
				<div className="relative">
					<div className="absolute -top-10 left-[0%]">
						<Link
							href={"/newsletter/new"}
							className={cn(
								buttonVariants({ variant: "default" }),
								"bg-[#91373E] hover:bg-[#af4c54] mt-4"
							)}>
							Create New Newsletter
						</Link>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3  py-10 my-10">
						{newsletters.map((newsletter: INewsLetter) => (
							<div
								key={newsletter._id}
								className="bg-white shadow-lg rounded-md relative p-4">
								<div className="relative">
									<div className="relative flex w-full h-[500px] items-center justify-center">
										<Image
											src={newsletter.issueCoverPhoto}
											alt="Cover Photo"
											className="object-cover rounded-t-md"
											fill
										/>
									</div>
								</div>
								<div className="flex items-center justify-start">
									<Link
										href={newsletter.issuePDF}
										target="_blank"
										className="text-blue-500 hover:underline underline-offset-[3px]">
										View PDF
									</Link>
									<div className="mx-2 border-l-2 border-gray-200 h-6" />
									<Link
										href={`/issues/${newsletter._id}`}
										className="text-blue-500 hover:underline underline-offset-[3px]">
										Edit Issue
									</Link>
									<div className="mx-2 border-l-2 border-gray-200 h-6" />
									<DeleteIssueButton issueId={newsletter._id ?? ""} />
								</div>
								<p className="text-gray-400  z-10 text-lg uppercase">
									issue id:{" "}
									<span className="font-semibold">
										{newsletter._id &&
											newsletter._id.replace(/(.{4})(?=.)/g, "$1-")}
									</span>
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default page;
