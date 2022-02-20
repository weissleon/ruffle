import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Check if the page is reloaded
  const isReloaded = req.headers.get("referer") === null;

  // If the page is reloaded, reidrect to the main page
  if (isReloaded) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
