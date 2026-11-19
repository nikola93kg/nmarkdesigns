export function GET(request: Request) { return Response.redirect(new URL("/admin/sr/", request.url), 307); }
