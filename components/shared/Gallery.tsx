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
					loading="lazy"
				/>
			</div>

			{/* ✅ Bento Grid Layout */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-1">
				{/* ✅ Left Side - Large Collage Area */}
				<div className="flex flex-col gap-1">
					{/* Top Large Collage */}
					<div className="h-72 md:h-96 lg:h-[362px] w-full relative overflow-hidden shadow-lg bg-white ">
						<Image
							src={galleryImages[0]} // Use a collage-style image here
							alt="Gallery Collage"
							loading="lazy"
							fill
							className="object-cover p-1 "
						/>
					</div>

					{/* Below - Two Medium Images */}
					<div className="grid grid-cols-2 gap-1">
						{galleryImages.slice(1, 3).map((src, index) => (
							<div
								key={index}
								className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-white">
								<Image
									src={src}
									loading="lazy"
									alt={`Gallery Image ${index + 2}`}
									fill
									className="object-cover  p-1"
								/>
							</div>
						))}
					</div>
				</div>
				{/* ✅ Middle Side - More Images */}
				<div className="flex flex-col gap-1">
					{/* Two Small Images */}
					<div className="grid grid-cols-2 gap-1">
						{galleryImages.slice(4, 6).map((src, index) => (
							<div
								key={index}
								className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-white">
								<Image
									loading="lazy"
									src={src}
									alt={`Gallery Image ${index + 5}`}
									fill
									className="object-cover  p-1"
								/>
							</div>
						))}
					</div>
					{/* One Large Image */}
					<div className="h-72 md:h-96 lg:h-[362px] w-full relative overflow-hidden shadow-lg bg-white">
						<Image
							src={galleryImages[3]}
							alt="Gallery Image Large"
							loading="lazy"
							fill
							className="object-cover  p-1"
						/>
					</div>
				</div>

				{/* ✅ Right Section - Large Video */}
				<div className="bg-white p-1">
					<iframe
						src="https://drive.google.com/file/d/1qnazvLjIDKYL16y2SoVYWk-jV5-mfWKc/preview"
						className="h-[362px] xl:h-full w-full bg-white"
						allow="autoplay"></iframe>
				</div>
			</div>

			{/* ✅ Bottom Section - Remaining Images */}
			<div className="grid grid-cols-4 gap-1 mt-1 ">
				{galleryImages.slice(6).map((src, index) => (
					<div
						key={index}
						className="h-40 md:h-52 lg:h-64 relative overflow-hidden shadow-lg bg-white">
						<Image
							src={src}
							alt={`Gallery Image ${index + 7}`}
							fill
							loading="lazy"
							className="object-cover  p-1"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Gallery;
