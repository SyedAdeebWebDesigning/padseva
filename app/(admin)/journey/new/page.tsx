"use client";

interface pageProps {}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createJourney } from "@/lib/actions/Journey.action";
import { toast } from "react-toastify";

const formSchema = z.object({
	title: z.string().min(1, {
		message: "Title is required",
	}),
	value: z.string().min(1, {
		message: "Value is required",
	}),
	isMore: z.boolean().optional(),
});

const page = ({}: pageProps) => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			value: undefined,
		},
	});
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const journey = {
			title: values.title,
			value: Number(values.value),
			isMore: values.isMore,
		};
		try {
			await createJourney(journey);
			toast.success("Journey created successfully");
			router.push("/journey");
		} catch (error) {
			console.log(error);
			toast.error("Error creating journey");
		}
	}
	return (
		<div className="min-h-screen flex flex-col items-center justify-center w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
					{/* Title Input Field */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">Title</FormLabel>
								<FormControl>
									<Input
										placeholder="Pads Distributed"
										className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91373E] focus:outline-none"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-600 text-sm mt-1" />
							</FormItem>
						)}
					/>

					{/* Value Input Field */}
					<FormField
						control={form.control}
						name="value"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">Value</FormLabel>
								<FormControl>
									<Input
										placeholder="100"
										type="number"
										className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#91373E] focus:outline-none"
										{...field}
									/>
								</FormControl>
								<FormMessage className="text-red-600 text-sm mt-1" />
							</FormItem>
						)}
					/>

					{/* Checkbox Input for 'Is More' */}
					<FormField
						control={form.control}
						name="isMore"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">Is More</FormLabel>
								<FormControl>
									<div className="flex items-center space-x-2">
										{/* Native checkbox with 'checked' instead of 'value' */}
										<input
											type="checkbox"
											checked={field.value} // Use 'checked' instead of 'value'
											onChange={(e) => field.onChange(e.target.checked)} // Ensure it updates the form state with boolean
											className="h-5 w-5 text-[#91373E] focus:ring-[#91373E]"
										/>
										<FormLabel className="text-md text-gray-600">
											will add (+) to the total (400+)
										</FormLabel>
									</div>
								</FormControl>
								<FormMessage className="text-red-600 text-sm mt-1" />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button
						type="submit"
						variant={"padseva"}
						className="w-full p-4 bg-[#91373E] text-white font-bold rounded-lg shadow-xl hover:bg-[#BC6B6B] transition-all ease-in-out duration-300">
						Create Journey
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default page;
