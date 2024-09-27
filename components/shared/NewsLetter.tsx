import Image from "next/image";
import Link from "next/link";

interface NewsLetterProps {}

const NewsLetter = ({}: NewsLetterProps) => {
	return (
		<div id="newsletter">
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10 ">
				<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
					<Image
						src={"/assets/newsletter.png"}
						fill
						className="lg:mx-[300px] object-left drop-shadow-pink"
						alt="founder"
						objectFit="contain"
					/>
				</picture>
				<div className="w-full max-w-7xl mx-auto my-10 grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2">
					<Link
						href={
							"https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf"
						}
						target="_blank"
						className="">
						<div className="w-[400px] h-[600px] bg-gray-100 flex items-center justify-center text-3xl">
							Issue 1
						</div>
					</Link>
					<Link
						href={
							"https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf"
						}
						target="_blank"
						className="">
						<div className="w-[400px] h-[600px] bg-gray-100 flex items-center justify-center text-3xl">
							Issue 2
						</div>
					</Link>
					<Link
						href={
							"https://www.lablinks.co.in/_files/ugd/bf27d6_ed1eb3d22728497495e9a7c96a931a6d.pdf"
						}
						target="_blank"
						className="">
						<div className="w-[400px] h-[600px] bg-gray-100 flex items-center justify-center text-3xl">
							Issue 3
						</div>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default NewsLetter;
