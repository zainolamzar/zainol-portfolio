"use client"

type Education = {
  school: string
  degree: string
  start_date: string
  end_date?: string
  description?: string
}

export default function EducationCard({ education }: { education: Education[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" id="education">Education</h2>
      {education.length === 0 ? (
        <p className="text-gray-500">No education yet.</p>
      ) : (
        education.map((exp, index) => (
          <div key={index} className="mb-6 text-center">
            <h3 className="font-semibold">{exp.school}</h3>
            <h4 className="italic">{exp.degree}</h4>
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