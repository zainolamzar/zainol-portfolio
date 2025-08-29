"use client"

import React, { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { toast } from "sonner"

type Experience = {
  id: string
  role: string
  company: string
  start_date: string
  end_date?: string | null
  description?: string | null
  // Optional: user_id?: string
}

type FormShape = {
  role: string
  company: string
  start_date: string
  end_date: string
  description: string
}

const emptyForm: FormShape = {
  role: "",
  company: "",
  start_date: "",
  end_date: "",
  description: "",
}

export default function ResumeExperience() {
  const supabase = createClientComponentClient()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [form, setForm] = useState<FormShape>(emptyForm)

  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const fetchExperiences = async () => {
    setLoading(true)
    
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("start_date", { ascending: false })

    if (error) {
      console.error("Error fetching experiences:", error)
      toast.error("Failed to fetch work experience")
      setExperiences([])
    } else {
      setExperiences((data as Experience[]) || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchExperiences()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const beginEdit = (exp: Experience) => {
    setEditId(exp.id)
    setForm({
      role: exp.role ?? "",
      company: exp.company ?? "",
      start_date: exp.start_date ?? "",
      end_date: exp.end_date ?? "",
      description: exp.description ?? "",
    })
  }

  const beginCreate = () => {
    setEditId("new")
    setForm(emptyForm)
  }

  const cancelEdit = () => {
    setEditId(null)
    setForm(emptyForm)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveExisting = async (id: string) => {
    setSavingId(id)
    const { error } = await supabase
      .from("experience")
      .update({
        role: form.role,
        company: form.company,
        start_date: form.start_date,
        end_date: form.end_date || null,
        description: form.description || null,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating experience:", error)
      toast.error("Failed to update experience")
    } else {
      toast.success("Experience updated successfully")
      await fetchExperiences()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    setSavingId("new")
    const payload = {
      role: form.role,
      company: form.company,
      start_date: form.start_date,
      end_date: form.end_date || null,
      description: form.description || null,
      // If using RLS by user: user_id: (await supabase.auth.getUser()).data.user?.id
    }

    const { error } = await supabase.from("experience").insert(payload)
    if (error) {
      console.error("Error creating experience:", error)
      toast.error("Failed to create experience")
    } else {
      toast.success("Experience added successfully")
      await fetchExperiences()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("experience").delete().eq("id", id)

    if (error) {
      console.error("Error removing experience:", error)
      toast.error("Failed to remove experience")
    } else {
      toast.success("Experience removed successfully")
      await fetchExperiences()
      if (editId === id) cancelEdit()
    }
    setRemovingId(null)
  }

  if (loading) return <p>Loading work experience...</p>

  return (
    <section id="experience" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Work Experience
        </h2>
        <button
          className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
          onClick={beginCreate}
          disabled={editId === "new"}
        >
          {editId === "new" ? "Adding..." : "Add New"}
        </button>
      </div>

      {/* New row editor */}
      {editId === "new" && (
        <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900">
          <table className="w-full border-collapse">
            <tbody className="divide-y">
              <tr>
                <td className="font-medium pr-4 py-2">Role</td>
                <td>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-medium pr-4 py-2">Company</td>
                <td>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-medium pr-4 py-2">Start Date</td>
                <td>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={onChange}
                    className="border rounded p-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-medium pr-4 py-2">End Date</td>
                <td>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={onChange}
                    className="border rounded p-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-medium pr-4 py-2">Description</td>
                <td>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    rows={4}
                    className="w-full border rounded p-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex gap-2">
            <button
              onClick={saveNew}
              disabled={savingId === "new"}
              className="px-4 py-2 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
            >
              {savingId === "new" ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing rows */}
      {experiences.length === 0 && editId !== "new" && (
        <p className="text-gray-500">No work experience added yet.</p>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => {
          const isEditing = editId === exp.id
          return (
            <div
              key={exp.id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900"
            >
              <table className="w-full border-collapse">
                <tbody className="divide-y">
                  <tr>
                    <td className="font-medium pr-4 py-2">Role</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="role"
                          value={form.role}
                          onChange={onChange}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{exp.role}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">Company</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={onChange}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{exp.company}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">Start Date</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="date"
                          name="start_date"
                          value={form.start_date}
                          onChange={onChange}
                          className="border rounded p-2"
                        />
                      ) : (
                        <p>{exp.start_date}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">End Date</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="date"
                          name="end_date"
                          value={form.end_date}
                          onChange={onChange}
                          className="border rounded p-2"
                        />
                      ) : (
                        <p>{exp.end_date || "Present"}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">Description</td>
                    <td>
                      {isEditing ? (
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={onChange}
                          rows={4}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{exp.description || "—"}</p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 flex gap-2">
                {!isEditing ? (
                  <>
                    <button
                      className="text-sm px-3 py-1 border rounded bg-[#000b1f] text-white hover:bg-[#222c44]"
                      onClick={() => beginEdit(exp)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm px-3 py-1 border rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => removeRow(exp.id)}
                      disabled={removingId === exp.id}
                    >
                      {removingId === exp.id ? "Removing..." : "Remove"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => saveExisting(exp.id)}
                      disabled={savingId === exp.id}
                      className="px-4 py-2 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
                    >
                      {savingId === exp.id ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}