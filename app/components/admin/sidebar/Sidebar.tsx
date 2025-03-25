'use client'

import React from 'react'
import { useSidebar } from '@/contexts/useSidebar'
import { useLogin } from '@/contexts/useLogin'
import {
  Cog,
  Cpu,
  Cylinder,
  GripVertical,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  Smartphone,
  Stethoscope,
  TabletSmartphone,
  Target,
} from 'lucide-react'
import cx from 'classnames'
import { usePathname, useRouter } from 'next/navigation'
const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { isOpen } = useSidebar()
  const { logoutUser } = useLogin()
  return (
    <div className={`hidden min-h-screen flex-col justify-between bg-slate-200 p-2 text-xl md:flex`}>
      <div>
        <div
          onClick={() => router.push('/admin')}
          className={cx(
            'flex items-center gap-2 p-4 cursor-pointer',
            pathname ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
          )}>
          <Stethoscope size={28} />
          {isOpen && <span>LOGO</span>}
        </div>
        {[
          { label: 'Dashboard', icon: <LayoutDashboard size={28} />, path: '/admin' },
          { label: 'Brands', icon: <Target size={28} />, path: '/admin/brands' },
          { label: 'Models', icon: <Smartphone size={28} />, path: '/admin/models' },
          { label: 'Storages', icon: <Cylinder size={28} />, path: '/admin/storages' },
          { label: 'phones', icon: <TabletSmartphone size={28} />, path: '/admin/phones' },
          { label: 'Defects', icon: <ShieldAlert size={28} />, path: '/admin/defects' },
          { label: 'Choices', icon: <GripVertical size={28} />, path: '/admin/defect-choices' },
          { label: 'Config', icon: <Cog size={28} />, path: '/admin/config-brands' },
          { label: 'Deduction', icon: <Cpu size={28} />, path: '/admin/price-deductions' },
        ].map(({ label, icon, path }) => (
          <button
            key={path}
            onClick={() => router.push(path)}
            className={cx(
              'flex w-full items-center gap-2 p-4 text-left',
              pathname === path ? 'font-bold text-red-700' : 'text-black hover:text-red-600'
            )}>
            {icon}
            {isOpen && <span className="cursor-pointer">{label}</span>}
          </button>
        ))}
      </div>
      <div className="hover flex items-center gap-2 p-4 cursor-pointer hover:text-red-600" onClick={logoutUser}>
        <LogOut size={28} />
        {isOpen && <span>Logout</span>}
      </div>
    </div>
  )
}

export default Sidebar
