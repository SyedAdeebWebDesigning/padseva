import { Schema, model, models } from "mongoose";

export interface INewsLetter extends Document {
	_id?: string;
	issueCoverPhoto: string;
	issuePDF: string;
	userClerkId: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const NewsLetterSchema = new Schema<INewsLetter>(
	{
		issueCoverPhoto: {
			type: String, // Use `String` instead of "string"
			description: "The cover photo URL of the newsletter issue",
			required: true,
		},
		issuePDF: {
			type: String, // Use `String` instead of "string"
			description: "The PDF file URL of the newsletter issue",
			required: true,
		},
		userClerkId: { type: String, required: true },
	},
	{ timestamps: true }
);

const SchemaNewsLetter =
	models.NewsLetter || model<INewsLetter>("NewsLetter", NewsLetterSchema);

export default SchemaNewsLetter;
