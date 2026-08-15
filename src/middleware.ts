import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? "dev-secret");
const PUBLIC_PORTAL = ["/portal/login", "/portal/register", "/portal/forgot-password", "/portal/reset-password"];

/**
 * Build a redirect target for `pathname` on the *public* origin.
 *
 * Behind a reverse proxy (Caddy, or nginx/Passenger on Plesk) the request the
 * app sees is `http://localhost:3000/...`, so a redirect derived from it can
 * send the browser to localhost. Prefer the proxy's forwarded host/proto when
 * present so the user always stays on the real domain.
 */
function publicRedirect(req: NextRequest, pathname: string): URL {
  const url = req.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";

  const fwdHost = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (fwdHost && !fwdHost.startsWith("localhost") && !fwdHost.startsWith("127.0.0.1")) {
    url.host = fwdHost;
    url.port = "";
    url.protocol = `${req.headers.get("x-forwarded-proto") ?? "https"}:`;
  }
  return url;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/portal")) return NextResponse.next();

  const token = req.cookies.get("jn_session")?.value;
  let authed = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET);
      authed = true;
    } catch {
      authed = false;
    }
  }

  const isPublic = PUBLIC_PORTAL.some((p) => pathname.startsWith(p));

  if (!authed && !isPublic) {
    return NextResponse.redirect(publicRedirect(req, "/portal/login"));
  }
  if (authed && isPublic) {
    return NextResponse.redirect(publicRedirect(req, "/portal"));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/portal"],
};
