import { createClient } from "@/lib/supabaseServer"
import { FocusCards } from "@/components/ui/focus-cards"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Projects | Zainol Amzar Portfolio",
  description: "Projects that Zainol Amzar worked hard to improve himself.",
  alternates: {
    canonical: "https://www.zainolamzar.com/projects",
  },
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
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Page Header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 sm:mb-10 md:mb-12 tracking-wide px-2">
        Projects
      </h1>

      {/* Projects Cards OR Empty State */}
      {projects.length > 0 ? (
        <FocusCards
          cards={projects.map((project) => ({
            title: project.title,
            src: project.image_url || "/placeholder-project.jpg", // image_url already contains full URL
            href: `/projects/${project.slug}`,
            description: project.description,
            tech_stack: project.tech_stack,
          }))}
        />
      ) : (
        <p className="text-center text-base sm:text-lg text-gray-400 px-4">
          No projects developed yet. <span className="italic">Stay tuned!</span>
        </p>
      )}

      {/* Footer */}
      <footer className="mt-12 sm:mt-14 md:mt-16 text-center text-[#dfe4ed]/50 text-xs sm:text-sm px-4">
        © {new Date().getFullYear()} Zainol Amzar&apos;s Portfolio
      </footer>
    </div>
  )
}