import Image from "next/image";

// import FlowerBackground from "./flowerBackground";

interface MissionsProps {}

const Missions = ({}: MissionsProps) => {
  return (
    <div className="bg-[#ffe8e8]">
      <section className="mx-auto flex w-full flex-col justify-center items-start p-10 lg:pl-[200px]  relative">
        <picture className=" mb-4 font-semibold z-10">
          <Image
            src={"/svg/OurMission.svg"}
            className=""
            width={480}
            height={100}
            alt=""
          />
        </picture>

        <p className="leading-tight text-[#2e2e2e] text-2xl 2xl:text-3xl times-new-roman md:w-[40%] min-[1536px]:w-[50%] z-10 text-justify font-medium mt-10">
          Our mission is grounded in the belief that menstrual hygiene is not
          merely a health issue but a matter of dignity and equality. We are
          committed to promoting education, accessibility and starting a
          conversation in this critical area, thereby uplifting underserved
          populations and fostering a more equitable society.
          <br />
        </p>
      </section>
      {/* Right Sections */}
      <section className="absolute hidden xl:flex right-0 -top-[200px]">
        <picture className="relative mb-4">
          <img
            src={"/assets/img-2.webp"}
            alt="Background"
            className="2xl:w-[700px] 2xl:h-[500px] aspect-[19/6] object-contain xl:w-[600px] xl:h-[500px] w-[600px] h-[300px]" // Custom size for 1725px
          />
        </picture>
      </section>
    </div>
  );
};

export default Missions;
