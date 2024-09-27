import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import HeaderAppWrapper from "./components/HeaderAppWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tarot Portal",
  description: "Generate tarot cards, readings, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-gray-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <HeaderAppWrapper>{children}</HeaderAppWrapper>
      </body>
    </html>
  );
}
