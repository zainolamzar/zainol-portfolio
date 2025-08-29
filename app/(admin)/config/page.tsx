"use client"

import LoginCard from "@/components/admin/LoginCard"
import {BackgroundBeams} from "@/components/ui/background-beams"

export default function ConfigPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[rgb(25,26,28)] overflow-hidden">
      {/* Background Beams positioned absolutely */}
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Login Card on top */}
      <div className="relative z-10">
        <LoginCard />
      </div>
    </div>
  )
}