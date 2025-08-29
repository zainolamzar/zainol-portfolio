"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Education = {
  id: string
  school: string
  degree: string
  start_date: string
  end_date?: string | null
  details?: string | null
}

type FormShape = {
  school: string
  degree: string
  start_date: string
  end_date: string
  details: string
}

const emptyForm: FormShape = {
  school: "",
  degree: "",
  start_date: "",
  end_date: "",
  details: "",
}

export default function ResumeEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [form, setForm] = useState<FormShape>(emptyForm)
  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const fetchEducation = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("start_date", { ascending: false })

    if (error) {
      console.error("Error fetching education:", error)
      toast.error("Failed to fetch education")
      setEducation([])
    } else {
      setEducation((data as Education[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchEducation()
  }, [])

  const beginEdit = (ed: Education) => {
    setEditId(ed.id)
    setForm({
      school: ed.school ?? "",
      degree: ed.degree ?? "",
      start_date: ed.start_date ?? "",
      end_date: ed.end_date ?? "",
      details: ed.details ?? "",
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
      .from("education")
      .update({
        school: form.school,
        degree: form.degree,
        start_date: form.start_date,
        end_date: form.end_date || null,
        details: form.details || null,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating education:", error)
      toast.error("Failed to update education")
    } else {
      toast.success("Education updated successfully")
      await fetchEducation()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    setSavingId("new")
    const payload = {
      school: form.school,
      degree: form.degree,
      start_date: form.start_date,
      end_date: form.end_date || null,
      details: form.details || null,
      // If using RLS: user_id: (await supabase.auth.getUser()).data.user?.id
    }

    const { error } = await supabase.from("education").insert(payload)
    if (error) {
      console.error("Error creating education:", error)
      toast.error("Failed to create education")
    } else {
      toast.success("Education added successfully")
      await fetchEducation()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("education").delete().eq("id", id)

    if (error) {
      console.error("Error removing education:", error)
      toast.error("Failed to remove education")
    } else {
      toast.success("Education removed successfully")
      await fetchEducation()
      if (editId === id) cancelEdit()
    }
    setRemovingId(null)
  }

  if (loading) return <p>Loading education...</p>

  return (
    <section id="education" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Education
        </h2>
        <button
          className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
          onClick={beginCreate}
          disabled={editId === "new"}
        >
          {editId === "new" ? "Adding..." : "Add New"}
        </button>
      </div>

      {/* New row */}
      {editId === "new" && (
        <div className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900">
          <table className="w-full border-collapse">
            <tbody className="divide-y">
              <tr>
                <td className="font-medium pr-4 py-2">School</td>
                <td>
                  <input
                    type="text"
                    name="school"
                    value={form.school}
                    onChange={onChange}
                    className="w-full border rounded p-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="font-medium pr-4 py-2">Degree</td>
                <td>
                  <input
                    type="text"
                    name="degree"
                    value={form.degree}
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
                <td className="font-medium pr-4 py-2">Details</td>
                <td>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={onChange}
                    rows={3}
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
      {education.length === 0 && editId !== "new" && (
        <p className="text-gray-500">No education history added yet.</p>
      )}

      <div className="space-y-4">
        {education.map((ed) => {
          const isEditing = editId === ed.id
          return (
            <div
              key={ed.id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-900"
            >
              <table className="w-full border-collapse">
                <tbody className="divide-y">
                  <tr>
                    <td className="font-medium pr-4 py-2">School</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="school"
                          value={form.school}
                          onChange={onChange}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{ed.school}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">Degree</td>
                    <td>
                      {isEditing ? (
                        <input
                          type="text"
                          name="degree"
                          value={form.degree}
                          onChange={onChange}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{ed.degree}</p>
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
                        <p>{ed.start_date}</p>
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
                        <p>{ed.end_date || "Present"}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium pr-4 py-2">Details</td>
                    <td>
                      {isEditing ? (
                        <textarea
                          name="details"
                          value={form.details}
                          onChange={onChange}
                          rows={3}
                          className="w-full border rounded p-2"
                        />
                      ) : (
                        <p>{ed.details || "—"}</p>
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
                      onClick={() => beginEdit(ed)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm px-3 py-1 border rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => removeRow(ed.id)}
                      disabled={removingId === ed.id}
                    >
                      {removingId === ed.id ? "Removing..." : "Remove"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => saveExisting(ed.id)}
                      disabled={savingId === ed.id}
                      className="px-4 py-2 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
                    >
                      {savingId === ed.id ? "Saving..." : "Save Changes"}
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