"use client"

import { useState } from "react"
import { FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa"
import Image from "next/image"

import NavSelect from "./NavSelect"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

type Props = {
  profile: Profile
  onSectionChange: (value: string) => void
}

export default function ProfileCard({ profile, onSectionChange }: Props) {
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profile.avatar_url}`const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profile.avatar_url}`
  const [selectedSection, setSelectedSection] = useState("#about")

  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <Image
        src={imageUrl}
        alt={profile.name}
        width={100}
        height={100}
        className="rounded-full shadow-lg"
      />
      <h2 className="mt-2 text-2xl font-bold text-[#dfe4ed]">{profile.name}</h2>
      <p className="text-[#dfe4ed]">{profile.headline}</p>
      <p className="text-[#dfe4ed]">{profile.location}</p>

      <div className="flex gap-6 justify-center mt-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={profile.social_links?.github}
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>Github</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={profile.social_links?.tiktok}
              target="_blank"
              className="text-gray-400 hover:text-black transition-colors duration-300 transform hover:scale-110"
            >
              <FaTiktok className="w-6 h-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>TikTok</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={profile.social_links?.linkedin}
              target="_blank"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <NavSelect onChange={onSectionChange} />
    </div>
  )
}