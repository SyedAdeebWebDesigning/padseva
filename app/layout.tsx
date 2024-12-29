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
          formButtonPrimary: `
        inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#63262b] transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:ring-offset-2 hover:ring-2 ring-[#63262b] relative group transform gap-2 overflow-hidden px-8 text-base font-medium text-white transition-all duration-300 ease-in-out hover:ring-[#63262b] focus:outline-none focus:ring-2 focus:ring-offset-2 
        before:absolute before:content-[''] bg-[#63262b] hover:bg-[#63262b] before:top-0 before:left-[-100%] before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent before:opacity-50 before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-[200%]
      `,
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
