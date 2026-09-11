import type { NextConfig } from "next";
import { launchEnabled } from "./lib/seo-config";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  // Normalize known pages after exact legacy mapping, in one hop.
  skipTrailingSlashRedirect: true,
  env: { NMARK_INDEXING_ALLOWED: String(launchEnabled(process.env)) },
  images: {
    qualities: [75, 85],
  },
};

export default nextConfig;
