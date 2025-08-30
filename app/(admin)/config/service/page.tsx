import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ServiceForm from "@/components/admin/ServiceForm"

export default async function ServicePage() {
  const token = (await cookies()).get("admin_token")?.value

  if (!token) {
    redirect("/config") // redirect to login if no cookie
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 text-[#000b1f]">
      <h1 className="text-4xl font-bold mb-8">Service Configuration</h1>
      <ServiceForm />
    </div>
  )
}