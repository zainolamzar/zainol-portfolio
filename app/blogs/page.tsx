import { createClient } from "@/lib/supabaseServer"
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
      <h1 className="text-4xl font-bold mb-6">Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {blogs?.map((blog: Blog) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`

          return (
            <Link
              key={blog.id}
              href={`/blogs/${blog.slug}`}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
                <div className="relative w-full h-48">
                    <Image
                        src={imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-sm">{formatDate(blog.created_at)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}