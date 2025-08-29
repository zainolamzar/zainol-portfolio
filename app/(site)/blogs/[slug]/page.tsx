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
import type { Metadata } from "next"

// Force dynamic rendering to avoid build-time issues
export const dynamic = 'force-dynamic'

// 🔑 Define props explicitly, no PageProps from next
export type BlogPageProps = {
  params: { slug: string }
}

// Optional: SEO metadata
export async function generateMetadata(
  { params }: BlogPageProps
): Promise<Metadata> {
  const supabase = await createClient()

  const { data: blog } = await supabase
    .from("posts")
    .select("title, description")
    .eq("slug", params.slug)
    .single()

  if (!blog) {
    return { title: "Blog not found" }
  }

  return {
    title: blog.title,
    description: blog.description ?? `Read more about ${blog.title}`,
  }
}

export default async function BlogSlug({ params }: BlogPageProps) {
  const supabase = await createClient()
  const { slug } = params

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400 text-xl">Blog not found.</p>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-MY", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blog.image_url}`

  return (
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed]">
      {/* Header Section with Gradient */}
      <div className="bg-gradient-to-b from-[#000b1f] to-[#00050f] py-12">
        <div className="max-w-4xl mx-auto px-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList className="text-[#dfe4ed]/70">
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/" 
                  className="hover:text-[#dfe4ed] transition-colors duration-200"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#dfe4ed]/50" />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/blogs" 
                  className="hover:text-[#dfe4ed] transition-colors duration-200"
                >
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#dfe4ed]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#dfe4ed] font-medium">
                  {blog.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>
          
          {/* Date */}
          <p className="text-[#dfe4ed]/60 text-lg">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Featured Image */}
        <div className="relative w-full h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00050f]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="bg-[#000b1f]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00050f]/30">
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-[#dfe4ed] leading-relaxed text-lg">
              {blog.content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-[#dfe4ed]/50 text-sm border-t border-[#00050f]/30 pt-8">
          © {new Date().getFullYear()} Exclusively By Zainol Amzar
        </footer>
      </div>
    </div>
  )
}