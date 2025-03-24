import WhyChooseUs from '@/constants/whyChooseUs'
import Image from 'next/image'
import React, { Fragment } from 'react'

const WhyChooseUsSection: React.FC = () => {
  return (
    <Fragment>
      <div className="container mx-auto flex justify-between px-4 md:px-20">
        <div className="flex w-full justify-between">
          {WhyChooseUs.map((name, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center justify-center gap-4  px-2 pt-10 ">
              <p className="text-2xl font-bold">{name.name} </p>
              <div className="flex w-full flex-col justify-center gap-4 lg:flex-row">
                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {name.details.map((item, idx) => (
                    <div key={idx} className="flex w-full gap-2">
                      <div className="flex w-28 items-center lg:items-start">
                        <Image
                          alt={item.image}
                          src={item.image}
                          width={60}
                          height={60}
                          style={{ width: 'auto', height: 'auto' }}
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <p className="text-xl font-bold"> {item.header}</p>
                        <p>{item.description} </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex w-full items-center justify-center">
                  <Image
                    alt="200x400"
                    width={200}
                    height={400}
                    src="https://placehold.co/200x400/FDC900/white"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}

export default WhyChooseUsSection
