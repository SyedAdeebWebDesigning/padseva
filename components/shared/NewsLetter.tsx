import Image from "next/image";
import Link from "next/link";

interface NewsLetterProps {}

// Array of issues with their respective links
const issues = [
	{
		title: "Issue 1",
		url: "https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf",
	},
	{
		title: "Issue 2",
		url: "https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf",
	},
	{
		title: "Issue 3",
		url: "https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf",
	},
];

const NewsLetter = ({}: NewsLetterProps) => {
	return (
		<div id="newsletter">
			<section className="mx-auto flex w-full flex-col justify-center items-center p-6 md:p-10">
				{/* Header image */}
				<picture className="relative w-[200px] h-[50px] sm:w-[250px] sm:h-[60px] md:w-[300px] lg:w-[450px] lg:h-20 font-semibold z-10 backdrop-blur-sm mt-20 md:mt-32">
					<Image
						src={"/assets/newsletter.png"}
						fill
						className="object-left drop-shadow-pink"
						alt="founder"
						style={{ objectFit: "contain" }}
					/>
				</picture>

				{/* Dynamically rendering newsletter issues */}
				<div className="w-full max-w-7xl mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
					{issues.map((issue, index) => (
						<Link href={issue.url} target="_blank" key={index} className="">
							<div className="w-full h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center text-2xl sm:text-3xl">
								{issue.title}
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
};

export default NewsLetter;
