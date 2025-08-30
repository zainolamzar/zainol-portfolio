"use client"

import { useState } from "react"
import ProfileCard from "@/components/main/ProfileCard"
import RightColumn from "@/components/main/RightColumn"
import CustomBoxesBackground from "@/components/ui/BoxesBackground"

type Profile = {
  name: string
  headline: string
  avatar_url: string
  location: string
  social_links?: {
    github?: string
    linkedin?: string
    tiktok?: string
  }
  bio: string
}

type Experience = {
  role: string
  company: string
  start_date: string
  end_date?: string
  description?: string
}

type Skill = { name: string }

type Education = {
  school: string
  degree: string
  start_date: string
  end_date?: string
  description?: string
}

export default function MainApp({
  profile,
  experience,
  education,
  skill,
}: {
  profile: Profile
  experience: Experience[]
  skill: Skill[]
  education: Education[]
}) {
  const [selectedSection, setSelectedSection] = useState("#about")

  return (
    <div className="relative w-full min-h-screen">
      <CustomBoxesBackground />
      <main className="flex flex-col lg:grid lg:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Left column - Profile */}
        <aside className="lg:col-span-1 flex order-1 lg:order-1">
          <div className="w-full rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-6">
            {profile && (
              <ProfileCard
                profile={profile}
                onSectionChange={setSelectedSection}
              />
            )}
          </div>
        </aside>

        {/* Right column - Content */}
        <section className="lg:col-span-2 flex order-2 lg:order-2">
          <div className="w-full h-full rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-6 overflow-hidden">
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