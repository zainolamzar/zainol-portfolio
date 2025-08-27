"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome, FaProjectDiagram, FaBlog } from "react-icons/fa"

export default function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Projects", href: "/projects", icon: <FaProjectDiagram /> },
    { label: "Blogs", href: "/blogs", icon: <FaBlog /> },
  ]

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-lg rounded-full px-6 py-2 flex gap-8 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center text-sm font-medium transition-all ${
              isActive ? "text-blue-600 scale-110" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <div className="text-lg">{item.icon}</div>
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}