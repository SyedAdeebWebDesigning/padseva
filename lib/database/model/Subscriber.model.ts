import { Schema, model, models } from "mongoose";

export interface ISubscriberSchema {
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const SubscriberSchema = new Schema<ISubscriberSchema>(
	{
		email: { type: "string", required: true },
	},
	{
		timestamps: true,
	}
);

const Subscriber =
	models.Subscriber || model<ISubscriberSchema>("Subscriber", SubscriberSchema);
export default Subscriber;
