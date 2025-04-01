import Image from "next/image";
import Link from "next/link";
import NewsletterSubscriberForm from "./NewsletterSubscriberForm";

interface NewsLetterProps {}

// Array of issues with their respective links
const issues = [
	{
		title: "Newsletter 1",
		url: "https://drive.google.com/file/d/1DX6iawqk9fXfe7bgSvg9fV8VtgH9iszA/view?usp=sharing",
		imgUrl: "/assets/Newsletter-1.png",
	},
	// {
	// 	title: "Issue 2",
	// 	url: "https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf",
	// 	imgUrl: "/assets/Newsletter-1.png",
	// },
	// {
	// 	title: "Issue 3",
	// 	url: "https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf",
	// 	imgUrl: "/assets/Newsletter-1.png",
	// },
];

const NewsLetter = ({}: NewsLetterProps) => {
	return (
		<div
			id="newsletter"
			className="relative mx-auto flex w-full flex-col justify-center items-start py-14 z-10">
			<div className="absolute inset-x-0 bottom-0 -z-10">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fillOpacity="1"
						d="M0,64L80,90.7C160,117,320,171,480,176C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>

			<section className="mx-auto flex w-full flex-col justify-center p-6 md:p-10 flower-bg-2">
				{/* Header image */}

				<Image
					src={"/assets/newsletter.svg"}
					width={600}
					height={100}
					className="drop-shadow-white -mb-40 sm:-mb-52 lg:ml-[150px] -z-10"
					alt="founder"
					style={{ objectFit: "contain" }}
				/>

				{/* Dynamically rendering newsletter issues */}
				<div className="w-full max-w-7xl mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
					{issues.map((issue, index) => (
						<Link
							href={issue.url}
							target="_blank"
							key={index}
							className="block">
							<div className="w-full h-[500px] md:h-[600px] flex flex-col items-center justify-center text-2xl sm:text-3xl rounded-lg shadow-lg overflow-hidden">
								<Image
									src={issue.imgUrl}
									alt={issue.title}
									width={500} // Adjust as needed
									height={600} // Adjust as needed
									className="w-full h-full object-cover"
								/>
							</div>
						</Link>
					))}
				</div>
				<div className="flex items-center flex-col mx-auto z-10">
					<NewsletterSubscriberForm />
				</div>
			</section>
		</div>
	);
};

export default NewsLetter;
