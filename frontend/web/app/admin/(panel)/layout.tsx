"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopbar } from "@/components/admin/admin-topbar"

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <AdminSidebar />
      <div className="ml-64">
        <AdminTopbar onAction={() => setShowModal(true)} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
