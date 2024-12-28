import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Padseva",
  description:
    "PadSeva is a social initiative focused on eradicating period poverty and promoting menstrual hygiene in rural communities across India.",
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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "py-2.5 px-3 bg-[#63262b] !shadow-none",
          formFieldInput: "py-4 px-3 text-black",
          logoBox: "w-full h-[42px]",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div>{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
