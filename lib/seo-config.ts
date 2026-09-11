import { site } from "../content/site";

interface DeploymentEnvironment {
  NODE_ENV?: string;
  SITE_LAUNCH?: string;
  DEPLOYMENT_ENV?: string;
  VERCEL_ENV?: string;
}

// Evaluated by next.config at build time so static HTML and the proxy agree.
export function launchEnabled(environment: DeploymentEnvironment): boolean {
  const deployment = environment.VERCEL_ENV ?? environment.DEPLOYMENT_ENV;
  return environment.NODE_ENV === "production"
    && environment.SITE_LAUNCH === "true"
    && deployment === "production";
}

export const indexingEnabled = process.env.NMARK_INDEXING_ALLOWED === "true";
export const pageRobots = { index: indexingEnabled, follow: indexingEnabled };

export function isIndexableHost(host: string | null, enabled = indexingEnabled): boolean {
  return enabled && host?.toLowerCase() === new URL(site.url).host;
}
