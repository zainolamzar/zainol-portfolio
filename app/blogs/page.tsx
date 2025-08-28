import { createClient } from "@/lib/supabaseServer"
import { FocusCards } from "@/components/ui/focus-cards";
import Image from "next/image"
import Link from "next/link"

type Blog = {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  created_at: string
}

// Helper function to format date
function formatDate(createdAt: string) {
  const createdDate = new Date(createdAt)
  const now = new Date()
  const diffTime = now.getTime() - createdDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 7) {
    return diffDays === 0 ? "Today" : `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  } else if (diffDays < 14) {
    return "1 week ago"
  } else {
    // Format as DD/MM/YYYY
    const day = String(createdDate.getDate()).padStart(2, "0")
    const month = String(createdDate.getMonth() + 1).padStart(2, "0")
    const year = createdDate.getFullYear()
    return `${day}/${month}/${year}`
  }
}

export default async function BlogsPage() {
  const supabase = await createClient()

  const { data: blogs, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return <p className="text-red-600">Failed to load blogs: {error.message}</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Blogs</h1>

      <FocusCards
        cards={blogs.map((blog) => ({
          title: blog.title,
          src: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`,
          href: `/blogs/${blog.slug}`,
          description: blog.content,
          date: formatDate(blog.created_at), // e.g. "Sunday, 28 Aug 2025"
        }))}
      />
    </div>
  )
}