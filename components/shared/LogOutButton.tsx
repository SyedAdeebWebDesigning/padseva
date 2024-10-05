"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

interface LogOutButtonProps {}

const LogOutButton = ({}: LogOutButtonProps) => {
	return (
		<Button variant={"link"} className="text-red-600 flex items-center">
			<LogOutIcon className="mr-2" />
			<SignOutButton />
		</Button>
	);
};

export default LogOutButton;
