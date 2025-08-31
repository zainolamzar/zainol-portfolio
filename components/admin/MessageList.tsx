"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Contact = {
  id: string
  name: string
  service: string
  message: string
  due: string
  price: number
  status: string
  created_at: string
}

export default function MessageList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<string>("newest")
  const [search, setSearch] = useState<string>("")

  const router = useRouter()

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select("*")
      if (error) console.error(error)
      else setContacts(data as Contact[])
    }
    fetchContacts()
  }, [])

  useEffect(() => {
    let filtered = [...contacts]
    if (serviceFilter !== "all") {
      filtered = filtered.filter((c) => c.service === serviceFilter)
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((c) => c.status === statusFilter)
    }
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.message.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Sort newest/oldest
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    setFilteredContacts(filtered)
  }, [contacts, serviceFilter, statusFilter, search, sortOrder])

  // Format date as dd-MM-yyyy
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <aside className="w-64 border-r p-4 space-y-4 sticky top-0 h-screen">
        <Input
          placeholder="🔍 Search name or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <label className="text-sm font-medium">Service</label>
          <Select
            onValueChange={(val) => setServiceFilter(val)}
            defaultValue="all"
          >
            <SelectTrigger className="w-full min-w-[160px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="w-[160px]">
              <SelectItem value="all">All</SelectItem>
              {[...new Set(contacts.map((c) => c.service))].map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Status</label>
          <Select
            onValueChange={(val) => setStatusFilter(val)}
            defaultValue="all"
          >
            <SelectTrigger className="w-full min-w-[160px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="w-[160px]">
              <SelectItem value="all">All</SelectItem>
              {[...new Set(contacts.map((c) => c.status))].map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Sort</label>
          <Select
            onValueChange={(val) => setSortOrder(val)}
            defaultValue="newest"
          >
            <SelectTrigger className="w-full min-w-[160px]">
              <SelectValue placeholder="Newest" />
            </SelectTrigger>
            <SelectContent className="w-[160px]">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </aside>

      {/* Messages */}
      <div className="flex-1 divide-y">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => router.push(`/config/dashboard/${contact.id}`)}
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {contact.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.service}</p>
                <p className="text-sm text-gray-600 truncate max-w-md">
                  {contact.message}
                </p>
              </div>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm">Due: {formatDate(contact.due)}</p>
              <p className="text-sm font-medium">RM{contact.price}</p>
              <Badge
                className={cn(
                  "capitalize",
                  contact.status === "completed" && "bg-green-100 text-green-700",
                  contact.status === "pending" && "bg-yellow-100 text-yellow-700",
                  contact.status === "overdue" && "bg-red-100 text-red-700"
                )}
              >
                {contact.status}
              </Badge>
              <p className="text-xs text-gray-400">
                {formatDate(contact.created_at)}
              </p>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No messages found 📭
          </div>
        )}
      </div>
    </div>
  )
}