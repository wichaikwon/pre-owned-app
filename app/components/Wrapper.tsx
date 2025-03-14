'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import NavbarAdmin from './admin/Navbar'
import Sidebar from './admin/sidebar/Sidebar'
import FooterAdmin from './admin/Footer'

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()

  if (pathname.startsWith('/admin/login')) {
    return <>{children}</>
  }
  if (pathname.startsWith('/admin')) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <NavbarAdmin />
          <div className="min-h-0 flex-1 overflow-auto">{children}</div>
          <FooterAdmin />
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-screen">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default Wrapper
