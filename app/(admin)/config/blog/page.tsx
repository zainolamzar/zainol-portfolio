import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import BlogForm from "@/components/admin/BlogForm"

export default async function ProjectPage() {
  const token = (await cookies()).get("admin_token")?.value

  if (!token) {
    redirect("/config") // redirect to login if no cookie
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-[#000b1f]">
      <h1 className="text-4xl font-bold mb-8">Blog Configuration</h1>

      <BlogForm />
    </div>
  )
}