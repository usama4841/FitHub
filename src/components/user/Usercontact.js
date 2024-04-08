import React from 'react'
import UserNav from './UserNav'
import Top from './contact/Top'
import Middle from './contact/Middle'
import Map from './contact/Map'
import CFooter from './contact/CFooter'

export default function Usercontact() {
  return (
    <div>
        <UserNav/>
        <Top/>
        <Middle/>
        <Map/>
        <CFooter/>
    </div>
  )
}
