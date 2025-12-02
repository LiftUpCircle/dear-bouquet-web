import type { Metadata } from "next";
import { Gaegu } from "next/font/google";
import "./globals.css";

const gaegu = Gaegu({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
});

export const metadata: Metadata = {
  title: "Dear Bouquet - A Heartfelt Narrative Game",
  description:
    "A heartfelt narrative game where every flower tells a story. Craft meaningful bouquets and discover the language of flowers.",
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
