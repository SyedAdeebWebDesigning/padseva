import {
	CreateUserProps,
	updateUser,
	createUser,
} from "../../../lib/actions/User.action";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occurred -- no svix headers", { status: 400 });
	}

	const payload = await req.json();
	const body = JSON.stringify(payload);

	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		return new Response("Error occurred", { status: 400 });
	}

	// Handle the user.created event
	if (evt.type === "user.created") {
		const {
			id,
			email_addresses,
			image_url,
			first_name,
			last_name,
			phone_numbers,
		} = evt.data;

		if (!email_addresses || email_addresses.length === 0) {
			return new Response("Missing email address", { status: 400 });
		}

		if (!phone_numbers || phone_numbers.length === 0) {
			return new Response("Missing phone number", { status: 400 });
		}

		const user: CreateUserProps = {
			clerkId: id,
			email: email_addresses[0].email_address,
			phone: phone_numbers[0].phone_number,
			firstName: first_name ?? "",
			lastName: last_name ?? "",
			photo: image_url || "",
			hasProfileCompleted: false,
			role: "Volunteer", // Default role can be changed if needed
			description: "",
			instagramUrl: "",
		};

		try {
			const newUser = await createUser(user);

			// After user creation, update the Clerk metadata
			if (newUser) {
				await clerkClient.users.updateUserMetadata(id, {
					publicMetadata: {
						userId: newUser._id,
					},
				});
			}

			return NextResponse.json({ message: "User created", user: newUser });
		} catch (error: any) {
			return new Response(`Error creating user: ${error.message}`, {
				status: 500,
			});
		}
	}

	// Handle the user.updated event
	if (evt.type === "user.updated") {
		const {
			id,
			email_addresses,
			image_url,
			first_name,
			last_name,
			phone_numbers,
		} = evt.data;

		if (!email_addresses || email_addresses.length === 0) {
			return new Response("Missing email address", { status: 400 });
		}

		if (!phone_numbers || phone_numbers.length === 0) {
			return new Response("Missing phone number", { status: 400 });
		}

		const updateProps = {
			email: email_addresses[0].email_address,
			phone: phone_numbers[0].phone_number,
			firstName: first_name ?? "",
			lastName: last_name ?? "",
			photo: image_url || "",
		};

		try {
			const updatedUser = await updateUser(id, updateProps);
			return NextResponse.json({ message: "User updated", user: updatedUser });
		} catch (error: any) {
			return new Response(`Error updating user: ${error.message}`, {
				status: 500,
			});
		}
	}

	// Return a default response for unknown event types
	return new Response("Event type not handled", { status: 200 });
}
