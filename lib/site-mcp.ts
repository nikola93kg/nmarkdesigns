import { site } from "@/content/site";
import { sitePagesTool } from "@/lib/site-pages-tool";

export const protocolVersions = ["2025-11-25", "2025-06-18", "2025-03-26"];
export const serverInfo = { name: "com.nmarkdesigns/site", title: site.name, version: "1.0.0" };
export const capabilities = { tools: { listChanged: false } };
export const serverCard = {
  version: "1.0",
  protocolVersion: protocolVersions[0],
  serverInfo,
  description: "Read-only discovery of public NMark Designs pages.",
  transport: { type: "streamable-http", endpoint: `${site.url}/mcp` },
  capabilities,
  authentication: { required: false, schemes: [] },
  tools: [sitePagesTool],
};
