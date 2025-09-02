import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
  description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://zainol-amzar.vercel.app",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
    images: [
      {
        url: "https://my-nextjs-site.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zainol Amzar Portfolio",
      },
    ],
  },
  twitter: {
    handle: "@zain_coder",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default config;