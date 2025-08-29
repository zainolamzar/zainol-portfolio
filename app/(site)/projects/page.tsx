import { createClient } from "@/lib/supabaseServer"
import { FocusCards } from "@/components/ui/focus-cards"

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
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-8">
      {/* Page Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
        Projects
      </h1>

      {/* Projects Cards OR Empty State */}
      {projects.length > 0 ? (
        <FocusCards
          cards={projects.map((project) => ({
            title: project.title,
            src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.image_url}`,
            href: `/projects/${project.slug}`,
            description: project.description,
            tech_stack: project.tech_stack,
          }))}
        />
      ) : (
        <p className="text-center text-lg text-gray-400">
          No projects developed yet. <span className="italic">Stay tuned!</span>
        </p>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-[#dfe4ed]/50 text-sm">
        © {new Date().getFullYear()} Zainol Amzar&apos;s Portfolio
      </footer>
    </div>
  )
}