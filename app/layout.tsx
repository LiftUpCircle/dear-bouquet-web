import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  title: "Dear Bouquet - A Cozy Storytelling Game",
  description:
    "A cozy storytelling games to help players unwind, decompress, and enjoy a moment of ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gaegu.variable} antialiased`}>{children}</body>
    </html>
  );
}
