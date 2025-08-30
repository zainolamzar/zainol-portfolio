import { createClient } from "@/lib/supabaseServer"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import Image from "next/image"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Params {
  params: Promise<{ slug: string }>
}

export default async function ProjectSlug({ params }: Params) {
  const supabase = await createClient()
  const { slug } = await params

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400 text-lg sm:text-xl">Project not found.</p>
        </div>
      </div>
    )
  }

  // image_url already contains the full URL, no need to reconstruct
  const imageUrl = project.image_url

  return (
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-b from-[#000b1f] to-[#00050f] py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4 sm:mb-6">
            <BreadcrumbList className="text-[#dfe4ed]/70 text-sm sm:text-base">
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/" 
                  className="hover:text-[#dfe4ed] transition-colors duration-200"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#dfe4ed]/50" />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/projects" 
                  className="hover:text-[#dfe4ed] transition-colors duration-200"
                >
                  Projects
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#dfe4ed]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#dfe4ed] font-medium">
                  {project.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Project Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#00050f] text-[#dfe4ed] rounded-lg sm:rounded-xl hover:bg-[#000b1f] transition-all duration-300 border border-[#00050f]/50 hover:border-[#dfe4ed]/30 hover:scale-105 text-sm sm:text-base"
              >
                <FaExternalLinkAlt className="text-base sm:text-lg" />
                <span className="font-medium">Live Project</span>
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#00050f] text-[#dfe4ed] rounded-lg sm:rounded-xl hover:bg-[#000b1f] transition-all duration-300 border border-[#00050f]/50 hover:border-[#dfe4ed]/30 hover:scale-105 text-sm sm:text-base"
              >
                <FaGithub className="text-base sm:text-lg" />
                <span className="font-medium">GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Featured Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-8 sm:mb-10 md:mb-12 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 700px"
            priority
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00050f]/80 via-transparent to-transparent" />
        </div>

        {/* Tech Stack */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#dfe4ed]">Technologies Used</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.tech_stack.map((tech: string) => (
              <span 
                key={tech} 
                className="bg-[#000b1f]/70 text-[#dfe4ed] text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-[#00050f]/50 hover:border-[#dfe4ed]/30 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-[#000b1f]/50 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-[#00050f]/30">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#dfe4ed]">About This Project</h3>
          <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert max-w-none">
            <p className="text-[#dfe4ed] leading-relaxed text-base sm:text-lg">
              {project.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-14 md:mt-16 text-center text-[#dfe4ed]/50 text-xs sm:text-sm border-t border-[#00050f]/30 pt-6 sm:pt-8">
          © {new Date().getFullYear()} Exclusively By Zainol Amzar
        </footer>
      </div>
    </div>
  )
}