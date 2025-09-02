"use client"

type About = {
  bio?: string
}

export default function AboutCard({ about }: { about: About }) {
  // Split bio text into paragraphs if available
  const paragraphs = about?.bio ? about.bio.trim().split(/\n\s*\n/) : []

  return (
    <div className="p-6 text-[#dfe4ed]">
      <h2
        id="about"
        className="text-2xl font-semibold mb-4 
                   border border-[#dfe4ed] p-4 rounded-2xl bg-[rgb(25,26,28)]"
      >
        About Me
      </h2>

      {paragraphs.length > 0 ? (
        paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-base leading-relaxed text-[#dfe4ed]/90 mb-4 last:mb-0"
          >
            {para}
          </p>
        ))
      ) : (
        <p className="text-base leading-relaxed text-[#dfe4ed]/90">
          No bio available.
        </p>
      )}
    </div>
  )
}