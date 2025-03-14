'use client'

import React from 'react'
import { useSidebar } from '@/contexts/useSidebar'
import { useLogin } from '@/contexts/useLogin'

const Sidebar: React.FC = () => {
  const { isOpen } = useSidebar()
  const { logoutUser } = useLogin()
  return (
    <div className={`flex min-h-screen flex-col justify-between bg-slate-200 p-2 text-xl`}>
      <div>
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>name</p>}
        </div>
        <hr />
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>brands</p>}
        </div>
        <hr />
        <div className="flex items-center gap-2">
          <img src="/next.svg" alt="logo" className="h-10 w-10" />
          {isOpen && <p>logout</p>}
        </div>
      </div>
      <div>
        <button className="cursor-pointer rounded-md " onClick={logoutUser}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
