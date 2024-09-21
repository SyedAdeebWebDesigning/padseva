"use server";

import User from "../database/model/User.model";
import { connectToDatabase } from "../database";

export interface CreateUserProps {
	clerkId: string;
	email: string;
	phone: string;
	firstName?: string;
	lastName?: string;
	instagramUrl?: string;
	description?: string;
	photo: string;
	hasProfileCompleted: boolean;
	role: "Admin" | "Volunteer";
}

export const createUser = async (user: CreateUserProps) => {
	await connectToDatabase();
	try {
		const newUser = await User.create(user);
		return newUser.toObject(); // Using Mongoose's method to convert to plain object
	} catch (error: any) {
		console.error(`Error creating user: ${error.message}`);
		throw error; // Rethrow to handle it up the chain
	}
};

export const getUserById = async (clerkId: string) => {
	await connectToDatabase();
	const user = await User.findOne({ clerkId }).lean(); // Using lean for performance
	if (!user) {
		return null;
	}
	return user;
};

export const updateUser = async (
	clerkId: string,
	updateProps: Partial<CreateUserProps> // Using Partial for updates
) => {
	await connectToDatabase();
	try {
		const updatedUser = await User.findOneAndUpdate({ clerkId }, updateProps, {
			new: true,
		}).lean();
		if (!updatedUser) {
			throw new Error("User not found");
		}
		return updatedUser;
	} catch (error: any) {
		console.error(`Error updating user: ${error.message}`);
		throw error;
	}
};

export const completeUserProfile = async ({
	description,
	instagramUrl,
	userClerkId,
}: {
	description: string;
	instagramUrl: string;
	userClerkId: string;
}) => {
	// Connect to the database
	await connectToDatabase();

	try {
		// Update the user profile
		const updated = await updateUser(userClerkId, {
			description,
			instagramUrl,
			hasProfileCompleted: true, // Mark profile as complete
		});

		// Return the updated user details on success
		return { success: true, data: updated };
	} catch (error: any) {
		// Log the error details for debugging purposes
		console.error(`Error completing user profile: ${error.message}`);

		// Return the error message to the caller
		return {
			success: false,
			error: "Failed to Complete User Profile",
		};
	}
};
