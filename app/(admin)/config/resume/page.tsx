import React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import ResumeAbout from "@/components/admin/ResumeAbout"
import ResumeExperience from "@/components/admin/ResumeExperience"
import ResumeEducation from "@/components/admin/ResumeEducation"
import ResumeSkill from "@/components/admin/ResumeSkill"

export default async function ResumePage() {
  const token = (await cookies()).get("admin_token")?.value
  
    if (!token) {
      redirect("/config") // redirect to login if no cookie
    }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-[#000b1f]">
      <h1 className="text-4xl font-bold mb-8">Resume Configuration</h1>

      {/* About Section */}
      <ResumeAbout />

      {/* Work Experience Section */}
      <ResumeExperience />

      {/* Education Section */}
      <ResumeEducation />

      {/* Skills Section */}
      <ResumeSkill />
    </div>
  )
}