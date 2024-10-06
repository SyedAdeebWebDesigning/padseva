"use client";

import User from "@/lib/database/model/User.model";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Home, LayoutDashboard, MessageSquare, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation"; // Import usePathname

interface SidebarProps {
	user: User;
}

const Sidebar = ({ user }: SidebarProps) => {
	const pathname = usePathname(); // Get the current route

	if (!user) return null;

	return (
		<section>
			<div className="flex justify-start">
				<picture className="relative w-[150px] sm:w-[250px] md:w-[300px] h-12 lg:w-[400px]">
					<Image
						src={"/assets/PD.png"}
						fill
						alt="Dashboard Image"
						className="object-contain"
					/>
				</picture>
			</div>
			<div className="flex flex-col bg-gray-300 mt-10 p-2 rounded">
				{/* Admin Details */}
				<div className="flex items-center ">
					<div>
						<div className="relative size-12">
							<Image
								src={user.photo}
								fill
								alt="admin"
								className="rounded-full"
							/>
						</div>
					</div>
					<div className="ml-2">
						<h2 className="text-xl font-semibold line-clamp-1">
							{user.firstName} {user.lastName}
						</h2>
						<p className="line-clamp-1 text-gray-500">{user.email}</p>
					</div>
				</div>
			</div>
			{/* Sidebar Links */}
			<div className="flex flex-col my-12 items-start space-y-4">
				<Link
					href="/"
					className={`${buttonVariants({
						variant: "link",
					})} ${
						pathname === "/" ? "font-semibold underline underline-offset-4" : ""
					}`}>
					<Home className="mr-2" />
					<p className="text-lg">Home</p>
				</Link>
				<Link
					href="/dashboard"
					className={`${buttonVariants({
						variant: "link",
					})} ${
						pathname === "/dashboard"
							? "font-semibold underline underline-offset-4"
							: ""
					}`}>
					<LayoutDashboard className="mr-2" />
					<p className="text-lg">Dashboard</p>
				</Link>
				<Link
					href="/issues"
					className={`${buttonVariants({
						variant: "link",
					})} ${
						pathname === "/issues"
							? "font-semibold underline underline-offset-4"
							: ""
					}`}>
					<Newspaper className="mr-2" />
					<p className="text-lg">Your Issues</p>
				</Link>
				<Link
					href="/messages"
					className={`${buttonVariants({
						variant: "link",
					})} ${
						pathname === "/messages"
							? "font-semibold underline underline-offset-4"
							: ""
					}`}>
					<MessageSquare className="mr-2" />
					<p className="text-lg">Your Messages</p>
				</Link>
			</div>
		</section>
	);
};

export default Sidebar;
