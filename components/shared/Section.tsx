import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import BlurFade from "@/components/ui/blur-fade";

interface SectionProps {}

const Section = ({}: SectionProps) => {
  return (
    <div className="w-full bg-[white]">
      <div className="mx-auto  grid w-full lg:grid-cols-2 grid-cols-1 ">
        {/* Right Image Section */}
        <div className="h-full flex items-center justify-center p-4 py-20 order-1 lg:order-2 bg-gradient-to-br from-[#ffb9bf] to-[#e7717b]">
          <div className="relative size-[600px] flex items-center justify-center">
            <Image
              src="/assets/img-1.webp"
              alt="PadSeva Image"
              unoptimized
              fill
              className="object-cover object-center rounded-lg"
            />
          </div>
        </div>

        {/* Left Text Section */}
        <div className="flex flex-col justify-center items-start p-10 order-2 lg:order-1 lg:pl-40">
          <picture className="relative w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] mb-4 font-semibold">
            <Image src={"/assets/AboutPadSeva.webp"} className="" fill alt="" />
          </picture>
          <BlurFade
            delay={0.25}
            inView
            className={
              'className="mb-8 text-lg leading-relaxed text-[#2e2e2e] times-new-roman text-justify'
            }
          >
            At PadSeva, we are dedicated to eradicating period poverty and
            promoting menstrual hygiene in rural communities across southern
            India. Founded with a mission to provide access to affordable,
            biodegradable sanitary pads, we strive to empower individuals by
            addressing the critical yet often overlooked issue of menstrual
            health. Our innovative bamboo-made pads, created through our
            personal project initiative, have reached thousands of women and
            girls, ensuring they can manage their periods with dignity.
          </BlurFade>
          <br />
          <br />
          <BlurFade
            delay={0.25 * 2}
            inView
            className="mb-8 text-lg leading-relaxed text-[#2e2e2e] times-new-roman text-justify"
          >
            Since our inception, we have distributed over 7,500 pads, reaching
            more than 9,000 individuals while raising awareness and driving
            conversations around menstruation. With education and community
            engagement at the heart of our efforts, PadSeva not only provides
            essential resources but also promotes understanding and advocacy for
            gender equality. Join us in our journey to create a world where
            menstrual health is a right, not a privilege.
          </BlurFade>
          <BlurFade delay={0.25 * 3} inView>
            <Link
              href="https://www.instagram.com/pad.seva?igsh=MXQxbWVkbXFvMzYwdQ=="
              target="_blank"
              className="inline-flex hover:text-white hover:bg-[#ff8b9d] rounded transition-all duration-150 py-3 px-6  focus:outline-none bg-transparent border-[#ff8b9d] border-2 text-black text-lg items-center space-x-2 justify-center"
            >
              <FaInstagram />
              <span>pad.seva</span>
            </Link>
          </BlurFade>
        </div>
      </div>
    </div>
  );
};

export default Section;
