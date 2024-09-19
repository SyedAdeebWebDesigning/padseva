import Image from "next/image";

interface NewsLetterProps {}

const NewsLetter = ({}: NewsLetterProps) => {
	return (
		<div id="newsletter">
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10">
				<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
					<Image
						src={"/assets/newsletter.png"}
						fill
						className="lg:mx-[300px] object-left"
						alt="founder"
						objectFit="contain"
					/>
				</picture>
				<div></div>
			</section>
		</div>
	);
};

export default NewsLetter;
