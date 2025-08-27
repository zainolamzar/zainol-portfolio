import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" })
  
  // Delete the cookie
  response.cookies.set("admin_token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  return response
}