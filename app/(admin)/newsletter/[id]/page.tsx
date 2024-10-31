import NewsletterForm from "@/components/shared/NewsletterForm";
import { getNewsLetterById } from "@/lib/actions/Newsletter.action";
import { currentUser } from "@clerk/nextjs/server";

interface pageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: pageProps) => {
	const user = await currentUser();
	const userId = user?.id || "";
	const data = await getNewsLetterById(params.id);
	const newsLetter = data && JSON.parse(JSON.stringify(data));

	if (!data) return;

	return (
		<div>
			<NewsletterForm type="Update" userClerkId={userId} data={newsLetter} />
		</div>
	);
};

export default page;
