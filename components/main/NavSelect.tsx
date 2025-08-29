"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NavSelect({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="mt-8 w-40">
      <Select defaultValue="#about" onValueChange={onChange}>
        {/* Trigger */}
        <SelectTrigger
          className="w-full rounded-xl border border-[#000b1f] 
                     bg-[rgb(25,26,28)] text-[#dfe4ed] 
                     shadow-md hover:bg-[rgb(1,1,1)] 
                     transition-colors duration-300"
        >
          <SelectValue placeholder="Navigate to..." />
        </SelectTrigger>

        {/* Dropdown */}
        <SelectContent
          className="bg-[#00050f] border border-[#000b1f] 
                     text-[#dfe4ed] rounded-xl shadow-lg"
        >
          <SelectItem
            value="#about"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 transition-colors"
          >
            About
          </SelectItem>
          <SelectItem
            value="#experience"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 transition-colors"
          >
            Work Experience
          </SelectItem>
          <SelectItem
            value="#education"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 transition-colors"
          >
            Education
          </SelectItem>
          <SelectItem
            value="#skills"
            className="hover:bg-[#000b1f] focus:bg-[#b5b6b8] rounded-md px-2 transition-colors"
          >
            Skills
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}