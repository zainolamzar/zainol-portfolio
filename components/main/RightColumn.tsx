"use client"

import AboutCard from "@/components/main/AboutCard"
import ExperienceCard from "@/components/main/ExperienceCard"
import SkillCard from "@/components/main/SkillCard"
import EducationCard from "@/components/main/EducationCard"
import { ScrollArea } from "@/components/ui/scroll-area"

type Profile = { bio: string }

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

type RightColumnProps = {
  profile: Profile
  experience: Experience[]
  skill: Skill[]
  education: Education[]
  selectedSection: string
}

export default function RightColumn({
  profile,
  experience,
  skill,
  education,
  selectedSection,
}: RightColumnProps) {
  const renderSection = () => {
    switch (selectedSection) {
      case "#about":
        return <AboutCard about={profile} />
      case "#experience":
        return <ExperienceCard experience={experience} />
      case "#skills":
        return <SkillCard skill={skill} />
      case "#education":
        return <EducationCard education={education} />
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="h-full">
        {renderSection()}
      </ScrollArea>
    </div>
  )
}