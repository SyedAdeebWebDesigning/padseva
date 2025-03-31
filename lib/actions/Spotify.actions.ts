"use server";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const podcastId = "32gRryMmfaIDJxFwQU3ekh"; // Your podcast ID

async function getAccessToken(): Promise<string> {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " +
				Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
		},
		body: "grant_type=client_credentials",
	});

	const data = await response.json();
	return data.access_token;
}

export async function getPodcastData() {
	const token = await getAccessToken();

	const response = await fetch(
		`https://api.spotify.com/v1/shows/${podcastId}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

	if (!response.ok) throw new Error("Failed to fetch podcast data");

	return response.json();
}
