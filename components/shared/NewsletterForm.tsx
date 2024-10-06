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
		url: z.string().nonempty("Please upload a valid image file."),
	}),
	pdf: z.object({
		url: z.string().nonempty("Please upload a valid PDF file."),
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
				router.refresh();
			}, 1500);
			form.reset(); // Reset form after submission
			setImagePreview(null); // Reset image preview
			setPdfPreview(null); // Reset PDF preview
		} catch (error) {
			toast.error("Error creating newsletter");
		}
	}

	// Handle file change for images
	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: "image" | "pdf"
	) => {
		const files = e.target.files;
		if (files) {
			if (type === "image") {
				const file = files[0];
				const reader = new FileReader();

				reader.onload = (event) => {
					if (event.target && typeof event.target.result === "string") {
						setImagePreview(event.target.result);
						form.setValue("coverPhoto.url", event.target.result);
					}
				};

				reader.readAsDataURL(file);
			} else if (type === "pdf") {
				const file = files[0];
				const url = URL.createObjectURL(file);
				setPdfPreview(url);
				form.setValue("pdf.url", url);
			}
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
								onChange={(e) => handleFileChange(e, "pdf")}
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
