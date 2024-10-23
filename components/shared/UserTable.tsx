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

interface UserTableProps {
	users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
	const router = useRouter();
	return (
		<Table>
			<TableCaption>A list of your users.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">S.No</TableHead>
					<TableHead>First Name</TableHead>
					<TableHead>Last Name</TableHead>
					<TableHead className="">Email</TableHead>
					<TableHead className="">Phone</TableHead>
					<TableHead className="">Role</TableHead>
					<TableHead className="">Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user, index) => (
					<TableRow key={user.id}>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{user.firstName}</TableCell>
						<TableCell>{user.lastName}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.phone}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell className="">
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
	);
};

export default UserTable;
