import { getUserById } from "@/lib/actions/User.action";
import User from "@/lib/database/model/User.model";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

interface DashboardPageProps {}

const DashboardPage = async ({}: DashboardPageProps) => {
	const clerkUser = await currentUser();
	const clerkUserId = clerkUser?.id || "";
	const user = (await getUserById(clerkUserId)) as User;
	const isAdmin = user.role === "Admin";
	if (!isAdmin) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen text-xl">
				<h1 className="text-5xl">401</h1>
				<picture className="w-[400px] h-[150px] relative -mt-[40px]">
					<Image src={"/assets/ua.png"} alt="" fill objectFit="contain" />
				</picture>
			</div>
		);
	}
	return <div>DashboardPage</div>;
};

export default DashboardPage;
