"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createSubscriber } from "@/lib/actions/NotifySubscriber.action";

interface NewsletterSubscriberFormProps {}

const formSchema = z.object({
	email: z.string().email(),
});

const NewsletterSubscriberForm = ({}: NewsletterSubscriberFormProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await createSubscriber({ email: values.email }); // Call createSubscriber with email
			toast.success("Subscribed successfully!");
			form.reset(); // Reset form after successful subscription
		} catch (error: any) {
			if (error.message === "Subscriber already exists.") {
				toast.error(
					"This email is already subscribed. Please use a different email."
				);
			} else {
				toast.error("Failed to subscribe. Please try again.");
			}
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
									className="absolute right-1 top-1 bottom-0 px-4 bg-[#91373e] text-white rounded hover:bg-[#7a2d33] transition-all">
									Subscribe
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
