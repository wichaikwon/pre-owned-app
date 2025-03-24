'use client'
import { useResult } from '@/contexts/useResult'
import Image from 'next/image'
import React, { Fragment } from 'react'
import SellGoodsSection from '../components/client/section/SellGoodsSection'
import FaqSection from '../components/client/section/FaqSection'
import FooterSection from '../components/client/section/FooterSection'

const Buy: React.FC = () => {
  const { result, choiceName, phoneData } = useResult()

  if (!result) return <div>Loading...</div>
  return (
    <Fragment>
      <div className="bg-slate-200">
        <div className="container mx-auto flex justify-between gap-4 p-4 px-4 md:px-20">
          <div className="flex w-80 flex-col gap-2 rounded-md bg-white">
            <div className="flex gap-4 px-2 py-4">
              <Image
                src="https://placehold.co/32x32/green/white"
                alt="32x32"
                width={32}
                height={32}
                style={{ width: 'auto', height: 'auto', borderRadius: '50%' }}
              />
              <div className="flex flex-col">
                <span className="flex flex-1 justify-center">รายการซื้อ</span>
                <span className="flex flex-1">{phoneData}</span>
              </div>
            </div>
            <span className="px-2">{choiceName.join(' /')}</span>
            <hr className="my-4 border border-slate-200" />
            <p className="flex flex-1 justify-end gap-2 px-2 pb-2">
              ยอดรวมสุทธิ :<span className="text-red-500">{result.toLocaleString()}</span>
              บาท
            </p>
          </div>
          <div className="flex flex-1 flex-col bg-white px-2 py-4">
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3">สถานที่รับซื้อ</span>
              <div className="col-span-9 flex flex-1 justify-center gap-2">
                <button className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-300 p-2 text-white">
                  รับซื้อถึงบ้าน
                </button>
                <button className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-300 p-2 text-white">
                  รับซื้อตามสถานที่
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Buy
