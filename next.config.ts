import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "viigdqdgakrsgxmqpker.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;