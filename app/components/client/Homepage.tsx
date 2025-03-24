'use client'
import React, { Fragment } from 'react'
import SelectPhoneSection from './section/SelectPhoneSection'
import InfoSection from './section/InfoSection'
import WhyChooseUsSection from './section/WhyChooseUsSection'

const Homepage: React.FC = () => {
  return (
    <Fragment>
      <SelectPhoneSection />
      <InfoSection />
      <WhyChooseUsSection />
    </Fragment>
  )
}

export default Homepage
