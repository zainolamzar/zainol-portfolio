"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Skill = {
  id: string
  name: string
}

export default function ResumeSkill() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  const [editId, setEditId] = useState<string | "new" | null>(null)
  const [name, setName] = useState("")
  const [savingId, setSavingId] = useState<string | "new" | null>(null)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const fetchSkills = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("name")

    if (error) {
      console.error("Error fetching skills:", error)
      toast.error("Failed to fetch skills")
      setSkills([])
    } else {
      setSkills((data as Skill[]) || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSkills()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const beginEdit = (sk: Skill) => {
    setEditId(sk.id)
    setName(sk.name)
  }

  const beginCreate = () => {
    setEditId("new")
    setName("")
  }

  const cancelEdit = () => {
    setEditId(null)
    setName("")
  }

  const saveExisting = async (id: string) => {
    setSavingId(id)
    const { error } = await supabase.from("skills").update({ name }).eq("id", id)

    if (error) {
      console.error("Error updating skill:", error)
      toast.error("Failed to update skill")
    } else {
      toast.success("Skill updated successfully")
      await fetchSkills()
      cancelEdit()
    }
    setSavingId(null)
  }

  const saveNew = async () => {
    if (!name.trim()) {
      toast.error("Skill name cannot be empty")
      return
    }

    setSavingId("new")
    const { error } = await supabase.from("skills").insert({ name })

    if (error) {
      console.error("Error creating skill:", error)
      toast.error("Failed to create skill")
    } else {
      toast.success("Skill added successfully")
      await fetchSkills()
      cancelEdit()
    }
    setSavingId(null)
  }

  const removeRow = async (id: string) => {
    setRemovingId(id)
    const { error } = await supabase.from("skills").delete().eq("id", id)

    if (error) {
      console.error("Error removing skill:", error)
      toast.error("Failed to remove skill")
    } else {
      toast.success("Skill removed successfully")
      await fetchSkills()
      if (editId === id) cancelEdit()
    }
    setRemovingId(null)
  }

  if (loading) return <p>Loading skills...</p>

  return (
    <section id="skills" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">
          Skills
        </h2>
        <button
          className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
          onClick={beginCreate}
          disabled={editId === "new"}
        >
          {editId === "new" ? "Adding..." : "Add New"}
        </button>
      </div>

      {/* New skill input */}
      {editId === "new" && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Skill name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border rounded p-2"
          />
          <button
            onClick={saveNew}
            disabled={savingId === "new"}
            className="px-4 py-2 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
          >
            {savingId === "new" ? "Saving..." : "Save"}
          </button>
          <button
            onClick={cancelEdit}
            className="px-4 py-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Existing skills list */}
      {skills.length === 0 && editId !== "new" && (
        <p className="text-gray-500">No skills added yet.</p>
      )}

      <ul className="space-y-2">
        {skills.map((sk) => {
          const isEditing = editId === sk.id
          return (
            <li
              key={sk.id}
              className="flex items-center justify-between border rounded-lg p-3 bg-white dark:bg-gray-900 shadow-sm"
            >
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 border rounded p-2 mr-2"
                />
              ) : (
                <span>{sk.name}</span>
              )}

              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <button
                      className="text-sm px-3 py-1 border rounded bg-[#000b1f] text-white hover:bg-[#222c44]"
                      onClick={() => beginEdit(sk)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm px-3 py-1 border rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => removeRow(sk.id)}
                      disabled={removingId === sk.id}
                    >
                      {removingId === sk.id ? "Removing..." : "Remove"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => saveExisting(sk.id)}
                      disabled={savingId === sk.id}
                      className="px-4 py-1 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
                    >
                      {savingId === sk.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}