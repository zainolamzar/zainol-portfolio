import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import MessageList from "@/components/admin/MessageList"

export default async function DashboardPage() {
  const token = (await cookies()).get("admin_token")?.value

  if (!token) {
    redirect("/config") // redirect to login if no cookie
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">📬 Dashboard</h1>
        <div className="bg-white rounded-2xl shadow-sm border">
          <MessageList />
        </div>
      </div>
    </div>
  )
}