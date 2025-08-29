"use client"

import AboutCard from "@/components/main/AboutCard"
import ExperienceCard from "@/components/main/ExperienceCard"
import SkillCard from "@/components/main/SkillCard"
import EducationCard from "@/components/main/EducationCard"

type Profile = { bio: string }
type Experience = string
type Skill = string
type Education = string

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
    <div className="h-full flex flex-col overflow-hidden">
      {renderSection()}
    </div>
  )
}