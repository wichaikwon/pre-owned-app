'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface SidebarContextProps {
  isOpen: boolean
  isSidebarOpen?: boolean
  toggleSidebar: () => void
  sidebarOpen: () => void
  sidebarClose: () => void
}

const SidebarContext = createContext<SidebarContextProps>({
  isOpen: true,
  isSidebarOpen: false,
  toggleSidebar: () => {},
  sidebarOpen: () => {},
  sidebarClose: () => {},
})

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const sidebarOpen = () => setIsSidebarOpen(true)
  const sidebarClose = () => setIsSidebarOpen(false)

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('__sidebar', newState.toString())
      }
      return newState
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('__sidebar')
      setIsOpen(savedState === 'true')
    }
  }, [])

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, sidebarClose, sidebarOpen , isSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
