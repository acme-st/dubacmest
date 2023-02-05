import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { recordClick, redis } from "@/lib/upstash";
import { parse } from "./utils";

export default async function RootMiddleware(
  req: NextRequest,
  ev: NextFetchEvent,
) {
  const { domain } = parse(req);

  if (!domain) {
    return NextResponse.next();
  }

  if (
    domain === "acme.st" ||
    domain === "preview.acme.st" ||
    domain.endsWith(".vercel.app")
  ) {
    ev.waitUntil(redis.incr("acme.st:root:clicks")); // increment root clicks (only for acme.st)
  } else {
    ev.waitUntil(recordClick(domain, req)); // record clicks on root page (if domain is not acme.st)
  }

  if (
    domain === "acme.st" ||
    domain === "preview.acme.st" ||
    domain.endsWith(".vercel.app")
  ) {
    return NextResponse.next();
  } else {
    const target = await redis.get<string>(`root:${domain}`);
    if (target) {
      return NextResponse.redirect(target);
    } else {
      const url = req.nextUrl;
      url.pathname = `/placeholder/${domain}`; // rewrite to a /placeholder page unless the user defines a site to redirect to
      return NextResponse.rewrite(url);
    }
  }
}
