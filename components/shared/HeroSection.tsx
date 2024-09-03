"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
	return (
		<div className="sticky -z-10 top-0 w-full h-screen bg-[#F7E7EF] overflow-hidden flex items-center justify-center">
			<div className="absolute text-center z-50">
				<motion.div
					className="relative lg:size-[700px] size-[400px] z-[60]"
					initial={{ scale: 0 }}
					whileInView={{ scale: 1 }}>
					<Image
						src={"/padseva-logo-2.png"}
						fill
						alt="logo"
						objectFit="contain"
					/>
				</motion.div>
			</div>
		</div>
	);
};

export default HeroSection;
