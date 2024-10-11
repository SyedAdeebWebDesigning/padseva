import Image from "next/image";
import Link from "next/link";

interface OurFounderProps {}

const OurFounder = ({}: OurFounderProps) => {
	return (
		<div
			className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[300px] relative"
			id="founder">
			<div className="absolute inset-x-0 top-0 z-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fill-opacity="1"
						d="M0,320L80,277.3C160,235,320,149,480,138.7C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
				</svg>
			</div>
			<div className="absolute top-44 right-52 ">
				<div className="relative size-[350px] z-10 opacity-70">
					<Image src={"/Flower-2.png"} alt="" fill />
				</div>
			</div>
			<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 mt-32">
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
					<div className="relative size-[250px] md:size-[300px] mb-6 md:mb-0 z-20">
						<Image
							src={"/assets/founder.jpeg"}
							alt="Founder"
							fill
							className="object-cover rounded-full md:rounded-none"
						/>
					</div>
					<div className="md:ml-8">
						<h3 className="text-3xl font-medium relative z-20">
							Anwitha Srivatsa
						</h3>
						<p className="text-gray-600 mb-8">Founder of PadSeva</p>

						<div className="max-w-3xl z-20 relative">
							<p className="text-lg text-gray-700 mb-4 text-justify">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
								voluptate deleniti exercitationem accusantium fuga natus tempore
								iure, veniam nulla quasi?
							</p>
							<p className="text-lg text-gray-700 text-justify">
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
