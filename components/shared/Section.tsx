import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

interface SectionProps {}

const Section = ({}: SectionProps) => {
	return (
		<div className="w-full bg-[white]">
			<div className="mx-auto  grid w-full lg:grid-cols-2 grid-cols-1 lg:h-screen">
				{/* Right Image Section */}
				<div className="h-full flex items-center justify-center p-4 lg:pr-40 order-1 lg:order-2 bg-[#ffb9bf]">
					<div className="relative size-[600px] flex items-center justify-center">
						<Image
							src="/assets/padseva-gallery/gif.gif"
							alt="PadSeva Image"
							fill
							className="object-cover object-center rounded-lg"
						/>
					</div>
				</div>

				{/* Left Text Section */}
				<div className="flex flex-col justify-center items-start p-10 order-2 lg:order-1 lg:pl-40">
					<h1 className="title-font text-3xl lg:text-5xl mb-4 font-semibold text-[#000000]">
						About PadSeva
					</h1>
					<p className="mb-8 text-lg leading-relaxed text-[#2e2e2e]">
						At PadSeva, we are dedicated to eradicating period poverty and
						promoting menstrual hygiene in rural communities across southern
						India. Founded with a mission to provide access to affordable,
						biodegradable sanitary pads, we strive to empower individuals by
						addressing the critical yet often overlooked issue of menstrual
						health. Our innovative bamboo-made pads, created through our
						personal project initiative, have reached thousands of women and
						girls, ensuring they can manage their periods with dignity.
						<br />
						<br />
						Since our inception, we have distributed over 7,500 pads, reaching
						more than 9,000 individuals while raising awareness and driving
						conversations around menstruation. With education and community
						engagement at the heart of our efforts, PadSeva not only provides
						essential resources but also promotes understanding and advocacy for
						gender equality. Join us in our journey to create a world where
						menstrual health is a right, not a privilege.
					</p>
					<Link
						href="https://www.instagram.com/pad.seva?igsh=MXQxbWVkbXFvMzYwdQ=="
						target="_blank"
						className="inline-flex text-white bg-[#ff8b9d] border-0 py-3 px-6 rounded-full focus:outline-none hover:bg-[#FFB6C1] text-lg">
						<div className="flex items-center space-x-2 justify-center">
							<FaInstagram />
							<span>pad.seva</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Section;
