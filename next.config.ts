import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    qualities: [75, 85],
  },
  async redirects() {
    return [{ source: "/", destination: "/sr/", permanent: false }];
  },
};

export default nextConfig;
