"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] px-6">
      <h1 className="text-6xl font-bold mb-4">404 Error!</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-[#dfe4ed]/80 mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.  
        Lets get you back on track.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-medium transition"
      >
        Go Back Home
      </Link>
    </div>
  )
}