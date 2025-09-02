"use client"

import AboutCard from "@/components/main/AboutCard"
import ExperienceCard from "@/components/main/ExperienceCard"
import SkillCard from "@/components/main/SkillCard"
import EducationCard from "@/components/main/EducationCard"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "motion/react"
import { useMemo } from "react"

type Profile = { 
  bio: string 
}

type Experience = {
  role: string
  company: string
  start_date: string
  end_date?: string
  description?: string
}

type Skill = { 
  name: string 
}

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
  // Memoize the section content to prevent unnecessary re-renders
  const sectionContent = useMemo(() => {
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
  }, [selectedSection, profile, experience, skill, education])

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSection}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-full"
          >
            {sectionContent}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}