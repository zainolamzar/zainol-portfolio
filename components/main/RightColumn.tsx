"use client"

import { useState, useEffect } from "react"
import AboutCard from "@/components/main/AboutCard"
import ExperienceCard from "@/components/main/ExperienceCard"
import SkillCard from "@/components/main/SkillCard"
import EducationCard from "@/components/main/EducationCard"

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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentSection, setCurrentSection] = useState(selectedSection)

  useEffect(() => {
    if (selectedSection !== currentSection) {
      setIsTransitioning(true)
      // Small delay to show exit animation
      const timer = setTimeout(() => {
        setCurrentSection(selectedSection)
        setIsTransitioning(false)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [selectedSection, currentSection])

  const renderSection = () => {
    switch (currentSection) {
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
    <div className="h-full flex flex-col overflow-hidden relative">
      <div 
        className={`w-full h-full transition-all duration-300 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 scale-95 translate-y-2' 
            : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {renderSection()}
      </div>
    </div>
  )
}