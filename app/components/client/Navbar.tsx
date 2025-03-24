import { Grip, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSidebar } from '@/contexts/useSidebar'
import Sidebar from '@/app/components/client/Sidebar'

const Navbar: React.FC = () => {
  const { sidebarOpen, isSidebarOpen } = useSidebar()

  return (
    <nav className="container mx-auto flex justify-between px-4 md:px-20">
      {isSidebarOpen && <Sidebar />}
      <button onClick={sidebarOpen} className="flex items-center gap-4 md:hidden">
        <Grip size={32} />
      </button>
      <div className="flex w-full justify-between">
        <div className="hidden items-center gap-4 md:flex">
          <Link href={'/'}>
            <Image
              src={'/logo/apple_bangkok_group.png'}
              alt="apple bangkok group"
              width={120}
              height={120}
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
          {['ขายสินค้า', 'บทความ', 'คำถามที่พบบ่อย', 'ติดต่อเรา'].map((item, idx) => (
            <button
              key={idx}
              className="flex border-b-2 border-b-transparent p-4 hover:border-b-2 hover:border-b-yellow-400">
              <Link href={'/admin/login'}>
                <p>{item}</p>
              </Link>
            </button>
          ))}
        </div>
        <button className="flex w-full justify-center pb-2 md:hidden">
          <Link href={'/'}>
            <Image
              src={'/logo/apple_bangkok_group.png'}
              alt="apple bangkok group"
              width={120}
              height={120}
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
        </button>
        <div className="flex items-center justify-end gap-2 p-2 text-sm md:items-start">
          <Link href="tel:6681-234-5678">
            <PhoneCall className="flex w-8 items-center md:w-4" />
          </Link>
          <button className="flex transform transition duration-300 ease-in-out hover:text-gray-500">
            <Link className="hidden md:flex" href="tel:+6681-234-5678">
              081-234-5678
            </Link>
          </button>
          <button className="hidden transform transition duration-300 ease-in-out hover:text-gray-500 md:flex">
            <Link href={'/'}>สมัครสมาชิก/เข้าสู่ระบบ</Link>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
