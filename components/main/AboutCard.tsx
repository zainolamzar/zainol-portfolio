"use client"

type About = {
  bio?: string
}

export default function AboutCard({ about }: { about: About }) {
  return (
    <div className="p-6 text-[#dfe4ed]">
      <h2
        id="about"
        className="text-2xl font-semibold mb-4 
                   border border-[#dfe4ed] p-4 rounded-2xl bg-[rgb(25,26,28)]"
      >
        About Me
      </h2>

      <p className="text-base leading-relaxed text-[#dfe4ed]/90">
        {about?.bio || "No bio available."}
      </p>
    </div>
  )
}