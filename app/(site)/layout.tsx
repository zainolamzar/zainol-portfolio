import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "../globals.css"

import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: {
    default: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    template: "%s | Zainol Amzar Portfolio",
  },
  description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
  keywords: ["Zainol Amzar", "Software Engineer", "Programmer", "Portfolio", "Software Developer", "Malaysia"],
  authors: [{ name: "Zainol Amzar", url: "https://zainol-amzar.vercel.app" }],
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://zainol-amzar.vercel.app",
    siteName: "Zainol Amzar Portfolio",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
    images: [
      {
        url: "https://zainol-amzar.vercel.app/assets/webicon/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zainol Amzar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zain_coder",
    creator: "@yourhandle",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
    images: ["https://zainol-amzar.vercel.app/assets/webicon/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/assets/webicon/favicon-16x16.png", sizes: "16x16" },
      { url: "/assets/webicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/assets/webicon/favicon-96x96.png", sizes: "96x96" },
      { url: "/assets/webicon/android-icon-192x192.png", sizes: "192x192" },
      { url: "/assets/webicon/favicon.ico" },
    ],
    apple: [
      { url: "/assets/webicon/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/manifest.json", // optional, if you make a PWA
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/assets/webicon/ms-icon-144x144.png",
  },
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