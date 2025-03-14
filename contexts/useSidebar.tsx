'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface SidebarContextProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  toggleSidebar: () => {},
})

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultState = typeof window !== 'undefined' ? (localStorage.getItem('__sidebar') ?? 'false') : 'false'
  const [isOpen, setIsOpen] = useState(defaultState === 'true')

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    localStorage.setItem('__sidebar', (!isOpen).toString())
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('__sidebar')
      setIsOpen(savedState === 'true')
    }
  }, [])

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
