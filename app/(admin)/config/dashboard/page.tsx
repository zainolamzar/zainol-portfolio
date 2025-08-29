import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const token = (await cookies()).get("admin_token")?.value

  if (!token) {
    redirect("/config") // redirect to login if no cookie
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6">Welcome! You are logged in.</p>
    </div>
  )
}