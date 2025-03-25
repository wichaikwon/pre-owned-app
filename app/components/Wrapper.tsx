'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import NavbarAdmin from './admin/Navbar'
import Sidebar from './admin/sidebar/Sidebar'
import FooterAdmin from './admin/Footer'
import ProtectedRoute from './ProtectedRoute'
import { useSidebar } from '@/contexts/useSidebar'
import Navbar from './client/Navbar'
import Footer from './client/Footer'
import SellGoodsSection from './client/section/SellGoodsSection'
import FaqSection from './client/section/FaqSection'
import FooterSection from './client/section/FooterSection'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }
  if (pathname.startsWith('/admin')) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen">
          <div className={`flex flex-col bg-slate-200 p-2${isOpen ? 'w-52' : 'w-fit'} `}>
            <Sidebar />
          </div>
          <div className="flex flex-1 flex-col">
            <NavbarAdmin />
            <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
            <FooterAdmin />
          </div>
        </div>
      </ProtectedRoute>
    )
  }
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="min-h-0 flex-1">
          {children}
          <SellGoodsSection />
          <FaqSection />
          <FooterSection />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
