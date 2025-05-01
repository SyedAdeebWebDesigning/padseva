"use client";

import NumberTicker from "@/components/ui/number-ticker";
import Image from "next/image";

interface JourneyProps {}

const Journey = ({}: JourneyProps) => {
	const JourneyItems = [
		{
			title: "Bamboo Pads Synthesized",
			value: 8000,
			isMore: false,
		},
		{
			title: "Women Met",
			value: 9300,
			isMore: true,
		},
		// {
		//   title: "Volunteers",
		//   value: 30,
		//   isMore: false,
		// },
		{
			title: "Dollars Raised",
			value: 6400,
			isMore: true,
		},
	];

	return (
		<div className="mx-auto flex w-full flex-col justify-center items-center sm:items-start p-10  journeyBG">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-white w-full py-10 container mx-auto ">
				{JourneyItems.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center p-4 times-new-roman">
						<p
							className="whitespace-pre-wrap text-6xl font-medium times-new-roman"
							style={{ color: "#ffffff", textShadow: "1px 1px 5px #000000" }}>
							<NumberTicker
								value={item.value}
								className={"text-white !times-new-roman"}
							/>
							{item.isMore && <span>+</span>}
						</p>
						<p
							className="text-xl"
							style={{ color: "#ffffff", textShadow: "1px 1px 5px #000000" }} // Ensure sufficient contrast
						>
							{item.title}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Journey;
