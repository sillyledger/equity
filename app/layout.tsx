import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "equity.tw — launching in 2027",
  description: "equity.tw — launching in 2027.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>{children}</body>
    </html>
  );
}
