import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "../globals.css"

import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: "Zainol Amzar's Portfolio",
  description: "Showcase Zainol Amzar's worth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <NavBar />
        <Analytics />
      </body>
    </html>
  );
}