import UserTable from "@/components/shared/UserTable";
import { getUsers } from "@/lib/actions/User.action";

interface pageProps {}

const page = async ({}: pageProps) => {
	const data = await getUsers();
	const users = JSON.parse(JSON.stringify(data));
	return (
		<main>
			<UserTable users={users} />
		</main>
	);
};

export default page;
