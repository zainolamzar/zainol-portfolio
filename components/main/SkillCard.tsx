"use client"

type Skill = {
  name: string
  type: string
  level: string
}

export default function SkillCard({ skill }: { skill: Skill[] }) {
  // Group skills by type
  const groupedSkills: Record<string, Skill[]> = skill.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = []
    acc[curr.type].push(curr)
    return acc
  }, {} as Record<string, Skill[]>)

  // Sort each type group alphabetically by skill name
  Object.keys(groupedSkills).forEach((type) => {
    groupedSkills[type].sort((a, b) => a.name.localeCompare(b.name))
  })

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-4" id="skills">
        Skills
      </h2>

        <div className="p-4 space-y-4">
          {Object.keys(groupedSkills).map((type) => (
            <div key={type}>
              <h3 className="text-xl font-semibold mb-2">{type}</h3>
              <ul className="list-disc list-inside text-gray-700">
                {groupedSkills[type].map((s) => (
                  <li key={s.name}>
                    {s.name} - {s.level}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
    </div>
  )
}