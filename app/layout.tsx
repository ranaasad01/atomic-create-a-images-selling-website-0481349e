import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ImageMarket — Premium Digital Photography Marketplace",
  description:
    "Discover, license, and purchase stunning high-quality photos from world-class photographers. ImageMarket is the premier destination for digital image licensing.",
  keywords: [
    "stock photography",
    "buy photos",
    "sell photos",
    "digital images",
    "image licensing",
    "photography marketplace",
  ],
  authors: [{ name: "ImageMarket" }],
  openGraph: {
    title: "ImageMarket — Premium Digital Photography Marketplace",
    description:
      "Discover, license, and purchase stunning high-quality photos from world-class photographers.",
    type: "website",
    siteName: "ImageMarket",
  },
  twitter: {
    card: "summary_large_image",
    title: "ImageMarket — Premium Digital Photography Marketplace",
    description:
      "Discover, license, and purchase stunning high-quality photos from world-class photographers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}