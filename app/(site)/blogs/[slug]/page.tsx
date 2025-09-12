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

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const formattedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${formattedSlug} | Blogs | Zainol Amzar Portfolio`,
    alternates: {
      canonical: `https://www.zainolamzar.com/blogs/${slug}`,
    },
  }
}

export default async function BlogSlug({ params }: Props) {
  const supabase = await createClient()
  const { slug } = await params

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-400 text-lg sm:text-xl">Blog not found.</p>
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

  const imageUrl = blog.image_url

  return (
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed]">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#000b1f] to-[#00050f] py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4 sm:mb-6">
            <BreadcrumbList className="text-[#dfe4ed]/70 text-sm sm:text-base">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Date */}
          <p className="text-[#dfe4ed]/60 text-base sm:text-lg">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Featured Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] mb-8 sm:mb-10 md:mb-12 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageUrl}`}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00050f]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="bg-[#000b1f]/50 backdrop-blur-sm rounded-2xl p-8 border border-[#00050f]/30">
          <div className="prose prose-lg prose-invert max-w-none">
            {blog.content
              .replace(/\\n/g, "\n")
              .split(/\n+/)
              .filter((line: string) => line.trim() !== "")
              .map((line: string, index: number) => {
                const headerMatch = line.trim().match(/^<header>(.*?)<\/header>$/)

                if (headerMatch) {
                  return (
                    <h2
                      key={index}
                      className="text-[#dfe4ed] font-bold text-xl sm:text-2xl mt-8 mb-4"
                    >
                      {headerMatch[1]}
                    </h2>
                  )
                }

                return (
                  <p
                    key={index}
                    className="text-[#dfe4ed] leading-relaxed mb-6 last:mb-0 text-base sm:text-lg"
                  >
                    {line}
                  </p>
                )
              })}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 sm:mt-14 md:mt-16 text-center text-[#dfe4ed]/50 text-xs sm:text-sm border-t border-[#00050f]/30 pt-6 sm:pt-8">
          © {new Date().getFullYear()} Exclusively By Zainol Amzar
        </footer>
      </div>
    </div>
  )
}
