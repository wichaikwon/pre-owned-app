'use client'
import { useSidebar } from '@/contexts/useSidebar'
import { Link, PhoneCallIcon, X } from 'lucide-react'
import React from 'react'

const Sidebar: React.FC = () => {
  const { sidebarClose } = useSidebar()

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={sidebarClose}>
      <div className="flex h-screen w-full flex-col bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col">
            <button onClick={sidebarClose} className="mb-4 flex justify-end">
              <X size={40} />
            </button>
            <button className="rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              สมัครสมาชิก/เข้าสู่ระบบ
            </button>
            <button className="rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              ขายสินค้า
            </button>
            <button className="rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              บทความ
            </button>
            <button className="rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              คำถามที่พบบ่อย
            </button>
            <button className="rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              เกี่ยวกับเรา
            </button>
            <button className="flex gap-2 rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
              <PhoneCallIcon size={24} /> 081-234-5678
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
