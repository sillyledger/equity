import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

const interBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Dedicated variable for the headline typeface so it can be swapped later
// (layout.tsx-only change) without touching --font-inter or any component.
const interHeadline = Inter({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-inter-headline",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://equity.tw"),
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interBody.variable} ${interHeadline.variable}`}>
      <body>{children}</body>
    </html>
  );
}
