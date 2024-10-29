"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LayoutDashboard, LogInIcon, MoreVertical, User2 } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import { countUnreadReviews } from "@/lib/actions/Review.action";
import { toast } from "react-toastify";
import useSWR from "swr";

interface DropdownLinksProps {
	isAdmin: boolean;
}

// Fetch unread reviews function
const fetchUnreadReviews = async () => {
	try {
		const unreadCount = await countUnreadReviews();
		return unreadCount;
	} catch (error) {
		toast.error("Failed to get unread messages");
		return 0;
	}
};

const DropdownLinks = ({ isAdmin }: DropdownLinksProps) => {
	// Use SWR to fetch unread reviews with polling
	const { data: unread = 0, error } = useSWR(
		"unreadReviews",
		fetchUnreadReviews,
		{
			refreshInterval: 10000, // Poll every 10 seconds
		}
	);

	if (error) toast.error("Failed to get unread messages");

	return (
		<div className="bg-white z-[9999] relative">
			<SignedIn>
				<section className="fixed bottom-4 left-[50%] -translate-x-[50%] z-[9999]">
					<DropdownMenu>
						{isAdmin && (
							<DropdownMenuTrigger className="outline-none relative">
								<div className="flex items-center w-14 h-14 justify-center my-2 bg-gray-50 cursor-pointer rounded-full shadow-xl">
									<MoreVertical className="relative" />
									{/* Red dot indicator for admins with unread reviews */}
									{isAdmin && unread > 0 && (
										<span className="absolute top-1 right-1 size-4 bg-red-500 rounded-full" />
									)}
								</div>
							</DropdownMenuTrigger>
						)}

						<DropdownMenuContent
							className="bg-white border border-gray-200 shadow-md rounded-full p-2 mt-2 sm:w-auto z-[10000]"
							align="center">
							<div className="flex">
								{isAdmin && (
									<Link
										href="/dashboard"
										className={`relative ${
											isAdmin && unread > 0 && "font-semibold animate-pulse"
										} ${buttonVariants({
											variant: "link",
										})}`}>
										<p className="flex items-center">
											<LayoutDashboard className="mr-2" />
											<span className="hidden sm:flex">Dashboard</span>
										</p>
									</Link>
								)}
								<Link
									href="/user-profile"
									className={buttonVariants({ variant: "link" })}>
									<p className="flex items-center">
										<User2 className="mr-2" />
										<span className="hidden sm:flex">Your Profile</span>
									</p>
								</Link>
								<LogOutButton />
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</section>
			</SignedIn>

			<SignedOut>
				{isAdmin && (
					<section className="fixed bottom-4 left-[50%] -translate-x-[50%] z-[9999]">
						<DropdownMenu>
							<DropdownMenuTrigger className="outline-none">
								<div className="flex items-center w-14 h-14 justify-center my-auto bg-gray-50 cursor-pointer rounded-full shadow-xl">
									<MoreVertical />
								</div>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								className="bg-white border border-gray-200 shadow-md rounded-md p-2 mt-2 sm:w-auto z-[10000]"
								align="center">
								<div className="flex">
									<Button
										variant="link"
										className="flex items-center justify-center">
										<LogInIcon className="mr-2" />
										<SignInButton />
									</Button>
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
					</section>
				)}
			</SignedOut>
		</div>
	);
};

export default DropdownLinks;
