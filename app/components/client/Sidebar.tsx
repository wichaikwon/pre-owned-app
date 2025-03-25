'use client'
import { useSidebar } from '@/contexts/useSidebar'
import { PhoneCallIcon, X } from 'lucide-react'
import React from 'react'

const Sidebar: React.FC = () => {
  const { sidebarClose } = useSidebar()

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={sidebarClose}>
      <div className="flex h-screen w-full flex-col bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col">
            <button onClick={sidebarClose} className="mb-4 flex justify-center">
              <X size={40} />
            </button>
            {[
              { label: 'สมัครสมาชิก/เข้าสู่ระบบ' },
              { label: 'ขายสินค้า' },
              { label: 'บทความ' },
              { label: 'คำถามที่พบบ่อย' },
              { label: 'เกี่ยวกับเรา' },
              { label: '081-234-5678', icon: <PhoneCallIcon size={24} /> },
            ].map((item, index) => (
              <button
                key={index}
                className="flex gap-2 rounded p-2 hover:border-b hover:border-b-yellow-400 hover:text-yellow-400">
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
