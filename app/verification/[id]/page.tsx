import VerifyEmailButton from "@/components/shared/VerifyEmailButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GetSubscriberById } from "@/lib/actions/NotifySubscriber.action";
import { ISubscriberSchema } from "@/lib/database/model/Subscriber.model";
import Link from "next/link";

interface pageProps {
	params: {
		id: string;
	};
}

const page = async ({ params }: pageProps) => {
	const data = await GetSubscriberById(params.id);
	const subscriber = JSON.parse(JSON.stringify(data)) as ISubscriberSchema;

	if (!subscriber) {
		return (
			<div className="flex items-center justify-center min-h-screen mx-auto ">
				<Card className="w-[400px]">
					<CardHeader>
						<CardDescription className="text-muted-foreground">
							Looks like your verification link is invalid or expired. Please
							retry subscribing to our newsletter
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<Link
							href={"/#newsletter"}
							className="bg-[#91373e] text-white rounded hover:bg-[#7a2d33]">
							<Button variant={"padseva"} className="w-full">
								Newsletter
							</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center justify-center min-h-screen mx-auto ">
				<Card className="w-[400px]">
					<CardHeader>
						<CardTitle className="font-semibold text-xl">
							Verify Your Email
						</CardTitle>
						<CardDescription className="text-muted-foreground line-clamp-1">
							{subscriber.email}
						</CardDescription>
					</CardHeader>
					<CardFooter>
						<VerifyEmailButton
							subscriberId={params.id}
							isVerified={subscriber.hasVerified}
						/>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default page;
