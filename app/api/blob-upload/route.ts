// app/api/blob-upload/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "edge"; // edge is fine; change to "node" if needed

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("file") as File | null;
		const folder = (formData.get("folder") as string) || "newsletter";

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// get original name (fallback to timestamp)
		const originalName = (file as any).name || `upload-${Date.now()}`;

		// ensure filename has extension (important for MIME detection)
		const filename = originalName.includes(".")
			? originalName
			: `${originalName}`; // you could append .pdf if you know it is a pdf

		// Build blob key path
		const key = `${folder}/${filename}`;

		// Put into Vercel Blob. Ensure public access and set contentType for correct headers.
		const blob = await put(key, file, {
			access: "public",
			contentType: (file as any).type || undefined, // e.g. application/pdf
		});

		// blob.url is the public URL
		return NextResponse.json({ success: true, blob });
	} catch (err: any) {
		console.error("Blob upload error:", err);
		return NextResponse.json(
			{ error: err?.message || "Unknown" },
			{ status: 500 }
		);
	}
}
