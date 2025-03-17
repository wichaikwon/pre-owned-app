'use client'

import React from 'react'
import { useSidebar } from '@/contexts/useSidebar'
import { useLogin } from '@/contexts/useLogin'
import { Cylinder, LayoutDashboard, LogOut, Smartphone, Stethoscope, Target } from 'lucide-react'
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
        <div
          onClick={() => router.push('/admin')}
          className={cx(
            'flex items-center gap-2 p-4',
            pathname ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <Stethoscope />
          {isOpen && <span className="cursor-pointer">LOGO</span>}
        </div>
        {[
          { label: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
          { label: 'Brands', icon: <Target />, path: '/admin/brands' },
          { label: 'Models', icon: <Smartphone />, path: '/admin/models' },
          { label: 'Storages', icon: <Cylinder />, path: '/admin/storages' },
        ].map(({ label, icon, path }) => (
          <div
            key={path}
            onClick={() => router.push(path)}
            className={cx(
              'flex items-center gap-2 p-4',
              pathname === path ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
            )}>
            {icon}
            {isOpen && <span className="cursor-pointer">{label}</span>}
          </div>
        ))}
      </div>
      <div className="hover flex items-center gap-2 p-4 hover:text-red-600">
        <LogOut />
        {isOpen && (
          <button className="cursor-pointer" onClick={logoutUser}>
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar
