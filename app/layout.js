import Header from "@/components/header";
import "./globals.css";
import {Inter} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({subsets: ["latin"]})

export const metadata = {
  title: "Memly",
  description: "Craft the memories",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="bg-[url('/bg.jpg')] opacity-50 fixed -z-10 inset-0"/>
        <Header/>
        <main className="min-h-screen">
        {children}
        </main>
        <Toaster richColors/>
      </body>
    </html>
    </ClerkProvider>
  );
}
