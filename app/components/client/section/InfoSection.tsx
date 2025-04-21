import React, { Fragment } from 'react'
import info from '@/constants/info'
import Image from 'next/image'
const InfoSection: React.FC = () => {
  return (
    <Fragment>
      <div className="container mx-auto flex justify-between px-4 md:px-20">
      <div className="flex w-full justify-between">
        {info.map((item, idx) => (
          <div key={idx} className="my-10 flex flex-col items-center gap-4 lg:mt-32 lg:mb-16">
            <p className="w-80 text-center text-2xl md:w-full">{item.name}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {item.details.map((detail, i) => (
                <div className="flex flex-col gap-2 justify-center" key={i}>
                  <div className="flex justify-center items-center">
                    <Image
                      alt={detail.image}
                      width={80}
                      height={80}
                      src={detail.image}
                      style={{ width: '80px', height: '80px' }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <p className="rounded-full bg-yellow-400 px-2.5 text-xl text-white">{i + 1}</p>
                    <p className="text-xl font-bold">{detail.header}</p>
                  </div>
                  <p>{detail.description} </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </Fragment>
  )
}

export default InfoSection
