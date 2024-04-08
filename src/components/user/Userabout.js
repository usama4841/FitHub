import React from 'react'
import UserNav from './UserNav'
import Cover from './userabout/Cover'
import Services from './userabout/Services'
import AFooter from './userabout/AFooter'

export default function Userabout() {
  return (
    <div>
      <UserNav/>
      <Cover/>
      <Services/>
      <AFooter/>
    </div>
  )
}
