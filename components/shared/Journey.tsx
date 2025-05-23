import NumberTicker from "@/components/ui/number-ticker";
import { getJourneys } from "@/lib/actions/Journey.action";
import Journey from "@/lib/database/model/Journey.model";

interface JourneyProps {}

const JourneyComponent = async ({}: JourneyProps) => {
	const journey = (await getJourneys()) as unknown as Journey[];

	return (
		<div className="mx-auto flex w-full flex-col justify-center items-center sm:items-start p-10  journeyBG">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-white w-full py-10 container mx-auto ">
				{journey.map((item, index) => (
					<div
						key={index}
						className="flex flex-col items-center justify-center p-4 times-new-roman">
						<h3
							className="whitespace-pre-wrap text-6xl font-medium times-new-roman"
							style={{ color: "#ffffff", textShadow: "1px 1px 5px #000000" }}>
							<NumberTicker
								value={item.value}
								className={"text-white !times-new-roman"}
							/>
							{item.isMore && <span>+</span>}
						</h3>
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

export default JourneyComponent;
