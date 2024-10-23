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
		<div
			id="newsletter"
			className="relative mx-auto flex w-full flex-col justify-center items-start p-14 z-10 -mt-2 -mb-11">
			<div className="absolute inset-x-0 bottom-0 -z-10">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fillOpacity="1"
						d="M0,64L80,90.7C160,117,320,171,480,176C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>

			<div className="absolute inset-x-0 top-0 z-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fillOpacity="1"
						d="M0,64L120,80C240,96,480,128,720,128C960,128,1200,96,1320,80L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
				</svg>
			</div>
			<section className="mx-auto flex w-full flex-col justify-center p-6 md:p-10">
				{/* Header image */}
				<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10  mt-32">
					<Image
						src={"/assets/newsletter.png"}
						fill
						className="lg:ml-[300px] object-left drop-shadow-white"
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
