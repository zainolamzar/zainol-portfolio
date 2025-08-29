"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"
import { FaSignOutAlt } from "react-icons/fa"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { open } = useSidebar()

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/logout", { method: "POST" })
      router.push("/config")
    } catch (err) {
      console.error("Logout failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-200
        ${open ? "w-full px-4 py-2 justify-start" : "w-12 h-12"}
      `}
    >
      <FaSignOutAlt className="text-white text-lg" />
      {open && <span className="text-white font-medium">{loading ? "Logging out..." : "Logout"}</span>}
    </button>
  )
}