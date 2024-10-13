"use client";

import { deleteNewsLetter } from "@/lib/actions/Newsletter.action";
import { buttonVariants } from "../ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface DeleteIssueButtonProps {
	issueId: string;
}

const DeleteIssueButton = ({ issueId }: DeleteIssueButtonProps) => {
	const router = useRouter();
	const deleteIssue = async (issueId: string) => {
		await deleteNewsLetter(issueId);
		toast.success("Issue deleted successfully");
		setTimeout(() => {
			router.refresh();
		}, 1500);
	};
	return (
		<div>
			<AlertDialog>
				<AlertDialogTrigger>
					<div
						className={cn(
							buttonVariants({ variant: "link" }),
							"text-red-500 cursor-pointer p-0"
						)}>
						Delete Issue
					</div>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							issue from out database
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-500 hover:bg-red-600"
							onClick={() => deleteIssue(issueId)}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default DeleteIssueButton;
