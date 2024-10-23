import Messages from "@/components/shared/Messages";
import { getAllReviews } from "@/lib/actions/Review.action";
import { IReviewSchema } from "@/lib/database/model/Review.model";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getAllReviews();
	const messages = JSON.parse(JSON.stringify(data)) as IReviewSchema[];

	return (
		<main>
			<Messages messages={messages} />
		</main>
	);
};

export default page;
