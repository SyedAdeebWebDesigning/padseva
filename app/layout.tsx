import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Padseva",
	description:
		"PadSeva is a social initiative focused on eradicating period poverty and promoting menstrual hygiene in rural communities across southern India.",
	icons: {
		icon: ["/padseva.jpeg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
