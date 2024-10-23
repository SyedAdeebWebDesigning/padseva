import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timeAgo(isoDate: any) {
	const date: any = new Date(isoDate); // Parse the ISO date string
	const now: any = new Date();
	const seconds = Math.floor((now - date) / 1000);
	let interval = Math.floor(seconds / 31536000); // Seconds in a year

	if (interval >= 1) {
		return `${interval} year${interval === 1 ? "" : "s"} ago`;
	}
	interval = Math.floor(seconds / 2592000); // Seconds in a month
	if (interval >= 1) {
		return `${interval} month${interval === 1 ? "" : "s"} ago`;
	}
	interval = Math.floor(seconds / 86400); // Seconds in a day
	if (interval >= 1) {
		return `${interval} day${interval === 1 ? "" : "s"} ago`;
	}
	interval = Math.floor(seconds / 3600); // Seconds in an hour
	if (interval >= 1) {
		return `${interval} hour${interval === 1 ? "" : "s"} ago`;
	}
	interval = Math.floor(seconds / 60); // Seconds in a minute
	if (interval >= 1) {
		return `${interval} minute${interval === 1 ? "" : "s"} ago`;
	}
	return "just now";
}
