import { Sidebar } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar animate>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </Sidebar>
  )
}