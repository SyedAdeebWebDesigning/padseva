"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createSubscriber } from "@/lib/actions/NotifySubscriber.action";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface NewsletterSubscriberFormProps {}

const formSchema = z.object({
	email: z.string().email(),
});

const NewsletterSubscriberForm = ({}: NewsletterSubscriberFormProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			await createSubscriber({ email: values.email }); // Call createSubscriber with email
			toast.success(`A verification email has been sent to ${values.email}`);
			form.reset(); // Reset form after successful subscription
		} catch (error: any) {
			if (error.message === "Subscriber already exists.") {
				toast.error(
					"This email is already subscribed. Please use a different email."
				);
			} else {
				toast.error("Failed to subscribe. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="flex justify-center items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="relative w-full max-w-md">
					<FormItem>
						<FormControl>
							<div className="relative w-full">
								{/* Input Field */}
								<Input
									{...form.register("email")}
									type="email"
									placeholder="Enter your email"
									className="pr-52 py-[23px]" // Add padding to the right to make space for the button
								/>
								{/* Button Inside Input */}
								<Button
									type="submit"
									variant={"padseva"}
									disabled={isLoading}
									className="absolute right-1 top-1 bottom-0 px-4 bg-[#91373e] text-white rounded hover:bg-[#7a2d33] transition-all">
									{isLoading ? (
										<div className="flex items-center">
											<Loader2 className="animate-spin" />
											<span className="ml-2">Subscribing...</span>
										</div>
									) : (
										<div>Subscribe</div>
									)}
									<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
								</Button>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				</form>
			</Form>
		</div>
	);
};

export default NewsletterSubscriberForm;
