"use client";

import { IReviewSchema } from "@/lib/database/model/Review.model";
import Message from "./Message";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { MarkAllAsRead, deleteAllRead } from "@/lib/actions/Review.action";
import { useRouter } from "next/navigation";

interface MessagesProps {
	messages: IReviewSchema[];
}

const Messages = ({ messages }: MessagesProps) => {
	const router = useRouter();
	const markAll = async () => {
		try {
			await MarkAllAsRead();
			toast.success("All messages marked as read.");
			setTimeout(() => {
				router.refresh();
			}, 1500);
		} catch (err) {
			toast.error("An error occurred. Please try again.");
		}
	};

	const deleteRead = async () => {
		try {
			await deleteAllRead();
			toast.success("Messages deleted successfully.");
			setTimeout(() => {
				router.refresh();
			}, 1500);
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};
	return (
		<section>
			<div>
				{messages.length === 0 ? (
					<div className="min-h-screen flex items-center justify-center">
						<p>No messages found.</p>
					</div>
				) : (
					<div>
						<div className="flex items-center justify-start container mx-auto p-4">
							<div>
								<Button variant={"link"} onClick={() => markAll()}>
									Mark all as read
								</Button>
								<Button
									variant={"link"}
									className="text-red-500"
									onClick={() => deleteRead()}>
									Delete read
								</Button>
							</div>
						</div>
						{messages.map((message, index) => (
							<Message message={message} index={index} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Messages;
