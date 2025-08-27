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
    <div className="mt-8">
      <Select defaultValue="#about" onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Navigate to..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="#about">About</SelectItem>
          <SelectItem value="#experience">Work Experience</SelectItem>
          <SelectItem value="#education">Education</SelectItem>
          <SelectItem value="#skills">Skills</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}