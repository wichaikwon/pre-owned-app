'use client'

import React from 'react'
import { useSidebar } from '@/contexts/useSidebar'
import { useLogin } from '@/contexts/useLogin'
import { Cylinder, LayoutDashboard, LogOut, Smartphone, Target } from 'lucide-react'
import cx from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { isOpen } = useSidebar()
  const { logoutUser } = useLogin()
  return (
    <div className={`flex min-h-screen flex-col justify-between bg-slate-200 p-2 text-xl`}>
      <div>
        <div className="flex cursor-pointer items-center gap-2 pb-10 hover:text-red-600">
          <button>Logo</button>
        </div>
        <div
          onClick={() => {
            router.push('/admin')
          }}
          className={cx(
            'flex cursor-pointer items-center gap-2 p-4',
            pathname === '/admin' ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <LayoutDashboard />
          {isOpen && <button className="cursor-pointer">Dashboard</button>}
        </div>
        <div
          onClick={() => {
            router.push('/admin/brands')
          }}
          className={cx(
            'flex cursor-pointer items-center gap-2 p-4',
            pathname === '/admin/brands' ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <Target />
          {isOpen && <button className="cursor-pointer">Brands</button>}
        </div>
        <div
          className={cx(
            'flex cursor-pointer items-center gap-2 p-4',
            pathname === '/admin/models' ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <Smartphone />
          {isOpen && <button className="cursor-pointer">Models</button>}
        </div>
        <div
          className={cx(
            'flex cursor-pointer items-center gap-2 p-4',
            pathname === '/admin/storages' ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <Cylinder />
          {isOpen && <button className="cursor-pointer">Storages</button>}
        </div>
      </div>
      <div className="flex items-center gap-2 p-4">
        <LogOut className="text-red-600" />
        <button className="cursor-pointer hover:text-red-600" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
