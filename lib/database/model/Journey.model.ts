import { Schema, model, models, Document } from "mongoose";

interface Journey extends Document {
	title: string;
	value: number;
	isMore?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const JourneySchema = new Schema<Journey>(
	{
		title: { type: String, required: true },
		value: { type: Number, required: true },
		isMore: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

const Journey = models.Journey || model<Journey>("Journey", JourneySchema);
export default Journey;
