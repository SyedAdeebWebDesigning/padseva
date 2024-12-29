"use client";

import Image from "next/image";
import NumberTicker from "@/components/ui/number-ticker";

interface JourneyProps {}

const Journey = ({}: JourneyProps) => {
  // Define initial state to hold the animated values

  const JourneyItems = [
    {
      title: "Bamboo Pads Synthesized",
      value: 7500,
      isMore: false,
    },
    {
      title: "Womans Met",
      value: 9000,
      isMore: true,
    },
    {
      title: "Volunteers",
      value: 30,
      isMore: false,
    },
    {
      title: "Dollars Raised",
      value: 400,
      isMore: true,
    },
  ];
  return (
    <div className="mx-auto flex w-full flex-col justify-center items-center sm:items-start p-10">
      <picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-[100] ">
        <Image
          src={"/assets/journey.webp"}
          fill
          alt="founder"
          objectFit="contain"
          className="lg:ml-[255px] object-left"
        />
      </picture>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  text-white w-full py-10 container mx-auto">
        {JourneyItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 times-new-roman"
          >
            <p className="whitespace-pre-wrap text-6xl font-medium text-gray-200">
              <NumberTicker value={item.value} className={"text-gray-200"} />
              {item.isMore && <span>+</span>}
            </p>

            <p className="text-xl">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
