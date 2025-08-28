import { createClient } from "@/lib/supabaseServer"
import { FocusCards } from "@/components/ui/focus-cards"
import Image from "next/image"
import Link from "next/link"

type Project = {
  id: number
  title: string
  slug: string
  description: string
  image_url: string
  tech_stack: string[]
  project_url?: string
}

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <p className="text-red-600">
        Failed to load projects: {error.message}
      </p>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Projects</h1>

      {/* Apply focus effect on cards */}
      <FocusCards
        cards={projects.map((project) => ({
          title: project.title,
          src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.image_url}`,
          href: `/projects/${project.slug}`,
          description: project.description,
          tech_stack: project.tech_stack,
        }))}
      />
    </div>
  )
}