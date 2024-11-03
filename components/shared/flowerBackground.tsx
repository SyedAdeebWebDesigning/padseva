interface FlowerBackgroundProps {
	backgroundColor?: string;
	children?: React.ReactNode;
}

const FlowerBackground = ({
	backgroundColor,
	children,
}: FlowerBackgroundProps) => {
	// Array of SVG URLs
	const svgUrls = [
		"https://media-public.canva.com/FagUw/MAFKq-FagUw/1/s-1.svg",
		"https://media-public.canva.com/EDmFo/MAFKq6EDmFo/1/s-1.svg",
		"https://media-public.canva.com/lRf1Y/MAFKqylRf1Y/1/t.png",
		"https://media-public.canva.com/xfwJE/MADmd7xfwJE/3/t.png",
		"https://media-public.canva.com/hoLCI/MADmd6hoLCI/3/t.png",
	];

	// Function to get three random SVG URLs
	const getRandomSvgUrls = () => {
		const selectedUrls = [];
		for (let i = 0; i < 3; i++) {
			const randomIndex = Math.floor(Math.random() * svgUrls.length);
			selectedUrls.push(svgUrls[randomIndex]);
		}
		return selectedUrls;
	};

	const randomSvgUrls = getRandomSvgUrls()
		.map((url) => `url(${url})`)
		.join(", ");

	const styles = {
		backgroundColor,
		backgroundImage: randomSvgUrls,
		backgroundRepeat: "repeat",
		backgroundSize: "contain", // Ensures smaller SVGs
		padding: "0px",
		borderRadius: "8px",
	};

	return <div style={styles}>{children || "Flower Background"}</div>;
};

export default FlowerBackground;
