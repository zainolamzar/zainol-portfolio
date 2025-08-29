"use client"

import { useState, useEffect } from "react"
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (section: string) => {
    setSelectedSection(section)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <CustomBoxesBackground />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 w-screen h-screen p-8">
        {/* Left column - Profile Card */}
        <aside className="md:col-span-1 flex">
          <div 
            className={`w-full rounded-2xl bg-white/10 backdrop-blur-md p-6 overflow-hidden transition-all duration-1000 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {profile && (
              <ProfileCard
                profile={profile}
                onSectionChange={handleSectionChange}
              />
            )}
          </div>
        </aside>

        {/* Right column - Content */}
        <section className="md:col-span-2 flex">
          <div 
            className={`w-full h-full rounded-2xl bg-white/10 backdrop-blur-md p-6 overflow-hidden transition-all duration-1000 ease-out ${
              isLoaded 
                ? 'opacity-100 translate-x-0 scale-100' 
                : 'opacity-0 translate-x-8 scale-95'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
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