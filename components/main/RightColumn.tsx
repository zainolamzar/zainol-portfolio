"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import AboutCard from "@/components/main/AboutCard"
import ExperienceCard from "@/components/main/ExperienceCard"
import SkillCard from "@/components/main/SkillCard"
import EducationCard from "@/components/main/EducationCard"

type Profile = { bio: string }
type Experience = any[]
type Skill = any[]
type Education = any[]

type RightColumnProps = {
  profile: Profile
  experience: Experience
  skill: Skill
  education: Education
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
    <ScrollArea className="h-[calc(100vh-4rem)] w-full rounded-md border p-6">
      <div className="w-full">{renderSection()}</div>
    </ScrollArea>
  )
}