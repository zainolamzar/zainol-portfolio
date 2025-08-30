"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Service = {
  id: string
  name: string
  description: string
  image_url: string
}

export default function ServiceForm() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  })

  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // fetch services
  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching services:", error)
      toast.error("Failed to fetch services")
      setServices([])
    } else {
      setServices((data as Service[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const beginEdit = (svc: Service) => {
    setEditId(svc.id)
    setFormData({
      name: svc.name,
      description: svc.description,
      image_url: svc.image_url,
    })
  }

  const beginCreate = () => {
    setEditId("new")
    setFormData({ name: "", description: "", image_url: "" })
  }

  const cancelEdit = () => {
    setEditId(null)
    setFormData({ name: "", description: "", image_url: "" })
  }

  const saveExisting = async (id: string) => {
    setSavingId(id)
    const { error } = await supabase.from("services").update(formData).eq("id", id)

    if (error) {
      console.error("Error updating service:", error)
      toast.error("Failed to update service")
    } else {
      toast.success("Service updated successfully")
      await fetchServices()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    if (!formData.name.trim()) {
      toast.error("Service name is required")
      return
    }
    setSavingId("new")
    const { error } = await supabase.from("services").insert(formData)

    if (error) {
      console.error("Error creating service:", error)
      toast.error("Failed to create service")
    } else {
      toast.success("Service added successfully")
      await fetchServices()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      console.error("Error removing service:", error)
      toast.error("Failed to remove service")
    } else {
      toast.success("Service removed successfully")
      await fetchServices()
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
    const filePath = `services/${fileName}`

    const { error } = await supabase.storage
      .from("services")
      .upload(fileName, file, { upsert: true })

    if (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload service image")
    } else {
      setFormData((prev) => ({ ...prev, image_url: filePath }))
    }
    setUploading(false)
  }

  if (loading) return <p>Loading services...</p>

  return (
    <section id="services" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Services
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
            placeholder="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

          {/* Image upload */}
          <div className="flex gap-2 items-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {uploading && <span>Uploading...</span>}
            {formData.image_url && (
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${formData.image_url}`}
                alt="service preview"
                width={64}
                height={64}
                className="h-16 rounded border object-cover"
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
                {savingId === editId ? "Saving..." : "Save Changes"}
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

      {/* Service list */}
      <ul className="space-y-4">
        {services.map((svc) => (
          <li
            key={svc.id}
            className="border rounded p-4 bg-white dark:bg-gray-800 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold">{svc.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {svc.description}
              </p>
              {svc.image_url && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${svc.image_url}`}
                  alt={svc.name}
                  width={80}
                  height={80}
                  className="rounded mt-2 object-cover"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-[#000b1f] text-white rounded text-sm"
                onClick={() => beginEdit(svc)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                onClick={() => removeRow(svc.id)}
                disabled={removingId === svc.id}
              >
                {removingId === svc.id ? "Removing..." : "Remove"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}