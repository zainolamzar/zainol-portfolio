"use client"

import React, { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

type Project = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  url: string
  repo_url: string
  image_url: string
}

export default function ProjectForm() {
  const supabase = createClientComponentClient()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: [] as string[],
    url: "",
    repo_url: "",
    image_url: "",
  })

  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // fetch projects
  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
      toast.error("Failed to fetch projects")
      setProjects([])
    } else {
      setProjects((data as Project[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const beginEdit = (proj: Project) => {
    setEditId(proj.id)
    setFormData({
      title: proj.title,
      description: proj.description,
      tech_stack: proj.tech_stack || [],
      url: proj.url,
      repo_url: proj.repo_url,
      image_url: proj.image_url,
    })
  }

  const beginCreate = () => {
    setEditId("new")
    setFormData({
      title: "",
      description: "",
      tech_stack: [],
      url: "",
      repo_url: "",
      image_url: "",
    })
  }

  const cancelEdit = () => {
    setEditId(null)
    setFormData({
      title: "",
      description: "",
      tech_stack: [],
      url: "",
      repo_url: "",
      image_url: "",
    })
  }

  const saveExisting = async (id: string) => {
    setSavingId(id)
    const { error } = await supabase.from("projects").update(formData).eq("id", id)

    if (error) {
      console.error("Error updating project:", error)
      toast.error("Failed to update project")
    } else {
      toast.success("Project updated")
      await fetchProjects()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    if (!formData.title.trim()) {
      toast.error("Project title is required")
      return
    }
    setSavingId("new")
    const { error } = await supabase.from("projects").insert(formData)

    if (error) {
      console.error("Error creating project:", error)
      toast.error("Failed to create project")
    } else {
      toast.success("Project added")
      await fetchProjects()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error removing project:", error)
      toast.error("Failed to remove project")
    } else {
      toast.success("Project removed")
      await fetchProjects()
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
    const filePath = `projects/${fileName}`

    const { error } = await supabase.storage
      .from("projects")
      .upload(filePath, file, { upsert: true })

    if (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload project image")
    } else {
      const { data: urlData } = supabase.storage.from("projects").getPublicUrl(filePath)
      setFormData((prev) => ({ ...prev, image_url: urlData.publicUrl }))
      toast.success("Image uploaded")
    }
    setUploading(false)
  }

  if (loading) return <p>Loading projects...</p>

  return (
    <section id="projects" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Projects
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
            placeholder="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Tech stack (comma separated)"
            value={formData.tech_stack.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tech_stack: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Live URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="url"
            placeholder="Repo URL"
            value={formData.repo_url}
            onChange={(e) =>
              setFormData({ ...formData, repo_url: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          {/* Image upload */}
          <div className="flex gap-2 items-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <span>Uploading...</span>}
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="project preview"
                className="h-16 rounded border"
              />
            )}
          </div>

          <div className="flex gap-2">
            {editId === "new" ? (
              <button
                onClick={saveNew}
                disabled={savingId === "new"}
                className="px-4 py-2 bg-[#000b1f] text-white rounded"
              >
                {savingId === "new" ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => saveExisting(editId)}
                disabled={savingId === editId}
                className="px-4 py-2 bg-[#000b1f] text-white rounded"
              >
                {savingId === editId ? "Saving..." : "Save"}
              </button>
            )}
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Project list */}
      <ul className="space-y-4">
        {projects.map((proj) => (
          <li
            key={proj.id}
            className="border rounded p-4 bg-white dark:bg-gray-900 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{proj.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {proj.description}
              </p>
              {proj.url && (
                <a
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline mr-2"
                >
                  Live
                </a>
              )}
              {proj.repo_url && (
                <a
                  href={proj.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Repo
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-[#000b1f] text-white rounded text-sm"
                onClick={() => beginEdit(proj)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                onClick={() => removeRow(proj.id)}
                disabled={removingId === proj.id}
              >
                {removingId === proj.id ? "Removing..." : "Remove"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}