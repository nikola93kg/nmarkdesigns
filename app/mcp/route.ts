import { z } from "zod";
import { site } from "@/content/site";
import { discoverPages } from "@/lib/agent-discovery";
import { defaultLocale, locales } from "@/lib/i18n";
import { capabilities, protocolVersions, serverInfo } from "@/lib/site-mcp";
import { sitePagesResult, sitePagesTool } from "@/lib/site-pages-tool";

const maxBodyBytes = 16_384;
const messageSchema = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.union([z.string(), z.number().int()]).optional(),
  method: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});
const toolArguments = z.strictObject({ locale: z.enum(locales).optional() });
type RequestId = string | number | null;

function originAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (origin === null || origin === site.url) return true;
  const endpoint = new URL(request.url);
  return ["localhost", "127.0.0.1", "[::1]"].includes(endpoint.hostname) && origin === endpoint.origin;
}

function rpcError(id: RequestId, code: number, message: string, status = 200) {
  return Response.json({ jsonrpc: "2.0", id, error: { code, message } }, { status });
}

async function readMessage(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return { error: "Missing request body", status: 400 } as const;

  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let body = "";
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBodyBytes) {
        await reader.cancel();
        return { error: "Request body too large", status: 413 } as const;
      }
      body += decoder.decode(value, { stream: true });
    }
    const data: unknown = JSON.parse(body + decoder.decode());
    return { data } as const;
  } catch {
    return { error: "Invalid JSON", status: 400 } as const;
  } finally {
    reader.releaseLock();
  }
}

export function GET(request: Request) {
  if (!originAllowed(request)) return new Response(null, { status: 403 });
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}

export async function POST(request: Request) {
  if (!originAllowed(request)) return rpcError(null, -32600, "Invalid origin", 403);
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") return rpcError(null, -32600, "Expected application/json", 415);
  if (Number(request.headers.get("content-length")) > maxBodyBytes) {
    return rpcError(null, -32600, "Request body too large", 413);
  }

  const protocol = request.headers.get("mcp-protocol-version");
  if (protocol && !protocolVersions.includes(protocol)) {
    return rpcError(null, -32600, "Unsupported MCP protocol version", 400);
  }

  const body = await readMessage(request);
  if (body.error !== undefined) return rpcError(null, body.status === 413 ? -32600 : -32700, body.error, body.status);
  const message = messageSchema.safeParse(body.data);
  if (!message.success) return rpcError(null, -32600, "Invalid JSON-RPC request", 400);

  const { id, method, params } = message.data;
  if (id === undefined) {
    return method.startsWith("notifications/")
      ? new Response(null, { status: 202 })
      : rpcError(null, -32600, "Missing request ID", 400);
  }

  const reply = (result: object) => Response.json({ jsonrpc: "2.0", id, result });
  switch (method) {
    case "initialize": {
      const requested = params?.protocolVersion;
      if (typeof requested !== "string") return rpcError(id, -32602, "A protocol version is required");
      return reply({
        protocolVersion: protocolVersions.includes(requested) ? requested : protocolVersions[0],
        capabilities,
        serverInfo,
      });
    }
    case "ping":
      return reply({});
    case "tools/list":
      return reply({ tools: [sitePagesTool] });
    case "tools/call": {
      const input = toolArguments.safeParse(params?.arguments === undefined ? {} : params.arguments);
      if (params?.name !== sitePagesTool.name || !input.success) {
        return rpcError(id, -32602, "Unknown tool or invalid arguments");
      }
      const locale = input.data.locale ?? defaultLocale;
      return reply(sitePagesResult(locale, await discoverPages(locale)));
    }
    default:
      return rpcError(id, -32601, "Method not found");
  }
}
