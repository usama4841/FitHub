import React from 'react'
import AdminNav from './AdminNav';
import Cover from './adminabout/Cover'
import Services from './adminabout/Services'
import AFooter from './adminabout/AFooter'

export default function AdminAbout() {
  return (
    <div>
      <AdminNav/>
      <Cover/>
      <Services/>
      <AFooter/>
    </div>
  )
}
