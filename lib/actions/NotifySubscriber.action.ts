"use server"; // Server action

import { INewsLetter } from "../database/model/Newsletter.model";
import Subscriber from "../database/model/Subscriber.model";
import { sendEmail } from "@/lib/mailer";

const MAX_CONCURRENT_EMAILS = 5; // Maximum concurrent emails

export const createSubscriber = async ({ email }: { email: string }) => {
	try {
		const existingSubscriber = await Subscriber.findOne({ email });
		if (existingSubscriber) {
			throw new Error("Subscriber already exists.");
		}

		// Create a new subscriber
		const subscriber = await Subscriber.create({ email });
		console.log(`Subscriber created: ${email}`);

		// Send verification email
		const verificationLink = `${process.env.APP_URL}/verification/${subscriber._id}`;
		await sendVerificationEmail(email, verificationLink);
	} catch (error: any) {
		console.error(`Error creating subscriber: ${error.message}`);
		throw error;
	}
};

// Function to send the verification email
async function sendVerificationEmail(email: string, link: string) {
	const subject = "[PadSeva]: Verify Your Subscription";
	const content = generateVerificationEmailContent(link);

	await sendEmail(email, subject, content);
	console.log(`Verification email sent to: ${email}`);
}

// Email content generation function
function generateVerificationEmailContent(verificationLink: string): string {
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
          background-color: #28a745;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        p {
          font-size: 16px;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Verify Your Subscription</h1>
      <p>Thank you for subscribing! Please verify your email by clicking the button below:</p>
      <p>
        <a href="${verificationLink}" class="button">Verify Email</a>
      </p>
      <p>If you didn't subscribe, please ignore this email.</p>
    </body>
    </html>
  `;
}

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
	const issueCoverPhoto = issue.issueCoverPhoto || "";
	const issuePDF = `${process.env.APP_URL}/issue/${issue._id}`;

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
		// Fetch only verified subscribers
		const subscribers = await Subscriber.find({ hasVerified: true });
		const emailList = subscribers.map((sub) => sub.email);

		if (emailList.length === 0) {
			console.log("No verified subscribers to notify.");
			return;
		}

		await sendEmailsInBatches(emailList, issue);

		console.log("All verified subscribers notified.");
	} catch (error) {
		console.error("Error notifying subscribers:", error);
		throw new Error("Failed to send emails.");
	}
}
