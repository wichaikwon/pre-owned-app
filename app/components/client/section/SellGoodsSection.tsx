import Sellgoods from '@/constants/sellGoods'
import Image from 'next/image'
import React, { Fragment } from 'react'

const SellGoodsSection: React.FC = () => {
  return (
    <Fragment>
      <div className=' bg-gradient-to-r from-yellow-400 to-yellow-200'>
        <div className="container mx-auto flex justify-between px-4 md:px-20">
          <div className="flex w-full justify-center">
            {Sellgoods.map((name, i) => (
              <div key={i} className="flex flex-col items-center justify-center gap-4 py-10">
                <p className="flex flex-1 justify-center text-2xl font-bold">{name.name} </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {name.details.map((item, idx) => (
                    <div key={idx} className="flex justify-center gap-4">
                      <div className="flex w-24 items-center justify-center">
                        <Image alt={item.image} src={item.image} width={100} height={100} style={{width:"auto",height:"auto"}} className="rounded-full" />
                      </div>
                      <div className="flex w-full flex-col justify-center">
                        <p className="text-sm font-bold">{item.header} </p>
                        <p className="text-xs">{item.description} </p>
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

export default SellGoodsSection
