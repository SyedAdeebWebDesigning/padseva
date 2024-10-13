"use client";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	firstName: z.string().min(2, {
		message: "First Name must be at least 2 characters.",
	}),
	lastName: z
		.string()

		.optional(),
	message: z
		.string()
		.min(2, {
			message: "Message must be at least 2 characters.",
		})
		.max(200, {
			message: "Message must be at most 200 characters.",
		}),
});

interface ContactProps {}

const Contact = ({}: ContactProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			message: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		form.reset();
	}
	return (
		<div id="contact" className="relative">
			<div className="absolute inset-x-0 bottom-0 z-0"></div>
			<div className="absolute top-10 right-0 2xl:right-52 ">
				<div className="relative size-[400px] opacity-85">
					<Image src={"/Flower-1.png"} alt="" fill />
				</div>
			</div>
			<section className="mx-auto flex w-full flex-col justify-center items-start p-10">
				<picture className="relative z-20 w-[250px] md:w-[300px] lg:w-[450px] lg:h-20 h-[50px] font-semibold  mt-32">
					<Image
						src={"/assets/contact.png"}
						fill
						className="lg:mx-[300px] object-left drop-shadow-white"
						alt="founder"
						objectFit="contain"
					/>
				</picture>
				<div className="flex items-center justify-center w-full mx-auto my-10 relative z-20">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-2 md:w-1/3 w-full">
							<div className=" flex flex-col md:flex-row md:gap-x-2 gap-y-2 gap-x-0 md:gap-y-0">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem className="md:w-1/2 w-full">
											<FormControl>
												<Input placeholder="First name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem className="md:w-1/2 w-full">
											<FormControl>
												<Input
													placeholder="Last name"
													{...field}
													className=""
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea placeholder="Enter your message" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full bg-[#91373E]">
								Submit
							</Button>
						</form>
					</Form>
				</div>
			</section>
		</div>
	);
};

export default Contact;
