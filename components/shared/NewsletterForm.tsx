"use client";

import React, { useState, useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { INewsLetter } from "@/lib/database/model/Newsletter.model";

// IMPORT the server action (used as form action)
import { createNewsletterWithFiles } from "@/lib/actions/Newsletter.action";

const formSchema = z.object({
	coverPhoto: z.object({
		url: z.string().min(1, "Please upload a valid image file."),
	}),
	pdf: z.object({ url: z.string().min(1, "Please enter a valid PDF URL.") }),
});
type FormSchema = z.infer<typeof formSchema>;

export default function NewsletterFormClient({
	userClerkId,
	type,
	data,
}: {
	userClerkId: string;
	type: "Create" | "Update";
	data?: INewsLetter;
}) {
	const router = useRouter();
	const [imagePreview, setImagePreview] = useState<string | null>(
		data?.issueCoverPhoto ?? null
	);
	const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(
		data?.issuePDF ?? null
	);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const formRef = useRef<HTMLFormElement | null>(null);

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			coverPhoto: { url: data?.issueCoverPhoto || "" },
			pdf: { url: data?.issuePDF || "" },
		},
	});

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		mode: "image" | "pdf"
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (mode === "image") {
			const reader = new FileReader();
			reader.onload = (ev) => {
				if (ev.target && typeof ev.target.result === "string")
					setImagePreview(ev.target.result);
			};
			reader.readAsDataURL(file);
			form.setValue("coverPhoto.url", file.name);
		} else {
			const blobUrl = URL.createObjectURL(file);
			setPdfPreviewUrl(blobUrl);
			form.setValue("pdf.url", file.name);
		}
	};

	/** handles form submission manually to show toast + redirect */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Send the form data manually (browser default would also work)
			const formData = new FormData(e.currentTarget);
			await createNewsletterWithFiles(formData);

			toast.success("Newsletter created successfully!");
			router.push("/newsletter");
		} catch (err: any) {
			console.error("Error creating newsletter:", err);
			toast.error("Failed to create newsletter.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<Form {...form}>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					method="post"
					encType="multipart/form-data"
					className="space-y-4 md:w-1/3 w-full bg-white shadow-lg p-6 rounded-md">
					<input type="hidden" name="userClerkId" value={userClerkId} />

					<FormItem>
						<label htmlFor="coverFile" className="block text-gray-700">
							Cover Photo Upload
						</label>
						<FormControl>
							<Input
								id="coverFile"
								name="coverFile"
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
								className="mt-2 w-full object-contain rounded"
							/>
						)}
						<FormMessage />
					</FormItem>

					<FormItem>
						<label htmlFor="pdfFile" className="block text-gray-700">
							PDF File
						</label>
						<FormControl>
							<Input
								id="pdfFile"
								name="pdfFile"
								type="file"
								accept="application/pdf"
								onChange={(e) => handleFileChange(e, "pdf")}
								className="mt-2"
							/>
						</FormControl>

						{pdfPreviewUrl ? (
							<div className="mt-2">
								<a
									href={pdfPreviewUrl}
									target="_blank"
									rel="noreferrer"
									className="text-sm underline">
									Open selected PDF (local preview)
								</a>
							</div>
						) : data?.issuePDF ? (
							<div className="mt-2">
								<a
									href={data.issuePDF}
									target="_blank"
									rel="noreferrer"
									className="text-sm underline">
									Open existing PDF
								</a>
							</div>
						) : null}
						<FormMessage />
					</FormItem>

					<Button
						type="submit"
						variant={"padseva"}
						className="w-full bg-[#91373E] relative"
						disabled={isSubmitting}>
						{isSubmitting
							? "Submitting..."
							: type === "Create"
								? "Create Newsletter"
								: "Update Newsletter"}
					</Button>
				</form>
			</Form>
		</div>
	);
}
