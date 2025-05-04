"use server";

import { connectToDatabase } from "../database";
import Journey from "../database/model/Journey.model";

export const getJourneys = async () => {
	await connectToDatabase();
	try {
		const journey = await Journey.find().lean().sort({ createdAt: 1 });

		if (!journey) {
			return [];
		}

		return journey;
	} catch (error) {
		console.log(`Error fetching journeys: ${error}`);
	}
};

export const createJourney = async (journey: {
	title: string;
	value: number;
	isMore?: boolean;
}) => {
	await connectToDatabase();
	try {
		const newJourney = await Journey.create(journey);
		return newJourney.toObject();
	} catch (error) {
		console.log(`Error creating journey: ${error}`);
	}
};

export const updateJourney = async (
	id: string,
	updateProps: Partial<{
		title: string;
		value: number;
		isMore?: boolean;
	}>
) => {
	await connectToDatabase();
	try {
		const updatedJourney = await Journey.findByIdAndUpdate(id, updateProps, {
			new: true,
		});
		return updatedJourney?.toObject();
	} catch (error) {
		console.log(`Error updating journey: ${error}`);
	}
};

export const deleteJourney = async (id: string) => {
	await connectToDatabase();
	try {
		const deletedJourney = await Journey.findByIdAndDelete(id);
		return deletedJourney;
	} catch (error) {
		console.log(`Error deleting journey: ${error}`);
	}
};

export const getJourneyById = async (id: string) => {
	await connectToDatabase();
	try {
		const journey = await Journey.findById(id).lean();

		if (!journey) {
			return {};
		}
		return journey;
	} catch (error) {
		console.log(`Error fetching journey by ID: ${error}`);
	}
};
