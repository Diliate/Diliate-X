import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diliate — Bulk Email Marketing Platform",
  description:
    "Send thousands of emails with ease. Diliate is your all-in-one email marketing platform — bulk campaigns, Gmail OAuth sending, smart scheduling, and real-time analytics.",
  keywords: [
    "email marketing",
    "bulk email",
    "email campaigns",
    "Diliate",
    "MailEngine",
  ],
  openGraph: {
    title: "Diliate — Bulk Email Marketing Platform",
    description: "Send thousands of emails with ease.",
    url: "https://diliate.com",
    siteName: "Diliate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diliate — Bulk Email Marketing Platform",
    description: "Send thousands of emails with ease.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
