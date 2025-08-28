"use client"

import { useEffect, useMemo } from "react"
import * as FaIcons from "react-icons/fa"
import * as SiIcons from "react-icons/si"
import { IconType } from "react-icons"
import { FaRegCircle } from "react-icons/fa"

type Skill = { name: string }

function getSkillIcon(name: string): IconType {
  const normalized = name.replace(/\s+/g, "").replace(/\./g, "").toLowerCase()

  const faKey = ("Fa" + normalized.charAt(0).toUpperCase() + normalized.slice(1)) as keyof typeof FaIcons
  if (faKey in FaIcons) return FaIcons[faKey] as IconType

  const siKey = ("Si" + normalized.charAt(0).toUpperCase() + normalized.slice(1)) as keyof typeof SiIcons
  if (siKey in SiIcons) return SiIcons[siKey] as IconType

  return FaRegCircle
}

// Generate random spherical coordinates
function generateSpherePositions(count: number) {
  const positions: { rotateX: number; rotateY: number }[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1) // latitude
    const theta = 2 * Math.PI * Math.random()    // longitude
    positions.push({
      rotateX: (phi * 180) / Math.PI - 90, // convert to degrees
      rotateY: (theta * 180) / Math.PI,
    })
  }
  return positions
}

export default function SkillOrb({ skill }: { skill: Skill[] }) {
  // Apply CSS variables dynamically for number of icons
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--skills-count", skill.length.toString())
  }, [skill])

  const positions = useMemo(() => generateSpherePositions(skill.length), [skill.length])

  return (
    <div className="rounded-xl p-6 text-[#dfe4ed] flex flex-col">
      <h2 id="skills" 
      className="text-2xl font-semibold mb-4 border border-[#dfe4ed] p-4 rounded-2xl bg-[rgb(25,26,28)]" 
      > 
      Skills Acquired
      </h2>

      {/* 3D Orb */}
      <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-[320px] h-[320px] preserve-3d animate-spin-slow">
        {skill.map((s, i) => {
          const Icon = getSkillIcon(s.name)
          const { rotateX, rotateY } = positions[i]
          return (
            <div
              key={s.name}
              style={{
                transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(140px)`,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-14 h-14 flex items-center justify-center 
                         rounded-full bg-gradient-to-br from-[#2c2f36] to-[#0e0f12]
                         shadow-lg text-[#dfe4ed]/70 hover:text-[#61dafb] 
                         hover:scale-110 transition-all duration-500"
            >
              <Icon className="text-2xl" />
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}