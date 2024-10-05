"use server";

import User from "../database/model/User.model";
import { connectToDatabase } from "../database";

export interface CreateUserProps {
	clerkId: string;
	email: string;
	phone: string;
	firstName?: string;
	lastName?: string;
	photo: string;
	hasCompletedProfile: boolean;
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
