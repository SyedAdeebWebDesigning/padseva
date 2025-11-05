import Image from "next/image";
import Animation from "./Animation";

const LoadingState = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-[#F7E7EF]">
			<div className="relative text-center">
				<div
					className="relative lg:size-[600px] size-[400px]" // Ensure the parent div has a height and width
				>
					<Image
						className="scale-[50%] animate-pulse"
						src="/padseva-logo-2.webp"
						alt="logo"
						loading={"eager"}
						fill
						style={{ objectFit: "contain" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoadingState;
