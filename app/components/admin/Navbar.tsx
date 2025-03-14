import { useLogin } from '@/contexts/useLogin'
import { useSidebar } from '@/contexts/useSidebar'
import { Text } from 'lucide-react'
import React from 'react'

const NavbarAdmin: React.FC = () => {
  const { username } = useLogin()
  const {toggleSidebar} = useSidebar()

  return (
    <div className="flex transform items-center justify-between border-b border-b-slate-500 px-10 py-2">
      <div className="cursor-pointer" onClick={toggleSidebar}>
        <Text />
      </div>
      <button className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-white" >
        {username}
      </button>
    </div>
  )
}

export default NavbarAdmin
