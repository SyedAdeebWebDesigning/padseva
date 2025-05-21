import Image from "next/image";
import Link from "next/link";
import NewsletterSubscriberForm from "./NewsletterSubscriberForm";
import { getAllNewsLetters } from "@/lib/actions/Newsletter.action";

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

const NewsLetter = async ({}: NewsLetterProps) => {
	const newsletter = await getAllNewsLetters();
	return (
		<div
			id="newsletter"
			className="relative mx-auto flex w-full flex-col justify-center items-start py-14 z-10">
			<div className="absolute inset-x-0 top-0 rotate-180 -z-[10] backdrop-invert-0">
				<svg
					width="100%"
					height="100%"
					id="svg"
					viewBox="0 0 1440 490"
					xmlns="http://www.w3.org/2000/svg"
					className="transition duration-300 ease-in-out delay-150">
					<path
						d="M 0,500 L 0,125 C 97.35885167464116,155.16267942583733 194.71770334928232,185.32535885167462 279,182 C 363.2822966507177,178.67464114832538 434.4880382775119,141.86124401913875 525,138 C 615.5119617224881,134.13875598086125 725.3301435406698,163.22966507177034 825,152 C 924.6698564593302,140.77033492822966 1014.1913875598086,89.22009569377991 1115,78 C 1215.8086124401914,66.77990430622009 1327.9043062200958,95.88995215311004 1440,125 L 1440,500 L 0,500 Z"
						stroke="none"
						stroke-width="0"
						fill="#ffbaba"
						fill-opacity="0.53"
						className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
					<path
						d="M 0,500 L 0,291 C 115.56937799043064,270.57894736842104 231.13875598086128,250.1578947368421 328,251 C 424.8612440191387,251.8421052631579 503.01435406698556,273.9473684210526 583,283 C 662.9856459330144,292.0526315789474 744.8038277511962,288.0526315789474 849,289 C 953.1961722488038,289.9473684210526 1079.7703349282297,295.84210526315786 1182,297 C 1284.2296650717703,298.15789473684214 1362.1148325358852,294.57894736842104 1440,291 L 1440,500 L 0,500 Z"
						stroke="none"
						stroke-width="0"
						fill="#ffbaba"
						fill-opacity="1"
						className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
				</svg>
			</div>
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
					loading="lazy"
					className="drop-shadow-pink lg:ml-[150px] -z-10"
					alt="founder"
					style={{ objectFit: "contain" }}
				/>

				{/* Dynamically rendering newsletter issues */}
				<div className="w-full max-w-7xl mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
					{newsletter.map((issue, index) => (
						<Link
							href={issue.issuePDF}
							target="_blank"
							key={issue._id as string}
							className="block">
							<div className="w-full group h-[500px] md:h-[600px] flex flex-col relative items-center justify-center text-2xl sm:text-3xl rounded-lg shadow-lg overflow-hidden">
								<Image
									src={issue.issueCoverPhoto}
									alt={issue.issuePDF}
									width={500} // Adjust as needed
									height={600} // Adjust as needed
									className="w-full h-full object-cover"
								/>
								<p className="absolute -bottom-20 -left-20 group-hover:bottom-2  backdrop-blur-sm w-full px-3 -mb-2 -ml-2 group-hover:left-2 transition-all duration-200 ease-in-out times-new-roman text-3xl text-white">
									Newsletter #{index + 1}
								</p>
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
