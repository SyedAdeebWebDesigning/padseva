"use client";

import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { verifySubscriber } from "@/lib/actions/NotifySubscriber.action";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface VerifyEmailButtonProps {
	subscriberId: string;
	isVerified: boolean;
}

const VerifyEmailButton = ({
	subscriberId,
	isVerified,
}: VerifyEmailButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	if (isVerified) return redirect("/");
	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			await verifySubscriber(subscriberId);
			toast.success("Verified successfully");
		} catch (error) {
			toast.error("Failed to verified");
		} finally {
			setIsLoading(false);
			setTimeout(() => {
				router.push("/");
			}, 1500);
		}
	};
	return (
		<>
			<Button
				className="w-full bg-[#91373e] text-white rounded hover:bg-[#7a2d33] transition-all"
				onClick={handleSubmit}
				disabled={isLoading || isVerified}>
				{isLoading ? (
					<div className="flex items-center">
						<Loader2 className="animate-spin" />
						<span className="ml-2">Verifying...</span>
					</div>
				) : (
					<div>{isVerified ? "Verified" : "Verify"}</div>
				)}
			</Button>
		</>
	);
};

export default VerifyEmailButton;
