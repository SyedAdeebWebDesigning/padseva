"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
	createNewsLetter,
	updateNewsLetter,
} from "@/lib/actions/Newsletter.action";
import { useRouter } from "next/navigation";
import { INewsLetter } from "@/lib/database/model/Newsletter.model";

// Define form schema
const formSchema = z.object({
	coverPhoto: z.object({
		url: z.string().min(1, "Please upload a valid image file."),
	}),
	pdf: z.object({
		url: z.string().min(1, "Please enter a valid PDF URL."),
	}),
});

const NewsletterForm = ({
	userClerkId,
	type,
	data,
}: {
	userClerkId: string;
	type: "Create" | "Update";
	data?: INewsLetter;
}) => {
	const [imagePreview, setImagePreview] = useState<string | any>(
		data?.issueCoverPhoto
	);
	const [pdfUrl, setPdfUrl] = useState<string | any>(data?.issuePDF);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coverPhoto: { url: data?.issueCoverPhoto || "" },
			pdf: { url: data?.issuePDF || "" },
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const newsletter = {
			issueCoverPhoto: values.coverPhoto.url,
			issuePDF: values.pdf.url,
			userClerkId,
		};

		try {
			setIsLoading(true);
			if (type === "Create") {
				await createNewsLetter({
					...newsletter,
				});
				toast.success("Newsletter created successfully");
			} else if (type === "Update" && data?._id) {
				await updateNewsLetter(data._id, newsletter);
				toast.success("Newsletter updated successfully");
			}

			setTimeout(() => {
				router.push("/newsletter");
				form.reset();
				setImagePreview(null);
				setPdfUrl(null);
			}, 1500);
		} catch (error) {
			toast.error("Error submitting newsletter");
			console.log(error);
		}
	}

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "image" | "pdf"
	) => {
		const files = e.target.files;
		if (files) {
			const file = files[0];
			const reader = new FileReader();

			reader.onload = (event: ProgressEvent<FileReader>) => {
				if (event.target && typeof event.target.result === "string") {
					if (type === "image") {
						setImagePreview(event.target.result);
						form.setValue("coverPhoto.url", event.target.result);
					}
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const handlePdfUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const url = e.target.value;
		setPdfUrl(url);
		form.setValue("pdf.url", url);
	};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 md:w-1/3 w-full bg-white shadow-lg p-6 rounded-md">
					{/* Cover Photo Upload */}
					<FormItem>
						<label htmlFor="coverPhoto" className="block text-gray-700">
							Cover Photo Upload
						</label>
						<FormControl>
							<Input
								id="coverPhoto"
								type="file"
								accept="image/*"
								onChange={(e) => handleFileChange(e, "image")}
								className="mt-2"
							/>
						</FormControl>
						{imagePreview && (
							<img
								src={imagePreview}
								alt="Cover Preview"
								className="mt-2 w-full"
							/>
						)}
						<FormMessage />
					</FormItem>

					{/* PDF URL input */}
					<FormItem>
						<label htmlFor="pdf" className="block text-gray-700">
							PDF URL
						</label>
						<FormControl>
							<Input
								id="pdf"
								type="text"
								value={pdfUrl || ""}
								onChange={handlePdfUrlChange}
								className="mt-2"
								placeholder="Enter the PDF URL"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>

					{/* Submit Button */}
					<Button
						type="submit"
						variant={"padseva"}
						className="w-full bg-[#91373E]"
						disabled={!imagePreview || !pdfUrl || isLoading}>
						{type === "Create"
							? `${isLoading ? "Creating..." : "Create Newsletter"}`
							: `${isLoading ? "Updating..." : "Update Newsletter"}`}
						<div className="absolute ease-[cubic-bezier(0.19,1,0.22,1)] -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white/20 transition-all duration-500 group-hover:left-[120%]" />
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewsletterForm;
