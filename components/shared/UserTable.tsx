"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { reverseRole } from "@/lib/actions/User.action";
import User from "@/lib/database/model/User.model";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";

interface UserTableProps {
	users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");

	if (!users) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-xl text-muted-foreground font-semibold">
					No users found.
				</p>
			</div>
		);
	}

	// Filter users based on the search term
	const filteredUsers = users.filter((user) => {
		const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
		return (
			fullName.includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.phone.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<div>
			<div className="mb-4 p-2 border rounded-full">
				<Input
					type="text"
					placeholder="Search by name, email, or phone..."
					className="border p-2 w-full rounded-full border-none"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<Table>
				<TableCaption>A list of your users.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">S.No</TableHead>
						<TableHead>First Name</TableHead>
						<TableHead>Last Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Role</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map((user, index) => (
						<TableRow key={user.id}>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{user.firstName}</TableCell>
							<TableCell>{user.lastName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell className="text-right">
								<Button
									variant={"link"}
									className="text-blue-500"
									onClick={() => {
										reverseRole(user.clerkId);
										router.refresh();
									}}>
									{user.role === "Admin" ? "Make Volunteer" : "Make Admin"}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default UserTable;
