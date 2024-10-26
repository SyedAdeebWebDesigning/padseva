"use server"; // Server action

import { INewsLetter } from "../database/model/Newsletter.model";
import Subscriber from "../database/model/Subscriber.model";
import { sendEmail } from "@/lib/mailer";

const MAX_CONCURRENT_EMAILS = 5; // Maximum concurrent emails

export const createSubscriber = async ({ email }: { email: string }) => {
	try {
		const existingSubscriber = await Subscriber.findOne({ email });
		if (existingSubscriber) {
			throw new Error("Subscriber already exists."); // Throw a specific error for existing subscriber
		}

		await Subscriber.create({ email });
		console.log(`Subscriber created: ${email}`);
	} catch (error: any) {
		console.error(`Error creating subscriber: ${error.message}`);
		throw error;
	}
};

async function sendEmailsInBatches(
	emailList: string[],
	issue: INewsLetter
): Promise<void> {
	for (let i = 0; i < emailList.length; i += MAX_CONCURRENT_EMAILS) {
		const batch = emailList.slice(i, i + MAX_CONCURRENT_EMAILS);
		await Promise.all(
			batch.map((email) =>
				sendEmail(
					email,
					"New Issue Notification 🚀",
					generateEmailContent(issue)
				)
			)
		);
	}
}

function generateEmailContent(issue: INewsLetter): string {
	return `
    <h1>New Issue Created</h1>
    <p>A new issue has been reported by User ID: <strong>${issue.userClerkId}</strong>.</p>
    <img src={issue.issueCoverPhoto} alt="Issue Cover" style="max-width: 100%; height: auto;" />
    <p>
        <a href={issue.issuePDF} style="display: inline-block; padding: 10px 15px; background-color: #91373e; color: white; text-decoration: none; border-radius: 5px;">View Issue PDF</a>
    </p>
  `;
}

export async function notifySubscribers(issue: INewsLetter): Promise<void> {
	try {
		const subscribers = await Subscriber.find({});
		const emailList = subscribers.map((sub) => sub.email);

		if (emailList.length === 0) {
			console.log("No subscribers to notify.");
			return;
		}

		await sendEmailsInBatches(emailList, issue);

		console.log("All subscribers notified.");
	} catch (error) {
		console.error("Error notifying subscribers:", error);
		throw new Error("Failed to send emails.");
	}
}
