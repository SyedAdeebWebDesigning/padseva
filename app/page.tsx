import Animation from "@/components/shared/Animation";
import Contact from "@/components/shared/Contact";
import HeroSection from "@/components/shared/HeroSection";
import InstagramFeeds from "@/components/shared/InstagramFeeds";
import Missions from "@/components/shared/Missions";
import NewsLetter from "@/components/shared/NewsLetter";
import OurFounder from "@/components/shared/OurFounder";
import PlaceHolderImage from "@/components/shared/PlaceHolderImage";
import Section from "@/components/shared/Section";
import { buttonVariants } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/User.action";
import User from "@/lib/database/model/User.model";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

import NavLinks from "@/components/shared/NavLinks";
import DropdownLinks from "@/components/shared/DropdownLinks";
import Journey from "@/components/shared/Journey";
import Image from "next/image";

export default async function Home() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id || "";
  const user = (await getUserById(clerkUserId)) as User;
  const isAdmin = user?.role === "Admin";

  const NavBarLinks = [
    { name: "Founder", href: "#founder" },
    { name: "Team", href: "#team" },
    { name: "Newsletter", href: "#newsletter" },
    { name: "Contact Us", href: "#contact" },
  ];
  return (
    <main
      className={`scroll-smooth ${
        process.env.IS_PAID == "false" && "invisible"
      }`}
    >
      <DropdownLinks isAdmin={isAdmin} />
      <Animation />

      <div className="relative z-20">
        <HeroSection />
      </div>
      <div>
        <section className="relative z-10">
          <Section />
        </section>

        <section className="relative z-0">
          <PlaceHolderImage />
        </section>

        <section className="w-full bg-[#ffbaba] relative">
          <Missions />
        </section>
        <section className="bg-black/50 relative z-[900] backdrop-blur-xl">
          <Journey />
        </section>
        <section className="sticky bg-white xl:w-[50%] w-full z-[999] top-10 py-4 shadow-md shadow-[#4f4f4f]">
          <nav className="flex flex-wrap items-center justify-end w-full">
            <div>
              <Image
                src={"/Padseva.webp"}
                width={150}
                height={70}
                alt="logo"
                className="mr-auto ml-10 hidden xl:flex"
              />
            </div>
            <NavLinks NavBarLinks={NavBarLinks} />
          </nav>
        </section>
        <section className="w-full bg-[#ffe8e8] relative -mt-20 ">
          <OurFounder />
        </section>
        {/*<section className="bg-[#ffe8e8] relative">*/}
        {/*  <Volunteers />*/}
        {/*</section>*/}
        <section className="bg-[#ffbaba] relative ">
          <NewsLetter />
        </section>
        <section className="bg-[#fff2f2] relative">
          <InstagramFeeds />
        </section>
        <section className="bg-[#ffbaba] relative">
          <Contact />
        </section>
        <footer className="relative">
          <div className="bg-[#43191d] text-white">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-around p-4">
              <div className="flex items-center justify-center">
                <p className="text-sm">
                  &copy; 2024 PadSeva - All rights reserved.
                </p>
              </div>

              <div className="flex items-center justify-center text-gray-300">
                <p className="text-xs">
                  Designed by
                  <Link
                    href="https://syedadeeb.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-gray-300 text-sm -ml-3",
                    )}
                  >
                    Syed Adeeb
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
