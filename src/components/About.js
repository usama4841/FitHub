import React from 'react'
import Navbar from './Navbar'
import Cover from './about/Cover'
import Services from './about/Services'
import AFooter from './about/AFooter'

export default function About() {
  return (
    <div>
      <Navbar/>
      <Cover/>
      <Services/>
      <AFooter/>
    </div>
  )
}
