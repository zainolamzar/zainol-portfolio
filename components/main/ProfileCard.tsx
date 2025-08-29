"use client"

import { useState, useEffect } from "react"
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
  const [isLoaded, setIsLoaded] = useState(false)
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${profile.avatar_url}`

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      {/* Profile Image with entrance animation */}
      <div 
        className={`transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 scale-100 rotate-0' 
            : 'opacity-0 scale-75 rotate-12'
        }`}
        style={{ transitionDelay: '100ms' }}
      >
        <Image
          src={imageUrl}
          alt={profile.name}
          width={100}
          height={100}
          className="rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Name with entrance animation */}
      <h2 
        className={`mt-2 text-2xl font-bold text-[#dfe4ed] transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        {profile.name}
      </h2>

      {/* Headline with entrance animation */}
      <p 
        className={`text-[#dfe4ed] transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        {profile.headline}
      </p>

      {/* Location with entrance animation */}
      <p 
        className={`text-[#dfe4ed] transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        {profile.location}
      </p>

      {/* Social Links with entrance animation */}
      <div 
        className={`flex gap-6 justify-center mt-5 transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={profile.social_links?.github}
              target="_blank"
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-3"
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
              className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-3"
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
              className="text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* NavSelect with entrance animation */}
      <div 
        className={`transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-4 scale-95'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <NavSelect onChange={onSectionChange} />
      </div>
    </div>
  )
}