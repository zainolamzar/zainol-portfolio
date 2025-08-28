"use client"

import React from "react"
import Image from "next/image"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import {
  FaTachometerAlt,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaProjectDiagram,
  FaBlog,
} from "react-icons/fa"
import LogoutButton from "./LogoutButton"

export const AdminSidebar = () => {
  const dashboardLinks = [
    { label: "Dashboard", href: "/config/dashboard", icon: <FaTachometerAlt /> },
  ]

  const resumeLinks = [
    { label: "About", href: "/config/resume#about", icon: <FaUser /> },
    { label: "Work Experience", href: "/config/resume#experience", icon: <FaBriefcase /> },
    { label: "Education", href: "/config/resume#education", icon: <FaGraduationCap /> },
    { label: "Skill", href: "/config/resume#skills", icon: <FaTools /> },
  ]

  const projectLinks = [
    { label: "Projects", href: "/config/project", icon: <FaProjectDiagram /> },
  ]

  const blogLinks = [
    { label: "Blogs", href: "/config/blog", icon: <FaBlog /> },
  ]

  const logoSrc = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profiles/logo.png`

  return (
    <Sidebar animate>
      <SidebarBody className="h-full flex flex-col p-4 gap-3 text-[#dfe4ed] sticky top-0">
        {/* Logo */}
        <div className="mb-1 flex justify-center md:justify-start">
          <Image
            src={logoSrc}
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        {/* Dashboard Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-1 text-[#dfe4ed]">
            Dashboard
          </h3>
          <div className="flex flex-col gap-1">
            {dashboardLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-1 text-[#dfe4ed]">
            Resume
          </h3>
          <div className="flex flex-col gap-1">
            {resumeLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Project Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-1 text-[#dfe4ed]">
            Projects
          </h3>
          <div className="flex flex-col gap-1">
            {projectLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Blog Section */}
        <div>
          <h3 className="text-sm font-bold uppercase mb-2 text-[#dfe4ed]">
            Blogs
          </h3>
          <div className="flex flex-col gap-1">
            {blogLinks.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* Logout Section positioned at the bottom */}
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </SidebarBody>
    </Sidebar>
  )
}