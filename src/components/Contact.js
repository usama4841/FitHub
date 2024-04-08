import React from 'react'
import Navbar from './Navbar'
import Top from './contact/Top'
import Middle from './contact/Middle'
import Map from './contact/Map'
import CFooter from './contact/CFooter'

export default function Contact() {
  return (
    <div>
        <Navbar/>
        <Top/>
        <Middle/>
        <Map/>
        <CFooter/>
    </div>
  )
}
