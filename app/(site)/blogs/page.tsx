import { createClient } from "@/lib/supabaseServer"
import { FocusCards } from "@/components/ui/focus-cards"

// Helper function to format date
function formatDate(createdAt: string) {
  const createdDate = new Date(createdAt)
  const now = new Date()
  const diffTime = now.getTime() - createdDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 7) return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  if (diffDays < 14) return "1 week ago"

  const day = String(createdDate.getDate()).padStart(2, "0")
  const month = String(createdDate.getMonth() + 1).padStart(2, "0")
  const year = createdDate.getFullYear()
  return `${day}/${month}/${year}`
}

export default async function BlogsPage() {
  const supabase = await createClient()

  const { data: blogs, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true) // ✅ Only published blogs
    .order("created_at", { ascending: false })

  if (error) return <p className="text-red-600">Failed to load blogs: {error.message}</p>

  return (
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-8">
      {/* Page Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
        Blogs
      </h1>

      {/* Blog Cards OR Empty State */}
      {blogs.length > 0 ? (
        <FocusCards
          cards={blogs.map((blog) => ({
            title: blog.title,
            src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`,
            href: `/blogs/${blog.slug}`,
            description: blog.content,
            date: formatDate(blog.created_at),
          }))}
        />
      ) : (
        <p className="text-center text-lg text-gray-400">
          No posts published yet. <span className="italic">Stay tuned!</span>
        </p>
      )}

      {/* Footer */}
      <footer className="mt-16 text-center text-[#dfe4ed]/50 text-sm">
        © {new Date().getFullYear()} Exclusively By Zainol Amzar
      </footer>
    </div>
  )
}