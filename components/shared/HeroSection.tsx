"use client";

import React from "react";

const HeroSection: React.FC = () => {
	return (
		<div className="sticky -z-10 top-0 w-full h-screen bg-[#F7E7EF] overflow-hidden flex items-center justify-center">
			{/* Background text/logo */}
			<div className="absolute text-center z-20">
				<h1 className="text-[#91373E] font-bold oswald-300 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
					Padseva
				</h1>
			</div>

			{/* Moving flower images with high z-index */}
		</div>
	);
};

export default HeroSection;
