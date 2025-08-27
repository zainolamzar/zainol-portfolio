"use client"

import { useState } from "react"
import ProfileCard from "@/components/main/ProfileCard"
import RightColumn from "@/components/main/RightColumn"

export default function MainApp({
  profile,
  experience,
  education,
  skill,
}: {
  profile: any
  experience: any[]
  education: any[]
  skill: any[]
}) {
  const [selectedSection, setSelectedSection] = useState("#about")

  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-8 w-screen h-screen overflow-hidden p-8">
      {/* Left column */}
      <aside className="md:col-span-1 flex flex-col items-center justify-center h-full gap-4">
        {profile && (
          <ProfileCard
            profile={profile}
            onSectionChange={setSelectedSection}
          />
        )}
      </aside>

      {/* Right column */}
      <section className="md:col-span-2 h-full">
        <RightColumn
          profile={{ bio: profile.bio }}
          experience={experience}
          education={education}
          skill={skill}
          selectedSection={selectedSection} // controlled by parent
        />
      </section>
    </main>
  )
}