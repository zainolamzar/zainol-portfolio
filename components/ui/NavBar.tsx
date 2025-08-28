"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaHome, FaProjectDiagram, FaBlog } from "react-icons/fa"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef, useState } from "react"

export default function NavBar() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/", icon: <FaHome /> },
    { label: "Projects", href: "/projects", icon: <FaProjectDiagram /> },
    { label: "Blogs", href: "/blogs", icon: <FaBlog /> },
  ]

  let mouseX = useMotionValue(Infinity)

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2
                 hidden md:flex items-end gap-6 px-6 pb-3 h-16
                 bg-[rgb(25,26,28)]/95 backdrop-blur-md
                 border border-[#000b1f] shadow-lg rounded-2xl z-50"
    >
      {navItems.map((item) => (
        <DockIcon
          key={item.href}
          {...item}
          active={pathname === item.href}
          mouseX={mouseX}
        />
      ))}
    </motion.nav>
  )
}

function DockIcon({
  href,
  label,
  icon,
  active,
  mouseX,
}: {
  href: string
  label: string
  icon: React.ReactNode
  active: boolean
  mouseX: any
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  let widthIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20])
  let heightIcon = useTransform(distance, [-150, 0, 150], [20, 36, 20])

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 })
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 })

  let widthI = useSpring(widthIcon, { mass: 0.1, stiffness: 150, damping: 12 })
  let heightI = useSpring(heightIcon, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex aspect-square items-center justify-center rounded-full
          transition-colors 
          ${active ? "text-blue-400 bg-[rgb(35,36,40)]" : "text-[#dfe4ed] bg-[rgb(30,31,34)] hover:text-blue-300"}`}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md 
                         border border-[#000b1f] bg-[rgb(25,26,28)] px-2 py-0.5 text-xs 
                         text-[#dfe4ed] shadow-md whitespace-pre"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div style={{ width: widthI, height: heightI }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  )
}