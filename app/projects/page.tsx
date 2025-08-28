import { createClient } from "@/lib/supabaseServer"
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
    return <p className="text-red-600">Failed to load projects: {error.message}</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {projects?.map((project: Project) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.image_url}`

          return (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}