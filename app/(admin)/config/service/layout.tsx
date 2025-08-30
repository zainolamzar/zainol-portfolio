import { Sidebar } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { Toaster } from "@/components/ui/sonner"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar animate>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </div>
    </Sidebar>
  )
}