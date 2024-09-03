"use client";

import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
	return (
		<div className="sticky -z-10 top-0 w-full h-screen bg-[#F7E7EF] overflow-hidden flex items-center justify-center">
			{/* Background text/logo */}
			<div className="absolute text-center z-20">
				<div className="relative lg:size-[700px] size-[400px] z-[40]">
					<Image src={"/padseva-logo-2.png"} fill alt="logo" />
				</div>
			</div>

			{/* Moving flower images with high z-index */}
		</div>
	);
};

export default HeroSection;
