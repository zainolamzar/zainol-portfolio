import { createClient } from "@/lib/supabaseServer"
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface Params {
  params: { slug: string }
}

export default async function ProjectSlug({ params }: Params) {
  const supabase = await createClient()
  const { slug } = params

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !project) {
    return <p className="text-red-600 p-4">Project not found.</p>
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.image_url}`

  return (
    <div className="p-8 max-w-4xl mx-auto">
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink href="/projects">Project</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

      <h1 className="text-4xl font-bold mb-2 mt-3">{project.title}</h1>

      {/* Project Buttons */}
      <div className="flex gap-4 mb-4">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaExternalLinkAlt /> Live Project
          </a>
        )}
        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            <FaGithub /> GitHub
          </a>
        )}
      </div>

      <div className="relative w-full h-64 mb-4">
        <img src={imageUrl} alt={project.title} className="object-cover w-full h-full rounded-lg" />
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech_stack.map((tech) => (
            <span key={tech} className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full">
            {tech}
          </span>
        ))}
      </div>

        <p className="text-gray-700 mt-4">{project.description}</p>
    </div>
  )
}