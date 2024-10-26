// lib/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "prokximus@gmail.com", // Your email
		pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
	},
});

export const sendEmail = async (to: string, subject: string, html: any) => {
	const mailOptions = {
		from: '"PadSeva"', // Sender info
		to, // Recipient emails
		subject, // Subject of the email
		html, // HTML content
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Email sent to ${to}`);
	} catch (error) {
		console.error(`Error sending email to ${to}:`, error);
		throw error;
	}
};
