import Image from "next/image";

interface MissionProps {}

const Mission = ({}: MissionProps) => {
	return (
		<div className="w-full bg-[#ffcece] relative h-[400vh]">
			<div className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-40 z-10">
				{/* Heading Section */}
				<picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] mb-4 font-semibold">
					<Image src={"/assets/mission.png"} fill alt="" />
				</picture>

				{/* Mission Text */}
				<p className="mb-8 text-lg leading-relaxed text-[#2e2e2e] times-new-roman lg:w-[50%]">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
					recusandae molestias quibusdam, atque impedit nulla. Ratione,
					perferendis ullam sunt odio, unde eos voluptatem sapiente rem soluta
					adipisci itaque porro pariatur mollitia quo esse corporis tempore!
					Iusto nulla, cumque eos magni a molestias aliquid eaque odio. Iste
					quae alias laboriosam perspiciatis?
					<br />
				</p>
			</div>
			<div className="absolute hidden lg:flex right-0 -top-[200px] ">
				<picture className="relative mb-4">
					<img
						src={"/assets/food_04.jpg"}
						alt=""
						className="w-[800px] h-[600px]"
					/>
				</picture>
			</div>
			<div className="sticky bg-white lg:w-[50%] w-full z-[999] top-10 py-4">
				<nav className="flex flex-wrap items-center justify-end w-full">
					<ul className="hidden lg:flex"></ul>
					<ul className="flex justify-around items-center lg:w-[50%] w-full">
						<li className="cursor-pointer">Link 1</li>
						<li className="cursor-pointer">Link 2</li>
						<li className="cursor-pointer">Link 3</li>
						<li className="cursor-pointer">Link 4</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Mission;
