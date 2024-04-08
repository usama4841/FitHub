import React from "react";
import GymNav from "./GymNav";
import Top from "./contact/Top";
import Middle from "./contact/Middle";
import Map from "./contact/Map";
import CFooter from "./contact/CFooter";

export default function GymContact() {
  return (
    <div>
      <GymNav />
      <Top/>
      <Middle/>
      <Map/>
      <CFooter/>
    </div>
  );
}
