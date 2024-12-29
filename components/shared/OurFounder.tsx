import Image from "next/image";

interface OurFounderProps {}

const OurFounder = ({}: OurFounderProps) => {
  return (
    <div
      className="relative mx-auto flex w-full flex-col justify-center p-14 pt-0 z-10"
      id="founder"
    >
      <div className="absolute inset-x-0 top-0 z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffbaba"
            fillOpacity="1"
            d="M0,320L80,277.3C160,235,320,149,480,138.7C640,128,800,192,960,197.3C1120,203,1280,149,1360,122.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <section className="founder-section py-12">
        <div className="my-20">
          <div className="">
            <div className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold z-10 mt-32 flex justify-start">
              <Image
                src={"/assets/OurFounder.webp"}
                fill
                className="lg:ml-[255px] object-left drop-shadow-white"
                alt="founder"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full relative my-10 z-10">
          {/* Founder Image */}
          <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] mb-6 md:mb-0 z-20">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurFounder;
