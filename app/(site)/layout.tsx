import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "../globals.css"

import Script from "next/script"
import { SpeedInsights } from '@vercel/speed-insights/next';

import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: {
    default: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    template: "%s | Zainol Amzar Portfolio",
  },
  description: "Zainol Amzar is a passionate software engineer from Malaysia, skilled in coding, UI/UX, and deep learning. Explore his portfolio and journey of growth.",
  metadataBase: new URL("https://www.zainolamzar.com"),
  keywords: ["Zainol Amzar", "Software Engineer", "Programmer", "Portfolio", "Software Developer", "Malaysia"],
  authors: [{ name: "Zainol Amzar", url: "https://zainol-amzar.my" }],
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://zainolamzar.my",
    siteName: "Zainol Amzar Portfolio",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, skilled in coding, UI/UX, and deep learning. Explore his portfolio and journey of growth.",
    images: [
      {
        url: "https://zainolamzar.my/assets/webicon/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zainol Amzar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zain_coder",
    creator: "@zain_coder",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
    images: ["https://zainol-amzar.vercel.app/assets/webicon/twitter-image.png"],
  },
  icons: '/favicon.ico',
  manifest: "/manifest.json",
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Zainol Amzar",
    jobTitle: "Software Engineer",
    url: "https://zainolamzar.my",
    description: "Portfolio of Zainol Amzar, Software Engineer from Malaysia.",
    sameAs: [
      "https://github.com/zainolamzar",
      "https://linkedin.com/in/zainol-amzar",
      "https://tiktok.com/@zainolamzar",
      "https://x.com/zain_coder",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Malaysia"
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google Analytics */}
        <Script 
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-B88TVQCBSX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B88TVQCBSX');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <NavBar />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}