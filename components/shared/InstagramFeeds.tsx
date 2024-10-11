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
		<div className="container relative mx-auto z-20 py-10">
			{/* Instagram Feeds Section */}
			<div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-20">
				<Image
					src={"/assets/foundation.png"}
					fill
					className="object-left drop-shadow-pink"
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
	);
};

export default InstagramFeeds;
