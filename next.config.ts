import type { NextConfig } from "next";
import { launchEnabled } from "./lib/seo-config";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  // Normalize known pages after exact legacy mapping, in one hop.
  skipTrailingSlashRedirect: true,
  env: { NMARK_INDEXING_ALLOWED: String(launchEnabled(process.env)) },
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 320, 384],
    qualities: [75, 82, 84, 85, 88],
  },
};

export default nextConfig;
