"use client"

import React from "react"
import ResumeAbout from "@/components/admin/ResumeAbout"

export default function ResumePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-[#000b1f]">
      <h1 className="text-4xl font-bold mb-8">Resume Configuration</h1>

      {/* About Section */}
      <ResumeAbout />

      {/* Work Experience Section */}
      <section id="experience" className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Work Experience
        </h2>
      </section>

      {/* Education Section */}
      <section id="education" className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">Education</h2>
      </section>

      {/* Skills Section */}
      <section id="skills" className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">Skills</h2>
      </section>
    </div>
  )
}