"use client"

type About = {
  bio?: string
}

export default function AboutCard({ about }: { about: About }) {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-2" id="about">About Me</h2>
        <p className="text-gray-700">{about?.bio || "No bio available."}</p>    
    </div>
  )
}