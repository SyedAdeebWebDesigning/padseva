"use client";

import { IReviewSchema } from "@/lib/database/model/Review.model";
import { cn, timeAgo } from "@/lib/utils";
import { Button } from "../ui/button";
import { deleteReview, markReviewAsRead } from "@/lib/actions/Review.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface MessageProps {
	message: IReviewSchema;
	index: number;
}

const Message = ({ message, index }: MessageProps) => {
	const router = useRouter();
	const markAsRead = async () => {
		try {
			await markReviewAsRead(message._id as string);
			toast.success("Message marked as read.");
			setTimeout(() => {
				router.refresh();
			}, 1500);
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};

	const deleteRead = async () => {
		try {
			await deleteReview(message._id as string);
			toast.success("Message deleted successfully.");
			setTimeout(() => {
				router.refresh();
			}, 1500);
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};
	return (
		<div className="container mx-auto p-4">
			<div className="bg-white shadow-md rounded-lg overflow-hidden">
				<div className="p-6">
					<h1 className="text-xl text-gray-800 flex items-center justify-between">
						<span className="flex items-center">
							<span className="flex flex-col">
								<span className="">
									{index + 1}. {message.firstName} {message.lastName}
								</span>
								<span className="text-gray-500 text-sm">{message.email}</span>
							</span>
						</span>
						<div className="flex flex-col text-right">
							<span className="text-gray-500 text-sm">
								{timeAgo(message.createdAt)}
							</span>
						</div>
					</h1>
					<hr className="my-4 border-gray-200" />
					<div className="flex items-center justify-between">
						<div className="w-[90%]">
							<p
								className={cn(
									"text-lg text-gray-700 mt-2 leading-relaxed",
									message.isRead ? "" : "font-semibold"
								)}>
								{message.review}
							</p>
						</div>
						{message.isRead ? (
							<Button
								variant={"link"}
								className="mt-2 text-red-500"
								onClick={() => deleteRead()}>
								Delete
							</Button>
						) : (
							<Button
								variant={"link"}
								className="mt-2 text-gray-500"
								onClick={() => markAsRead()}>
								Mark as read
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Message;
