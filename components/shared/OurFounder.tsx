import Image from "next/image";
import Link from "next/link";

interface OurFounderProps {}

const OurFounder = ({}: OurFounderProps) => {
	return (
		<div
			className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px]"
			id="founder">
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 backdrop-blur-sm mt-32">
				<Image
					src={"/assets/OurFounder.png"}
					fill
					className="object-left drop-shadow-pink"
					alt="founder"
					objectFit="contain"
				/>
			</picture>

			<section className="founder-section py-12">
				<div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
					<div className="relative size-[250px] md:size-[300px] mb-6 md:mb-0">
						<Image
							src={"/padseva.jpeg"}
							alt="Founder"
							fill
							className="object-contain rounded-full md:rounded-none"
						/>
					</div>
					<div className="md:ml-8">
						<h3 className="text-xl font-medium mb-2">Anwitha Srivatsa</h3>
						<p className="text-gray-600 mb-8">Founder and CEO, PadSeva</p>

						<div className="max-w-3xl">
							<p className="text-lg text-gray-700 mb-4">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
								voluptate deleniti exercitationem accusantium fuga natus tempore
								iure, veniam nulla quasi?
							</p>
							<p className="text-lg text-gray-700">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae,
								ad nostrum soluta dolores asperiores at officia fugiat suscipit?
								Quisquam deserunt ipsam, quas distinctio excepturi sapiente.
							</p>
						</div>

						<div className="mt-8">
							<Link
								href=""
								className="inline-block bg-[#91373E] text-white px-6 py-3 rounded font-semibold hover:bg-[#6c292f] transition">
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
