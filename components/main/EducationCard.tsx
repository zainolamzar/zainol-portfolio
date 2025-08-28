"use client"

import { format } from "date-fns"

function formatDate(dateString?: string) {
  if (!dateString) return ""
  try {
    return format(new Date(dateString), "MMM yyyy")
  } catch {
    return dateString // fallback if invalid
  }
}

type Education = {
  school: string
  degree: string
  start_date: string
  end_date?: string
  description?: string
}

export default function EducationCard({ education }: { education: Education[] }) {
  return (
    <div className="p-6 text-[#dfe4ed]">
      <h2 className="text-2xl font-semibold mb-4 
                   border border-[#dfe4ed] p-4 rounded-2xl bg-[rgb(25,26,28)]"
          id="education">
          Education
      </h2>
      {education.length === 0 ? (
        <p className="text-[#dfe4ed]/60">No education yet.</p>
      ) : (
        <div className="relative border-l border-[#dfe4ed]/30 pl-6">
          {education.map((exp, index) => (
            <div key={index} className="mb-8 relative group">
              {/* Timeline dot */}
              <span className="absolute -left-[10px] top-2 w-4 h-4 rounded-full 
                              bg-[#000b1f] border-2 border-[#dfe4ed] 
                              transition-colors group-hover:bg-[#dfe4ed] group-hover:border-[#000b1f]"></span>

              {/* Card */}
              <div
                className="bg-[rgb(25,26,28)] p-4 rounded-xl shadow-md transition-all
                          group-hover:scale-[1.02] group-hover:shadow-lg 
                          group-hover:border group-hover:border-[#dfe4ed]/50"
              >
                <h3 className="font-semibold text-[#dfe4ed] text-lg">{exp.school}</h3>
                <h4 className="italic text-[#dfe4ed]/70">{exp.degree}</h4>
                <p className="text-sm text-[#dfe4ed]/60 mb-2">
                  {formatDate(exp.start_date)} – {exp.end_date ? formatDate(exp.end_date) : "Present"}
                </p>
                {exp.description && (
                  <p className="text-[#dfe4ed]/80 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}