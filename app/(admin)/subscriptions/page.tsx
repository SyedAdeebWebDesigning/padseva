import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { GetAllSubscriber } from "@/lib/actions/NotifySubscriber.action";
import { ISubscriberSchema } from "@/lib/database/model/Subscriber.model";
import { SearchIcon } from "lucide-react";

interface PageProps {
	searchParams?: { search?: string };
}

const page = async ({ searchParams }: PageProps) => {
	const searchTerm = searchParams?.search || "";
	const data = await GetAllSubscriber(searchTerm);
	const subscriberData = JSON.parse(
		JSON.stringify(data)
	) as ISubscriberSchema[];

	if (!subscriberData) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-xl text-muted-foreground font-semibold">
					No subscribers found.
				</p>
			</div>
		);
	}

	return (
		<div>
			{/* Search Form */}
			<form method="GET" className="mb-4 relative border rounded-full p-2">
				<Input
					type="text"
					name="search"
					placeholder="Search by email"
					defaultValue={searchTerm}
					className="w-full relative border-none"
				/>
				<Button
					type="submit"
					variant={"secondary"}
					className="mt-2 px-4 py-1 rounded-full absolute top-0 right-2 flex justify-center">
					<SearchIcon className="size-4 mr-2" />
					Search
				</Button>
			</form>

			{/* Subscriber Table */}
			<Table>
				<TableCaption>A list of your subscribers.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>S.No</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Verification Status</TableHead>
						<TableHead className="text-right">Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subscriberData.map((sub, index) => (
						<TableRow key={sub._id}>
							<TableHead>{index + 1}.</TableHead>
							<TableHead>{sub.email}</TableHead>
							<TableHead>
								{sub.hasVerified ? "Verified" : "Not Verified"}
							</TableHead>
							<TableHead className="text-right">
								{new Intl.DateTimeFormat("en-IN", {
									dateStyle: "full",
								}).format(new Date(sub.createdAt!))}
							</TableHead>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default page;
