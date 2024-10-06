"use server";

import { connectToDatabase } from "../database";
import SchemaNewsLetter from "../database/model/Newsletter.model";

export interface CreateNewsLetterProps {
	issueCoverPhoto: string;
	issuePDF: string;
}

export const createNewsLetter = async (newsletter: CreateNewsLetterProps) => {
	await connectToDatabase();
	try {
		const newNewsletter = await SchemaNewsLetter.create(newsletter);
		return newNewsletter.toObject();
	} catch (error: any) {
		console.error(`Error creating newsletter: ${error.message}`);
		throw error;
	}
};

export const getNewsLetterById = async (id: string) => {
	await connectToDatabase();
	const newsletter = await SchemaNewsLetter.findById(id).lean();
	if (!newsletter) {
		return null;
	}
	return newsletter;
};

export const getAllNewsLetters = async () => {
	await connectToDatabase();
	const newsletters = await SchemaNewsLetter.find().lean();
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
	const deletedNewsletter = await SchemaNewsLetter.findByIdAndDelete(id).lean();
	if (!deletedNewsletter) {
		throw new Error("Newsletter not found");
	}
	return deletedNewsletter;
};
