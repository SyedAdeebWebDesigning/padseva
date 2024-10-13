import NewsletterForm from "@/components/shared/NewsletterForm";
import { currentUser } from "@clerk/nextjs/server";

interface pageProps {}

const page = async ({}: pageProps) => {
	const user = await currentUser();
	const userId = user?.id || "";
	return (
		<div>
			<NewsletterForm type="Create" userClerkId={userId} />
		</div>
	);
};

export default page;
