// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value
  const url = req.nextUrl.clone()

  if (!token) {
    url.pathname = "/config/page"
    return NextResponse.redirect(url)
  }

  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!)
  } catch {
    url.pathname = "/config/page"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/config/:path*",
}