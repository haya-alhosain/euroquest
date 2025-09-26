import type { Metadata, Viewport } from "next";
import { Exo, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";
import Footer from "@/components/shared/footer";
import PopupProvider from "@/components/popups/popup-provider";


const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://euroqst.com"),
  title: "EuroQuest International",
  description: "EuroQuest International - Professional Training and Certification Courses",
  keywords: "training, certification, courses, professional development, EuroQuest",
  robots: "index, follow",
  openGraph: {
    title: "EuroQuest International",
    description: "EuroQuest International - Professional Training and Certification Courses",
    siteName: "EuroQest International",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/logo.webp",
        width: 1200,
        height: 630,
        alt: "EuroQuest International",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EuroQuest International",
    description: "EuroQuest International - Professional Training and Certification Courses",
    images: ["/assets/images/logo.webp"],
    site: "@EuroQest",
  },
  icons: {
    icon: "/assets/images/mini-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
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
            <PopupProvider />
            <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
