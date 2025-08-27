"use client"

type Experience = {
  role: string
  company: string
  start_date: string
  end_date?: string
  description?: string
}

export default function ExperienceCard({ experience }: { experience: Experience[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" id="experience">Work Experience</h2>
      {experience.length === 0 ? (
        <p className="text-gray-500">No work experience yet.</p>
      ) : (
        experience.map((exp, index) => (
          <div key={index} className="mb-6 text-center">
            <h3 className="font-semibold">{exp.role} @ {exp.company}</h3>
            <p className="text-gray-500">
              {exp.start_date} - {exp.end_date || "Present"}
            </p>
            {exp.description && <p className="text-gray-700">{exp.description}</p>}
          </div>
        ))
      )}
    </div>
  )
}