import { useLogin } from '@/contexts/useLogin'
import { useSidebar } from '@/contexts/useSidebar'
import { Text } from 'lucide-react'
import React from 'react'

const NavbarAdmin: React.FC = () => {
  const {toggleSidebar} = useSidebar()
  const {username} = useLogin()

  return (
    <div className="flex transform items-center justify-between border-b border-b-slate-500 px-10 py-2">
      <div className="cursor-pointer" onClick={toggleSidebar}>
        <Text />
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-medium">{username ? `Welcome, ${username}` : 'Welcome'}</p>
      </div>
    </div>
  )
}

export default NavbarAdmin
