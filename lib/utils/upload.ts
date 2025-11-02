// utils/upload.ts (or inside your blog editor component)
export async function uploadToBlobServer(file: File, folder = "blog") {
	const fd = new FormData();
	fd.append("file", file, file.name);
	fd.append("folder", folder);

	const res = await fetch("/api/blob-upload", { method: "POST", body: fd });
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Upload failed: ${res.status} ${text}`);
	}
	const json = await res.json();
	if (!json?.blob?.url) throw new Error("No blob URL returned");
	return json.blob; // contains url, downloadUrl, etc.
}
