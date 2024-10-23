"use server";

import { connectToDatabase } from "../database";
import Review from "../database/model/Review.model";

interface CreateReviewSchema {
	firstName: string;
	lastName: string;
	email: string;
	review: string;
	isRead?: boolean;
}

// Create a new review
export const createReview = async (data: CreateReviewSchema) => {
	await connectToDatabase();

	try {
		const review = new Review(data);
		const savedReview = await review.save();
		return savedReview.toObject();
	} catch (error: any) {
		throw new Error("Failed to create review: " + error.message);
	}
};

// Update the `isRead` status of a review
export const markReviewAsRead = async (id: string) => {
	await connectToDatabase();

	try {
		const updatedReview = await Review.findByIdAndUpdate(
			id,
			{ isRead: true },
			{ new: true }
		);
		if (!updatedReview) throw new Error("Review not found");
		return updatedReview.toObject();
	} catch (error: any) {
		throw new Error("Failed to mark review as read: " + error.message);
	}
};

export const getAllReviews = async (isRead?: boolean) => {
	await connectToDatabase();

	try {
		const reviews = await Review.find().sort({ createdAt: -1 });
		if (!reviews) return [];

		return reviews.map((review) => review.toObject());
	} catch (error: any) {
		throw new Error("Failed to fetch reviews: " + error.message);
	}
};

// Get a single review by ID
export const getReviewById = async (id: string) => {
	await connectToDatabase();
	try {
		const review = await Review.findById(id);
		if (!review) throw new Error("Review not found");
		return review.toObject();
	} catch (error: any) {
		throw new Error("Failed to get review: " + error.message);
	}
};

// Delete a review
export const deleteReview = async (id: string) => {
	await connectToDatabase();
	try {
		const deletedReview = await Review.findByIdAndDelete(id);
		if (!deletedReview) throw new Error("Review not found");
		return deletedReview.toObject();
	} catch (error: any) {
		throw new Error("Failed to delete review: " + error.message);
	}
};

export const MarkAllAsRead = async () => {
	await connectToDatabase();
	try {
		const updatedReviews = await Review.updateMany(
			{ isRead: false },
			{ isRead: true }
		);
		return updatedReviews;
	} catch (error: any) {
		throw new Error("Failed to mark all reviews as read: " + error.message);
	}
};

export const deleteAllRead = async () => {
	await connectToDatabase();
	try {
		const deletedReviews = await Review.deleteMany({ isRead: true });
		return deletedReviews;
	} catch (error: any) {
		throw new Error("Failed to delete all read reviews: " + error.message);
	}
};
