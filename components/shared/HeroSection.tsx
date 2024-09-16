"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
	return (
		<div className="sticky z-50 top-0 w-full h-screen bg-[#F7E7EF] overflow-hidden flex items-center justify-center">
			<div className="relative text-center">
				<motion.div
					className="relative lg:size-[600px] size-[400px]" // Ensure the parent div has a height and width
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}>
					<Image
						src="/padseva-logo-2.png"
						alt="logo"
						fill
						style={{ objectFit: "contain" }}
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
