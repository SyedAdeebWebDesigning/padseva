"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormItem, FormControl, FormMessage } from "@/components/ui/form"; // Adjust import paths as needed
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNewsLetter } from "@/lib/actions/Newsletter.action";
import { useRouter } from "next/navigation";

// Define schema using Zod for form validation
const formSchema = z.object({
	coverPhoto: z.object({
		url: z.string().min(1, "Please upload a valid image file."),
	}),
	pdf: z.object({
		url: z.string().min(1, "Please upload a valid PDF file."),
	}),
});

const NewsletterForm = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [pdfPreview, setPdfPreview] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coverPhoto: {
				url: "",
			},
			pdf: {
				url: "",
			},
		},
	});

	// Handle form submission
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const coverPhotoUrl = values.coverPhoto;
		const pdfUrl = values.pdf;
		try {
			const newsletter = {
				issueCoverPhoto: coverPhotoUrl.url,
				issuePDF: pdfUrl.url,
			};
			await createNewsLetter(newsletter);
			toast.success("Newsletter created successfully");
			setTimeout(() => {
				router.push("/issues");
			}, 1500);
		} catch (error) {
			toast.error("Error creating newsletter");
		}
	}

	// Handle image upload
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type.startsWith("image")) {
			const url = URL.createObjectURL(file);
			setImagePreview(url);
			form.setValue("coverPhoto.url", url);
		} else {
			alert("Please upload a valid image file.");
		}
	};

	// Handle PDF upload
	const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && file.type === "application/pdf") {
			const url = URL.createObjectURL(file);
			setPdfPreview(url);
			form.setValue("pdf.url", url);
		} else {
			alert("Please upload a valid PDF file.");
		}
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
								onChange={handleImageUpload}
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

					{/* PDF Upload */}
					<FormItem>
						<label htmlFor="pdf" className="block text-gray-700">
							PDF Upload
						</label>
						<FormControl>
							<Input
								id="pdf"
								type="file"
								accept="application/pdf"
								onChange={handlePDFUpload}
								className="mt-2"
							/>
						</FormControl>
						{pdfPreview && (
							<a
								href={pdfPreview}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-2 text-blue-500">
								View Uploaded PDF
							</a>
						)}
						<FormMessage />
					</FormItem>

					{/* Submit Button */}
					<Button
						type="submit"
						className="w-full bg-[#91373E]"
						disabled={!imagePreview || !pdfPreview}>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default NewsletterForm;
