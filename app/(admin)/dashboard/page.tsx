interface DashboardPageProps {}

const DashboardPage = async ({}: DashboardPageProps) => {
	return (
		<div>
			<iframe
				style={{
					background: "#F1F5F4",
					border: "none",
					borderRadius: "2px",
					boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
					width: "75vw",
					height: "100vh",
				}}
				src={process.env.MONGODB_CHARTS_URL}
			/>
		</div>
	);
};

export default DashboardPage;
