import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Impact = () => {
  return (
    <div className="flex flex-col mx-auto z-10 pb-16 backdrop-blur-md bg-white/10">
      <h3
        className="text-3xl md:text-5xl text-white times-new-roman mx-auto mt-20"
        style={{ color: "#ffffff", textShadow: "1px 1px 5px #000000" }}
      >
        Ready To Make An Impact?
      </h3>
      <div className="flex flex-col md:flex-row mx-auto mt-2 ">
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSdOFCZOhr9jdbcNsG_RKtxTvf1HIAVWYZmyHxCSWI16rDTTqg/viewform"
          target="_blank"
          className={cn(
            buttonVariants({ variant: "padseva", size: "lg" }),
            "bg-[#91373e] hover:bg-[#63262b] text-white relative  overflow-hidden group w-full",
          )}
        >
          Fill out the form
          <div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
        </Link>
      </div>
    </div>
  );
};

export default Impact;
