"use client"

import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import Image from "next/image"
import { toast } from "sonner"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type SocialLink = { platform: string; url: string }

type Profile = {
  id: string
  name: string
  headline: string
  avatar_url: string
  location: string
  social_links?: Record<string, string>
  bio: string
}

export default function ResumeAbout() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    bio: "",
    location: "",
    avatar_url: "",
    social_links: [] as SocialLink[],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("profile").select("*").single()
    if (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to fetch profile")
    } else if (data) {
      const social_links_array: SocialLink[] = data.social_links
        ? Object.entries(data.social_links).map(([platform, url]) => ({
            platform,
            url: String(url),
          }))
        : []

      setProfile(data)
      setFormData({
        name: data.name,
        headline: data.headline,
        bio: data.bio,
        location: data.location,
        avatar_url: data.avatar_url,
        social_links: social_links_array,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (index: number, field: string, value: string) => {
    const updated = [...formData.social_links]
    updated[index] = { ...updated[index], [field]: value }
    setFormData((prev) => ({ ...prev, social_links: updated }))
  }

  const addSocialLink = () =>
    setFormData((prev) => ({
      ...prev,
      social_links: [...prev.social_links, { platform: "", url: "" }],
    }))

  const removeSocialLink = (index: number) => {
    const updated = [...formData.social_links]
    updated.splice(index, 1)
    setFormData((prev) => ({ ...prev, social_links: updated }))
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !profile) return
    const file = e.target.files[0]
    setUploading(true)
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `profiles/${Date.now()}.${fileExt}`
    const { error } = await supabase.storage.from("profiles").upload(fileName, file, { upsert: true })
    if (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload avatar")
    } else {
      setFormData((prev) => ({ ...prev, avatar_url: filePath }))
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!profile?.id) return
    setSaving(true)

    // Convert social_links array → object
    const socialLinksObject: Record<string, string> = {}
    formData.social_links.forEach((link) => {
      if (link.platform && link.url) socialLinksObject[link.platform] = link.url
    })

    const { error } = await supabase
      .from("profile")
      .update({
        name: formData.name,
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        avatar_url: formData.avatar_url,
        social_links: socialLinksObject,
      })
      .eq("id", profile.id)

    if (error) {
      toast.error("Failed to update about: " + error.message) // ❌ error toast
      setSaving(false)
      return
    }

    await fetchProfile()
    setIsEditing(false)
    setSaving(false)
    toast.success("About updated successfully!") // ✅ success toast
  }

  if (loading) return <p>Loading about...</p>

  return (
    <section id="about" className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold border-b border-[#000b1f] pb-2">About</h2>
        <button
          className="text-sm px-3 py-1 border rounded bg-[#000b1f] text-white hover:bg-[#222c44]"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="space-y-4">
        {/* Avatar */}
        <div>
          {formData.avatar_url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${formData.avatar_url}`}
              alt={formData.name || "Avatar"}
              width={100}
              height={100}
              className="rounded-full shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200" />
          )}
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} />
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{profile?.name}</p>
          )}
        </div>

        {/* Headline */}
        <div>
          <label className="block font-medium mb-1">Headline:</label>
          {isEditing ? (
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{profile?.headline}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio:</label>
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={6}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{profile?.bio}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location:</label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          ) : (
            <p>{profile?.location}</p>
          )}
        </div>

        {/* Social Links */}
        <div>
          <label className="block font-medium mb-1">Social Links:</label>
          {formData.social_links.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="Platform"
                    value={link.platform}
                    onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                    className="border rounded p-1 flex-1"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                    className="border rounded p-1 flex-2"
                  />
                  <button
                    className="px-2 bg-red-500 text-white rounded"
                    onClick={() => removeSocialLink(index)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <p>
                  {link.platform}: {link.url}
                </p>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              className="px-2 py-1 bg-green-500 text-white rounded"
              onClick={addSocialLink}
            >
              Add Social Link
            </button>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#000b1f] text-white rounded hover:bg-[#222c44] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </section>
  )
}