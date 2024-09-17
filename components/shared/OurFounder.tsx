import Image from "next/image";
import Link from "next/link";

interface OurFounderProps {}

const OurFounder = ({}: OurFounderProps) => {
	return (
		<div
			className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px]"
			id="founder">
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
				<Image src={"/assets/OurFounder.png"} fill alt="founder" />
			</picture>

			<section className="founder-section py-12">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
					<div className="relative w-[300px] h-[300px] mb-6 md:mb-0">
						<Image
							src={"/padseva.jpeg"}
							alt="Founder"
							fill
							className="object-cover rounded-lg"
						/>
					</div>
					<div className="md:ml-8">
						<h3 className="text-xl font-medium mb-2">[Founder Name]</h3>
						<p className="text-gray-600 mb-8">Founder and CEO, PadSeva</p>

						<div className="max-w-3xl">
							<p className="text-lg text-gray-700 mb-4">
								[Insert personal story about the founder’s motivation for
								starting the initiative, challenges, and their journey.]
							</p>
							<p className="text-lg text-gray-700">
								[Insert the founder's vision, values, and goals for the future
								of the organization.]
							</p>
						</div>

						<div className="mt-8">
							<Link
								href=""
								className="inline-block bg-pink-500 text-white px-6 py-3 rounded font-semibold hover:bg-pink-700 transition">
								Get Involved
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default OurFounder;
