"use client"

import { useState } from "react"
import { FaGithub, FaLinkedin, FaTiktok } from "react-icons/fa"
import Image from "next/image"

import NavSelect from "./NavSelect"

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
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profile.avatar_url}`
  const [selectedSection, setSelectedSection] = useState("#about")

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <Image
        src={imageUrl}
        alt={profile.name}
        width={100}
        height={100}
        className="rounded-full shadow-lg"
      />
      <p className="mt-2 text-lg font-bold">{profile.name}</p>
      <p className="text-gray-600">{profile.headline}</p>
      <p className="text-gray-800">{profile.location}</p>

      <div className="flex gap-4 justify-center mt-5">
        <a href={profile.social_links?.github} target="_blank">
          <FaGithub className="w-6 h-6 hover:text-gray-800" />
        </a>
        <a href={profile.social_links?.linkedin} target="_blank">
          <FaLinkedin className="w-6 h-6 hover:text-blue-600" />
        </a>
        <a href={profile.social_links?.tiktok} target="_blank">
          <FaTiktok className="w-6 h-6 hover:text-black" />
        </a>
      </div>

      <NavSelect onChange={onSectionChange} />
    </div>
  )
}