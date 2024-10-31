import { Schema, model, models } from "mongoose";

export interface ISubscriberSchema {
	_id?: string;
	email: string;
	hasVerified: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const SubscriberSchema = new Schema<ISubscriberSchema>(
	{
		email: { type: "string", required: true },
		hasVerified: { type: "boolean", default: false },
	},
	{
		timestamps: true,
	}
);

const Subscriber =
	models.Subscriber || model<ISubscriberSchema>("Subscriber", SubscriberSchema);
export default Subscriber;
