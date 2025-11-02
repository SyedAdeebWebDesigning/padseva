"use server";

import { connectToDatabase } from "../database";
import SchemaNewsLetter from "../database/model/Newsletter.model";
import { notifySubscribers } from "./NotifySubscriber.action";
import { put } from "@vercel/blob";
import { del } from "@vercel/blob";

/* ---- types ---- */
export interface CreateNewsLetterProps {
	issueCoverPhoto: string;
	issuePDF: string;
	userClerkId: string;
}

async function uploadFileFromFormDataEntry(
	entry: File | null,
	folder = "newsletter"
) {
	if (!entry) return null;
	const file = entry as File;
	const originalName = (file as any).name || `upload-${Date.now()}`;
	const mime = (file as any).type || "";
	let filename = originalName;
	const hasExt = /\.\w+$/.test(filename);
	if (!hasExt && mime === "application/pdf") filename = `${filename}.pdf`;
	const key = `${folder}/${filename}`;
	const blob = await put(key, file, {
		access: "public",
		contentType: mime || undefined,
	});
	if (!blob?.url) throw new Error("Blob upload returned no url");
	return blob.url;
}

/* ---- existing DB actions (kept) ---- */
export const createNewsletterWithFiles = async (formData: FormData) => {
	try {
		// Extract text fields
		const userClerkId = String(formData.get("userClerkId") || "");
		// You can also extract title/description: const title = String(formData.get("title") || "");

		// Extract file entries
		const coverEntry = formData.get("coverFile") as File | null;
		const pdfEntry = formData.get("pdfFile") as File | null;

		// Upload files server-side to Vercel Blob
		const coverUrl = coverEntry
			? await uploadFileFromFormDataEntry(coverEntry, "newsletter")
			: "";
		const pdfUrl = pdfEntry
			? await uploadFileFromFormDataEntry(pdfEntry, "newsletter")
			: "";

		// Create DB record
		await connectToDatabase();
		const newNewsletter = await SchemaNewsLetter.create({
			issueCoverPhoto: coverUrl,
			issuePDF: pdfUrl,
			userClerkId,
		});

		// optional: notify subscribers
		try {
			await notifySubscribers(newNewsletter);
		} catch (e) {
			console.warn("notify failed", e);
		}

		// After server action completes, you can redirect client or return object.
		// Server actions used as form actions can return a redirect Response as well (if needed).
		return newNewsletter.toObject();
	} catch (err: any) {
		console.error("createNewsletterWithFiles(formData) error:", err);
		// throw to bubble up error — client calling the form will get an error response.
		throw err;
	}
};

export const getNewsLetterById = async (id: string) => {
	await connectToDatabase();
	try {
		const newsletter = await SchemaNewsLetter.findById(id).lean();
		if (!newsletter) {
			return {};
		}
		return newsletter;
	} catch (error) {
		console.error("getNewsLetterById error:", error);
		return {};
	}
};

export const getAllNewsLetters = async () => {
	await connectToDatabase();
	const newsletters = await SchemaNewsLetter.find()
		.lean()
		.sort({ createdAt: 1 });
	if (!newsletters) {
		return [];
	}
	return newsletters;
};

export const updateNewsLetter = async (
	id: string,
	updateProps: Partial<CreateNewsLetterProps>
) => {
	await connectToDatabase();
	try {
		const updatedNewsletter = await SchemaNewsLetter.findByIdAndUpdate(
			id,
			updateProps,
			{
				new: true,
			}
		).lean();
		if (!updatedNewsletter) {
			throw new Error("Newsletter not found");
		}
		return updatedNewsletter;
	} catch (error: any) {
		console.error(`Error updating newsletter: ${error.message}`);
		throw error;
	}
};

export const deleteNewsLetter = async (id: string) => {
	await connectToDatabase();

	const deletedNewsletter = (await SchemaNewsLetter.findByIdAndDelete(
		id
	).lean()) as any;

	if (!deletedNewsletter) {
		throw new Error("Newsletter not found");
	}

	// Clean up associated files from Vercel Blob
	try {
		const urlsToDelete = [
			deletedNewsletter.issueCoverPhoto,
			deletedNewsletter.issuePDF,
		].filter(Boolean); // skip null/undefined

		for (const url of urlsToDelete) {
			await del(url);
		}

		console.log("Deleted newsletter blobs from Vercel Blob storage");
	} catch (err: any) {
		console.error("Error deleting blobs from Vercel:", err.message);
		// Don’t throw here — even if blob delete fails, DB delete succeeded
	}

	return deletedNewsletter;
};

/* ---- new server-side blob upload helpers ----
   These run only on server (this file is `use server`).
   They use @vercel/blob's put() which reads BLOB_READ_WRITE_TOKEN from env.
   Ensure BLOB_READ_WRITE_TOKEN is set in Vercel project settings (server-only).
*/

/**
 * Upload a single File to Vercel Blob (server-side).
 * Returns { success: true, url, blob } or throws.
 */
export async function uploadNewsletterFileToBlob(
	file: File,
	folder = "newsletter"
) {
	if (!file) throw new Error("No file provided");

	// ensure safe filename and extension for PDFs
	const originalName = (file as any).name || `upload-${Date.now()}`;
	const mime = (file as any).type || "";
	let filename = originalName;

	// add .pdf extension if mime is pdf and filename lacks extension
	const hasExt = /\.\w+$/.test(filename);
	if (!hasExt && mime === "application/pdf") {
		filename = `${filename}.pdf`;
	}

	const key = `${folder}/${filename}`;

	try {
		const blob = await put(key, file, {
			access: "public",
			contentType: mime || undefined,
		});

		if (!blob?.url) throw new Error("Blob upload returned no url");
		return { success: true, url: blob.url, blob };
	} catch (err: any) {
		console.error("uploadNewsletterFileToBlob error:", err);
		throw new Error(err?.message || "Blob upload failed");
	}
}

/**
 * Update newsletter server action:
 * - optionally upload new cover/pdf files and apply their URLs to updateProps
 * - calls updateNewsLetter DB function
 */
export async function updateNewsletterWithFiles(args: {
	id: string;
	updateProps?: Partial<CreateNewsLetterProps>;
	coverFile?: File | null;
	pdfFile?: File | null;
}) {
	const { id, updateProps = {}, coverFile, pdfFile } = args;
	try {
		if (coverFile) {
			const r = await uploadNewsletterFileToBlob(coverFile, "newsletter");
			updateProps.issueCoverPhoto = r.url;
		}
		if (pdfFile) {
			const r = await uploadNewsletterFileToBlob(pdfFile, "newsletter");
			updateProps.issuePDF = r.url;
		}

		const updated = await updateNewsLetter(id, updateProps);
		return { success: true, newsletter: updated };
	} catch (err: any) {
		console.error("updateNewsletterWithFiles error:", err);
		return { success: false, error: err?.message || "Update failed" };
	}
}
