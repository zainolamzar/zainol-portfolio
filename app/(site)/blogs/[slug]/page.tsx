import { createClient } from "@/lib/supabaseServer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Blog = {
  id: number
  title: string
  slug: string
  content: string
  image_url: string
  created_at: string
}

interface Params {
  params: { slug: string }
}

export default async function BlogSlug({ params }: Params) {
  const supabase = await createClient()
  const { slug } = params

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !blog) {
    return <p className="text-red-600 p-4">Blog not found.</p>
  }

  // Format the date as "Sunday, 26 May 2025"
  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-MY", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-bold mb-1 mt-3">{blog.title}</h1>

      <div className="relative w-full h-64 mb-4">
        <img src={imageUrl} alt={blog.title} className="object-cover w-full h-full rounded-lg" />
      </div>

      <p className="text-gray-500 text-sm mb-4">{formattedDate}</p>

      <p className="text-gray-700 mt-4">{blog.content}</p>
    </div>
  )
}