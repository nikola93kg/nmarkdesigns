import { site } from "../content/site";

const productionHost = new URL(site.url).host;

export const pageRobots = { index: true, follow: true };

export function isIndexableHost(host: string | null): boolean {
  return host?.toLowerCase() === productionHost;
}
