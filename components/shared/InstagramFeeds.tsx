"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface InstagramFeedsProps {}

const InstagramFeeds = ({}: InstagramFeedsProps) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Ensure the script runs on the client-side only
		setIsClient(true);
	}, []);

	return (
		<div className="relative -mb-20">
			<div className="absolute inset-x-0 top-0 z-0 mt-10">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fill-opacity="1"
						d="M0,64L80,90.7C160,117,320,171,480,176C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
				</svg>
			</div>
			<div className="absolute inset-x-0 bottom-0 z-0">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#ffbaba"
						fill-opacity="1"
						d="M0,64L80,90.7C160,117,320,171,480,176C640,181,800,139,960,128C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
				</svg>
			</div>

			<div className="container relative mx-auto z-20 py-10">
				{/* Instagram Feeds Section */}
				<div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-20">
					<Image
						src={"/assets/foundation.png"}
						fill
						className="object-left drop-shadow-white"
						alt="founder"
						style={{ objectFit: "contain" }}
					/>
				</div>
				<div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
					{isClient && (
						<>
							<script
								src="https://static.elfsight.com/platform/platform.js"
								async></script>

							<div
								className="elfsight-app-2f05fa6b-6b27-4250-942c-93e30a384876"
								style={{
									width: "100%",
									height: "100%",
									overflow: "hidden",
								}}></div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default InstagramFeeds;
