/** Keep the public host when running behind a reverse proxy. */
export function GET() {
  return new Response(null, {
    status: 307,
    headers: { Location: "/admin/sr/", "Cache-Control": "private, no-store" },
  });
}
