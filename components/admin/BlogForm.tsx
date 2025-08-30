"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Blog = {
  id: string
  title: string
  slug: string
  content: string
  published: boolean
  image_url: string
}

export default function BlogForm() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    published: false,
    image_url: "",
  })

  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // fetch blogs
  const fetchBlogs = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching blogs:", error)
      toast.error("Failed to fetch blogs")
      setBlogs([])
    } else {
      setBlogs((data as Blog[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const beginEdit = (proj: Blog) => {
    setEditId(proj.id)
    setFormData({
      title: proj.title,
      slug: proj.slug,
      content: proj.content,
      published: proj.published,
      image_url: proj.image_url,
    })
  }

  const beginCreate = () => {
    setEditId("new")
    setFormData({
      title: "",
      slug: "",
      content: "",
      published: false,
      image_url: "",
    })
  }

  const cancelEdit = () => {
    setEditId(null)
    setFormData({
      title: "",
      slug: "",
      content: "",
      published: false,
      image_url: "",
    })
  }

  const saveExisting = async (id: string) => {
    setSavingId(id)
    const { error } = await supabase.from("posts").update(formData).eq("id", id)

    if (error) {
      console.error("Error updating blog:", error)
      toast.error("Failed to update blog")
    } else {
      toast.success("Blog updated successfully")
      await fetchBlogs()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    if (!formData.title.trim()) {
      toast.error("Blog title is required")
      return
    }
    if (!formData.slug.trim()) {
      toast.error("Blog slug is required")
      return
    }
    setSavingId("new")
    const { error } = await supabase.from("posts").insert(formData)

    if (error) {
      console.error("Error creating blog:", error)
      toast.error("Failed to create blog")
    } else {
      toast.success("Blog added successfully")
      await fetchBlogs()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (error) {
      console.error("Error removing blog:", error)
      toast.error("Failed to remove blog")
    } else {
      toast.success("Blog removed successfully")
      await fetchBlogs()
      if (editId === id) cancelEdit()
    }
    setRemovingId(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
        const file = e.target.files[0]
        setUploading(true)
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `projects/${Date.now()}.${fileExt}`
        const { error } = await supabase.storage.from("projects").upload(fileName, file, { upsert: true })
        if (error) {
          console.error("Upload error:", error)
          toast.error("Failed to upload project image")
        } else {
          setFormData((prev) => ({ ...prev, image_url: filePath }))
        }
        setUploading(false)
  }

  if (loading) return <p>Loading blogs...</p>

  return (
    <section id="blogs" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Blogs
        </h2>
        <button
          className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
          onClick={beginCreate}
          disabled={editId === "new"}
        >
          {editId === "new" ? "Adding..." : "Add New"}
        </button>
      </div>

      {/* Add or Edit Form */}
      {editId && (
        <div className="space-y-3 border p-4 rounded bg-gray-50 dark:bg-gray-900">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Slug (URL-friendly version of title)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
            />
            <label>Published</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="file" onChange={handleImageUpload} />
            {uploading && <span>Uploading...</span>}
            {formData.image_url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${formData.image_url}`}
                alt="Preview"
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
              />
            )}
          </div>

          <div className="flex gap-2">
            {editId === "new" ? (
              <button
                onClick={saveNew}
                disabled={savingId === "new"}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {savingId === "new" ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => saveExisting(editId)}
                disabled={savingId === editId}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {savingId === editId ? "Saving..." : "Save Changes"}
              </button>
            )}
            <button
              onClick={cancelEdit}
              className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Blog list */}
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-4 flex flex-col gap-2 bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
                  onClick={() => beginEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={() => removeRow(blog.id)}
                  disabled={removingId === blog.id}
                >
                  {removingId === blog.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{blog.slug}</code>
            </p>
            {blog.image_url && (
              <Image
                src={blog.image_url}
                alt={blog.title}
                width={800}
                height={320}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <p className="text-sm">{blog.content}</p>
            <span
              className={`text-xs px-2 py-1 rounded ${
                blog.published ? "bg-green-200 text-green-800" : "bg-gray-200"
              }`}
            >
              {blog.published ? "Published" : "Draft"}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}