import { Schema, model, models, Document } from "mongoose";

interface User extends Document {
	clerkId: string;
	email: string;
	phone: string;
	firstName: string;
	lastName: string;
	photo: string;
	role: "Admin" | "Volunteer";
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new Schema<User>(
	{
		clerkId: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		firstName: { type: String },
		lastName: { type: String },
		role: { type: String, required: true, enum: ["Admin", "Volunteer"] },
		photo: { type: String, required: true },
	},
	{ timestamps: true }
);

// Define the User model with the User interface
const User = models.User || model<User>("User", UserSchema);

export default User;
