import Image from "next/image";

const Gallery = () => {
	const galleryImages = [
		"/gallery/1.webp",
		"/gallery/2.webp",
		"/gallery/3.webp",
		"/gallery/4.webp",
		"/gallery/5.webp",
		"/gallery/6.webp",
		"/gallery/7.webp",
		"/gallery/8.webp",
		"/gallery/9.webp",
		"/gallery/10.webp",
		"/gallery/11.webp",
		"/gallery/12.webp",
		"/gallery/13.webp",
		"/gallery/14.webp",
	];

	return (
		<div className="container mx-auto px-4 py-10">
			{/* ✅ Title */}
			<div className="w-full flex mb-8">
				<Image
					src="/assets/Gallery.png"
					width={500}
					height={100}
					alt="Gallery"
					className=""
				/>
			</div>

			{/* ✅ Bento Grid Layout */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-2">
				{/* ✅ Left Side - Large Collage Area */}
				<div className="flex flex-col gap-2">
					{/* Top Large Collage */}
					<div className="h-72 md:h-96 lg:h-[450px] w-full relative overflow-hidden shadow-lg bg-black">
						<Image
							src={galleryImages[0]} // Use a collage-style image here
							alt="Gallery Collage"
							fill
							className="object-cover  p-1 md:p-2"
						/>
					</div>

					{/* Below - Two Medium Images */}
					<div className="grid grid-cols-2 gap-2">
						{galleryImages.slice(1, 3).map((src, index) => (
							<div
								key={index}
								className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-black">
								<Image
									src={src}
									alt={`Gallery Image ${index + 2}`}
									fill
									className="object-cover  p-1 md:p-2"
								/>
							</div>
						))}
					</div>
				</div>
				{/* ✅ Middle Side - More Images */}
				<div className="flex flex-col gap-2">
					{/* Two Small Images */}
					<div className="grid grid-cols-2 gap-2">
						{galleryImages.slice(4, 6).map((src, index) => (
							<div
								key={index}
								className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-black">
								<Image
									src={src}
									alt={`Gallery Image ${index + 5}`}
									fill
									className="object-cover  p-1 md:p-2"
								/>
							</div>
						))}
					</div>
					{/* One Large Image */}
					<div className="h-72 md:h-96 lg:h-[450px] w-full relative overflow-hidden shadow-lg bg-black">
						<Image
							src={galleryImages[3]}
							alt="Gallery Image Large"
							fill
							className="object-cover  p-1 md:p-2"
						/>
					</div>
				</div>

				{/* ✅ Right Section - Large Video */}
				<iframe
					src="https://drive.google.com/file/d/1KttXyNED3BVpahlHw8KcqHpZ42nd-Y_l/preview"
					className="h-[704px] xl:h-full w-full bg-white"
					allow="autoplay"></iframe>
			</div>

			{/* ✅ Bottom Section - Remaining Images */}
			<div className="grid grid-cols-4 gap-2 mt-2 ">
				{galleryImages.slice(6).map((src, index) => (
					<div
						key={index}
						className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-black">
						<Image
							src={src}
							alt={`Gallery Image ${index + 7}`}
							fill
							className="object-cover  p-1 md:p-2"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
