"use server";

import User from "../database/model/User.model";
import { connectToDatabase } from "../database";

export interface createUserProps {
	clerkId: string;
	email: string;
	phone: string;
	firstName?: string;
	lastName?: string;
	photo: string;
	hasProfileCompleted: boolean; // User Defined
	role: "Admin" | "Volunteer"; // User Defined
}

export interface UpdateUserProps {
	email?: string;
	phone?: string;
	firstName?: string;
	lastName?: string;
	photo?: string;
}

export const createUser = async (user: createUserProps) => {
	try {
		await connectToDatabase();
		const newUser = await User.create(user);
		return JSON.parse(JSON.stringify(newUser));
	} catch (error: any) {
		throw new Error(`Error creating user: ${error.message}`);
	}
};

export const getUserById = async (clerkId: string) => {
	try {
		await connectToDatabase();

		const user = await User.findOne({ clerkId });
		if (!user) {
			return {};
		}
		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(`Error fetching user: ${error.message}`);
	}
};

export const updateUser = async (
	clerkId: string,
	updateProps: UpdateUserProps
) => {
	try {
		await connectToDatabase();

		const updatedUser = await User.findOneAndUpdate({ clerkId }, updateProps, {
			new: true,
			runValidators: true,
		});

		if (!updatedUser) {
			throw new Error("User not found");
		}

		return JSON.parse(JSON.stringify(updatedUser));
	} catch (error: any) {
		throw new Error(`Error updating user: ${error.message}`);
	}
};
