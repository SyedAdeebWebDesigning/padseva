import { Schema, model, models, Document } from "mongoose";

export interface IReviewSchema {
	_id?: string;
	firstName: string;
	lastName: string;
	email: string;
	review: string;
	isRead?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const ReviewSchema = new Schema<IReviewSchema>(
	{
		firstName: { type: "string", required: true },
		lastName: { type: "string", required: true },
		email: { type: "string", required: true },
		review: { type: "string", required: true },
		isRead: { type: "boolean", required: true, default: false },
	},
	{
		timestamps: true,
	}
);

const Review = models.Review || model<IReviewSchema>("Review", ReviewSchema);
export default Review;
