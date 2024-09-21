"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation"; // Import this to get query params
import { completeUserProfile } from "@/lib/actions/User.action";
import { toast } from "react-toastify";

const formSchema = z.object({
	description: z
		.string()
		.min(2, {
			message: "Description must be at least 2 characters.",
		})
		.max(200, {
			message: "Description must be at most 200 characters.",
		}),
	instagramProfile: z
		.string()
		.min(2, {
			message: "Instagram Profile must be at least 2 characters.",
		})
		.url(),
});

const Page = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
			instagramProfile: "",
		},
	});

	// Get the search parameters
	const searchParams = useSearchParams();
	const clerkId = searchParams.get("clerkId"); // Extract clerkId from URL

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		const description = values.description;
		const instagramUrl = values.instagramProfile;

		// 3. Make a POST request to your API.
		try {
			const data = await completeUserProfile({
				description,
				instagramUrl,
				userClerkId: clerkId as string,
			});
			toast.success("Profile updated successfully");
			console.log(data);
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			form.reset();
		}
	}

	return (
		<div className="bg-[#ffe8e8]">
			<div className="min-h-screen flex flex-col items-center justify-center px-2 w-full">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2 md:w-1/3 w-full bg-white/10 py-4 px-10 rounded-2xl">
						<h2 className="flex items-center justify-center text-3xl">
							Complete Your Profile
						</h2>
						<FormField
							control={form.control}
							name="instagramProfile"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter your Instagram profile URL"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											placeholder="Tell us about yourself"
											rows={10}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="w-full border-[#91373E] border-2 rounded hover:bg-[#91373E] hover:text-white bg-transparent text-black">
							Submit
						</Button>
						<div className="flex flex-col sm:flex-row items-center justify-between">
							<h3>Want to update your account?</h3>
							<Link
								href={"/user-profile"}
								className={cn(
									buttonVariants({ variant: "link" }),
									"text-[#91373E]"
								)}>
								My Account
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default Page;
