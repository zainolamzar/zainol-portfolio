"use client"

import { useState } from "react"
import ProfileCard from "@/components/main/ProfileCard"
import RightColumn from "@/components/main/RightColumn"
import CustomBoxesBackground from "@/components/ui/BoxesBackground"

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
    <div className="relative w-screen h-screen overflow-hidden">
      <CustomBoxesBackground />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 w-screen h-screen p-8">
        {/* Left column */}
        <aside className="md:col-span-1 flex">
          <div className="w-full rounded-2xl bg-white/10 backdrop-blur-md p-6 overflow-hidden">
            {profile && (
              <ProfileCard
                profile={profile}
                onSectionChange={setSelectedSection}
              />
            )}
          </div>
        </aside>

        {/* Right column */}
        <section className="md:col-span-2 flex">
          <div className="w-full h-full rounded-2xl bg-white/10 backdrop-blur-md p-6 overflow-hidden">
            <RightColumn
              profile={profile}
              experience={experience}
              education={education}
              skill={skill}
              selectedSection={selectedSection}
            />
          </div>
        </section>
      </main>
    </div>

  )
}