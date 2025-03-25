'use client'
import Faq from '@/constants/faq'
import { ChevronDown } from 'lucide-react'
import React, { Fragment, useState } from 'react'

const FaqSection: React.FC = () => {
  const [openModal, setOpenModal] = useState<{ id: number; open: boolean }[]>([])

  const toggleModal = (id: number) => {
    const index = openModal.findIndex((item) => item.id === id)
    if (index === -1) {
      setOpenModal([...openModal, { id, open: true }])
    } else {
      const copy = [...openModal]
      copy[index].open = !copy[index].open
      setOpenModal(copy)
    }
  }
  return (
    <Fragment>
      <div className='bg-gray-50'>
        <div className="container mx-auto flex justify-between px-4 md:px-20">
          <div className="flex w-full justify-between">
            {Faq.map((name, i) => (
              <div key={i} className="flex flex-col gap-4 py-10 md:py-20">
                <p className="flex justify-center text-2xl font-bold">{name.name}</p>
                <div className="flex flex-col gap-4">
                  {name.details.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2" onClick={() => toggleModal(idx)}>
                      <div className="flex items-center justify-between border-b border-slate-400">
                        <button className="w-11/12 text-left font-bold">{item.header}</button>
                        <ChevronDown />
                      </div>
                      <div
                        className={`transition-max-height w-11/12 overflow-hidden duration-500 ease-in-out ${
                          openModal.find((modal) => modal.id === idx)?.open ? 'max-h-96' : 'max-h-0'
                        }`}>
                        <p className="text-left text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default FaqSection
