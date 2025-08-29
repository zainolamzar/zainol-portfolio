"use client"

import LoginCard from "@/components/admin/LoginCard"

// Simplified background component with reduced animation complexity
const SimpleBackgroundBeams = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Base gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#000b1f] via-[#00050f] to-[rgb(25,26,28)]" />
    
    {/* Subtle radial gradients for depth */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_40%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.06),transparent_40%)]" />
    
    {/* Minimal animated elements with reduced complexity */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#000b1f]/20 to-transparent rounded-full blur-3xl animate-pulse" 
         style={{ animationDuration: '8s', animationTimingFunction: 'ease-in-out' }} />
    
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-[#00050f]/20 to-transparent rounded-full blur-3xl animate-pulse" 
         style={{ animationDuration: '10s', animationTimingFunction: 'ease-in-out', animationDelay: '2s' }} />
    
    {/* Subtle grid pattern for texture */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" 
           style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '50px 50px'
           }} />
    </div>
  </div>
)

export default function ConfigPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[rgb(25,26,28)] overflow-hidden">
      {/* Simplified Background Beams for better performance */}
      <SimpleBackgroundBeams />

      {/* Login Card on top */}
      <div className="relative z-10">
        <LoginCard />
      </div>
    </div>
  )
}