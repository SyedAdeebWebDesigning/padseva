interface PlaceHolderImageProps {
	alt?: string;
	url?: string; // Optional custom URL for the placeholder image
}

const PlaceHolderImage = ({
	alt = "Placeholder Image",
	url = "/assets/ambiance-8.jpg",
}: PlaceHolderImageProps) => {
	const placeholderUrl = url || `https://via.placeholder.com/`;

	return (
		<div className="relative h-[50vh]">
			<img
				src={placeholderUrl}
				alt={alt}
				className="fixed top-0 left-0 w-full h-full object-cover "
			/>
		</div>
	);
};

export default PlaceHolderImage;
