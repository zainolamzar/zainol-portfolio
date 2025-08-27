import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}