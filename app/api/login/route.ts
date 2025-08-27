import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabaseServer"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const supabase = createClient()
  const supabaseClient = await supabase;

  const { data: user, error } = await supabaseClient
    .from("users")
    .select("id, username, password")
    .eq("username", username)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.NEXT_PUBLIC_JWT_SECRET!,
    { expiresIn: "1d" }
  )

  const response = NextResponse.json({ message: "Logged in" })
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  return response
}