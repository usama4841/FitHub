import React from 'react'
import GymNav from './GymNav'
import Cover from './gymabout/Cover'
import Services from './gymabout/Services'
import AFooter from './gymabout/AFooter'

export default function GymAbout() {
  return (
    <div>
        <GymNav/>
        <Cover/>
        <Services/>
        <AFooter/>
    </div>
  )
}
