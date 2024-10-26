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
	// Ensure issueCoverPhoto and issuePDF are valid URLs
	const issueCoverPhoto = issue.issueCoverPhoto || ""; // Default to an empty string if undefined
	const issuePDF = `https://padseva.vercel.app/issue/${issue._id}`; // Dynamic URL based on issue ID

	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
        .button {
          display: inline-block;
          padding: 10px 15px;
          background-color: #7747FF;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <h1>New Newsletter Dropped</h1>
      <p>A new issue has been reported:</p>
      <img src="${issueCoverPhoto}" alt="Issue Cover" />
      <p>
        <a href="${issuePDF}" class="button">View PDF</a>
      </p>
    </body>
    </html>
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
