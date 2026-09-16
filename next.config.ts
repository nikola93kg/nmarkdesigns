import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  // Normalize known pages after exact legacy mapping, in one hop.
  skipTrailingSlashRedirect: true,
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],
    qualities: [75, 82, 84, 85, 88],
  },
};

export default nextConfig;
