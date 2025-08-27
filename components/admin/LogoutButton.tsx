"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/logout", { method: "POST" })
      router.push("/config") // redirect to login
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  )
}