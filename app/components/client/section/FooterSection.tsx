import Footer from '@/constants/footer'
import { Mail, PhoneCall } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

const FooterSection: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-gray-100">
        <div className="container mx-auto flex justify-between px-4 md:px-20">
          <div className="flex w-full justify-between">
            {Footer.map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2 pt-4">
                <Image
                  alt={item.image}
                  width={100}
                  height={100}
                  src={item.image}
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className="flex justify-center text-lg font-bold">{item.title1}</div>
                <div className="flex justify-center text-lg font-bold">{item.title2}</div>
                <div className="flex flex-col gap-10 lg:flex-row">
                  <div className="flex w-full flex-col gap-4 lg:w-6/12">
                    {item.description.map((desc, idx) => (
                      <div key={idx} className="flex flex-col gap-2">
                        <p className="text-left">{desc.description1}</p>
                        <p className="text-left">{desc.description2}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full justify-start lg:w-6/12">
                    <div className="flex w-full flex-col justify-center gap-8 md:grid md:grid-cols-2 lg:w-fit">
                      <div className="flex min-w-max flex-col justify-start gap-2 lg:items-start">
                        <p className="font-bold">{item.title3}</p>
                        {item.items1.map((subItem, index) => (
                          <a key={index} href={subItem.link} className="text-sm">
                            {subItem.title}
                          </a>
                        ))}
                      </div>
                      <div className="flex min-w-max flex-col justify-start gap-2 lg:items-start">
                        <p className="font-bold">{item.title4}</p>
                        {item.items2.map((subItem, index) => (
                          <a key={index} href={subItem.link} className="text-sm">
                            {subItem.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-10">
                  <div className="flex flex-col gap-2 pt-10">
                    <p>ติดต่อข่าวสาร</p>
                    <div className="flex gap-2">
                      <input className="w-40 rounded-md border p-1.5 text-xs" placeholder="Your Email" />
                      <button className="-ml-4 rounded-md bg-yellow-400 p-1.5 text-xs">GO</button>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      <PhoneCall size={16} />
                      <button className="hover:text-slate-500">
                        <Link href="tel:081-234-5678"> 081-234-5678</Link>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <button className="hover:text-slate-500">
                        <Link href="mailto:email@email.com">email@email.com</Link>
                      </button>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col">
                    <p>FOLLOW US</p>
                    <div className="mt-4 flex gap-4">
                      {['/facebook.png', '/line.png', '/twitter.png', '/youtube.png'].map((src, index) => (
                        <button key={index}>
                          <Link href="#">
                            <Image
                              alt={src}
                              src={src}
                              width={24}
                              height={24}
                              style={{ width: 'auto', height: 'auto' }}
                            />
                          </Link>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FooterSection
