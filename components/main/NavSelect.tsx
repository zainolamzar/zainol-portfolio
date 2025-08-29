"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NavSelect({ onChange }: { onChange: (value: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (value: string) => {
    onChange(value)
    // Add a subtle animation feedback
    const element = document.querySelector('.nav-select-feedback')
    if (element) {
      element.classList.add('animate-pulse')
      setTimeout(() => element.classList.remove('animate-pulse'), 300)
    }
  }

  return (
    <div className="mt-8 w-40 nav-select-feedback">
      <Select 
        defaultValue="#about" 
        onValueChange={handleValueChange}
        onOpenChange={setIsOpen}
      >
        {/* Trigger with enhanced animations */}
        <SelectTrigger
          className={`w-full rounded-xl border border-[#000b1f] 
                     bg-[rgb(25,26,28)] text-[#dfe4ed] 
                     shadow-md hover:bg-[rgb(1,1,1)] 
                     transition-all duration-300 transform hover:scale-105
                     ${isOpen ? 'ring-2 ring-[#000b1f] ring-opacity-50' : ''}`}
        >
          <SelectValue placeholder="Navigate to..." />
        </SelectTrigger>

        {/* Dropdown with enhanced animations */}
        <SelectContent
          className="bg-[#00050f] border border-[#000b1f] 
                     text-[#dfe4ed] rounded-xl shadow-lg
                     animate-in fade-in-0 zoom-in-95 duration-200"
        >
          <SelectItem
            value="#about"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 
                       transition-all duration-200 hover:translate-x-1 hover:scale-105
                       cursor-pointer"
          >
            About
          </SelectItem>
          <SelectItem
            value="#experience"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 
                       transition-all duration-200 hover:translate-x-1 hover:scale-105
                       cursor-pointer"
          >
            Work Experience
          </SelectItem>
          <SelectItem
            value="#education"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 
                       transition-all duration-200 hover:translate-x-1 hover:scale-105
                       cursor-pointer"
          >
            Education
          </SelectItem>
          <SelectItem
            value="#skills"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 
                       transition-all duration-200 hover:translate-x-1 hover:scale-105
                       cursor-pointer"
          >
            Skills
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}