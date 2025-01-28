import Image from "next/image";

interface OurFounderProps {}

const OurFounder = ({}: OurFounderProps) => {
  return (
    <div
      className="relative mx-auto flex w-full flex-col justify-center px-14  pt-0 z-10"
      id="founder"
    >
      <div className="absolute inset-x-0 bottom-0 z-0">
        <svg
          width="100%"
          height="100%"
          id="svg"
          viewBox="0 0 1440 490"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
        >
          <path
            d="M 0,500 L 0,125 C 97.35885167464116,155.16267942583733 194.71770334928232,185.32535885167462 279,182 C 363.2822966507177,178.67464114832538 434.4880382775119,141.86124401913875 525,138 C 615.5119617224881,134.13875598086125 725.3301435406698,163.22966507177034 825,152 C 924.6698564593302,140.77033492822966 1014.1913875598086,89.22009569377991 1115,78 C 1215.8086124401914,66.77990430622009 1327.9043062200958,95.88995215311004 1440,125 L 1440,500 L 0,500 Z"
            stroke="none"
            stroke-width="0"
            fill="#ffbaba"
            fill-opacity="0.53"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
          ></path>
          <path
            d="M 0,500 L 0,291 C 115.56937799043064,270.57894736842104 231.13875598086128,250.1578947368421 328,251 C 424.8612440191387,251.8421052631579 503.01435406698556,273.9473684210526 583,283 C 662.9856459330144,292.0526315789474 744.8038277511962,288.0526315789474 849,289 C 953.1961722488038,289.9473684210526 1079.7703349282297,295.84210526315786 1182,297 C 1284.2296650717703,298.15789473684214 1362.1148325358852,294.57894736842104 1440,291 L 1440,500 L 0,500 Z"
            stroke="none"
            stroke-width="0"
            fill="#ffbaba"
            fill-opacity="1"
            className="transition-all duration-300 ease-in-out delay-150 path-1"
          ></path>
        </svg>
      </div>

      <section className="founder-section py-12">
        <div className="my-20">
          <div className="">
            <div className="relative w-full md:w-[480px] h-[100px] font-semibold z-10 mt-32 flex justify-start">
              <Image
                src={"/assets/OurFounder.webp"}
                fill
                className="lg:ml-[150px] object-left drop-shadow-pink"
                alt="founder"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full relative my-10 z-10">
          {/* Founder Image */}
          <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] mb-6 md:mb-0 z-20">
            <Image
              src={"/assets/founder.webp"}
              alt="Founder"
              fill
              className="object-cover rounded-full md:rounded-none"
              objectFit="cover"
            />
          </div>

          {/* Founder Information */}
          <div className="md:ml-8 text-center md:text-left">
            <h3 className="text-3xl font-semibold relative z-20 times-new-roman">
              Anwitha Srivatsa
            </h3>
            <p className="text-gray-600 mb-8">Founder of PadSeva</p>

            <div className="max-w-3xl z-20 relative leading-tight text-[#2e2e2e] text-justify font-semibold text-2xl 2xl:text-3xl times-new-roman">
              <p className="text-lg text-gray-700 mb-4 text-justify">
                Anwitha is currently a DP1 student studying at Chirec
                International School. With her Higher Levels in Global Politics,
                English, and Economics, she aspires to pursue a career in law.
                She founded PadSeva in 2023 to address inequality and ensure
                equitable access to essential resources for all. Passionate
                about breaking down societal stigma surrounding menstruation,
                she’s using social media to initiate conversations and bring
                about change.
              </p>
              <p className="text-lg text-gray-700 text-justify">
                When she’s not working on PadSeva, you’ll find her practicing
                Bharatanatyam, yelling in Indian committees at MUNs, or watching
                Tangled for the 100th time with her younger sister. She hopes
                Padseva will serve as a meaningful step toward fostering
                conversation and alleviating menstrual health disparities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFounder;
