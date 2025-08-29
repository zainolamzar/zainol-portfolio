import { createClient } from "@/lib/supabaseServer"
import Image from "next/image"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default async function BlogSlug(
  props: PageProps<'/blogs/[slug]'>
) {
  const { slug } = await props.params
  const supabase = await createClient()

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !blog) {
    return <p className="text-red-600 p-4">Blog not found.</p>
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-MY", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
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

      {/* Title & Image */}
      <h1 className="text-4xl font-bold mb-1 mt-3">{blog.title}</h1>
      <div className="relative w-full h-[400px] mt-4 mb-6">
        <Image
          src={imageUrl}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      {/* Content */}
      <p className="text-gray-500 text-sm mb-4">{formattedDate}</p>
      <p className="text-gray-700 mt-4">{blog.content}</p>
    </div>
  )
}