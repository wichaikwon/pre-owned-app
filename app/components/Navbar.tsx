import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between px-4 md:px-20 lg:px-96">
      <button className="flex cursor-pointer">
        <Link href={'/'}>
          <Image src={'/logo/apple_bangkok_group.png'} alt="apple bangkok group" width={160} height={160} />
        </Link>
      </button>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          {['บทความ', 'คำถามที่พบบ่อย', 'ติดต่อเรา'].map((item, idx) => (
            <button key={idx} className="flex cursor-pointer p-4 hover:border-b-2 hover:border-b-yellow-400">
              <Link href={'/admin/login'}>
                <p>{item}</p>
              </Link>
            </button>
          ))}
        </div>
        <div className="flex justify-end text-sm gap-4 p-2">
          <button className="flex transform cursor-pointer transition duration-300 ease-in-out hover:text-gray-500">
            <Link href="tel:+6681-234-5678">081-234-5678</Link>
          </button>
          <button className="flex transform cursor-pointer transition duration-300 ease-in-out hover:text-gray-500">
            <Link href={'/'}>สมัครสมาชิก/เข้าสู่ระบบ</Link>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
