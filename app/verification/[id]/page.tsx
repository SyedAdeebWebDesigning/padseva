interface pageProps {
	params: {
		id: string;
	};
}

const page = ({ params }: pageProps) => {
	return <div>page: {params.id}</div>;
};

export default page;
