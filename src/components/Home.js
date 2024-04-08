import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Types from "./Types";
import Front from "./Front";
import About from "./About";
import { Routes, Route } from "react-router-dom";

export default function Home() {
  useEffect(()=>{
    const authtoken = localStorage.getItem('authtoken');
    if (authtoken) {
      localStorage.removeItem('authtoken');
      alert('Please Login Again To Continue')
    }
  }, []);

  return (
    <div className="Home">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<div className="main">
            <Front />
            <Types />
          </div>}/>
        <Route exact path="/about" element={<About/>}/>
      </Routes>
      <Footer />
    </div>
  );
}
