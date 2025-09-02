import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
  description: "Zainol Amzar is a passionate software engineer from Malaysia, constantly advancing in coding and deep learning. Join his journey of growth.",
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "https://zainol-amzar.my",
    title: "Zainol Amzar Portfolio | Software Engineer | Malaysia",
    description: "Zainol Amzar is a passionate software engineer from Malaysia, skilled in coding, UI/UX, and deep learning. Explore his portfolio and journey of growth.",
    images: [
      {
        url: "https://zainolamzar.my/og-image.jpg",
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