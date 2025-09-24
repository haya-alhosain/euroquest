import type { Metadata } from "next";
import { Exo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import Footer from "@/components/shared/footer";


const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EuroQuest International",
  description: "EuroQuest International",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.variable} ${inter.variable} antialiased`}
      >
        <QueryProvider>
            <Navbar/>
            {children}
            <Footer/>
            <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
