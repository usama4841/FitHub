import React from 'react'
import AdminNav from './AdminNav'
import Top from "./contact/Top";
import Middle from "./contact/Middle";
import Map from "./contact/Map";
import CFooter from "./contact/CFooter";

export default function AdminContact() {
  return (
    <div>
      <AdminNav/>
      <Top/>
      <Middle/>
      <Map/>
      <CFooter/>
    </div>
  )
}
