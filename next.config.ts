import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "viigdqdgakrsgxmqpker.supabase.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.buymeacoffee.com",
        pathname: "/**", // allow all images from Buy Me a Coffee CDN
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);