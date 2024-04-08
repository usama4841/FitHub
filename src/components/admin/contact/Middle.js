import React, { useState } from "react";
import axios from "axios";

import facebook from "./img/facebook.svg";
import twitter from "./img/twitterx.svg";
import instagram from "./img/instagram.svg";

export default function Middle() {
  const [message, setMessage] = useState("msg");
  const [formData, setFormData] = useState({
    cname: "",
    cemailaddress: "",
    ccontact: "",
    cdesc: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/connect/createconnect", formData);
      const data = response.data;
      if (data.success) {
        setMessage('We will contact you soon');
        setFormData({
          cname: "",
          cemailaddress: "",
          ccontact: "",
          cdesc: ""
        });
      } else {
        alert("Error Occurred, Please try again later");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div id="middle">
        <div id="first">
          <p className="text-decoration-underline fs-4" style={{ color: "black" }}>Head Office</p>
          <p className="fs-6">
            915,914, Golden Square,
            <br /> ABC circle, Bharuch - 392001,
            <br /> Gujarat, India
          </p>
          <br />
          <p className="text-decoration-underline fs-4" style={{ color: "black" }}>Branch</p>
          <p className="fs-6">
            M.K.Institute Of Computer Of Studies,
            <br /> College Campus, Old N.H. No. 8, Bharuch,
            <br /> Gujarat, India
          </p>
          <br />
          <p className="text-decoration-underline fs-4" style={{ color: "black" }}>Social Media</p>
          <ul className="nav col-12 mt-4 justify-content-center list-unstyled d-flex">
            <li className="ms-3">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                <img className="bi" width="40" height="40" src={facebook} alt="" />
              </a>
            </li>
            <li className="ms-3">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                <img className="bi" width="40" height="40" src={instagram} alt="" />
              </a>
            </li>
            <li className="ms-3">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <img className="bi" width="40" height="40" src={twitter} alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div id="sec">
          <p className="text-decoration-underline fs-4">Connect with us</p>
          <div id="form" className="container">
          <h1 className="text-light">{message}</h1>
            <form className="row g-3">
              <div className="col-md-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  className="contactform form-control"
                  id="cname"
                  name="cname"
                  placeholder="Name"
                  value={formData.cname}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="email"
                  className="contactform form-control"
                  id="cemailaddress"
                  name="cemailaddress"
                  placeholder="Email Address"
                  value={formData.cemailaddress}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  className="contactform form-control"
                  id="ccontact"
                  name="ccontact"
                  placeholder="Contact No"
                  value={formData.ccontact}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  className="contactform form-control"
                  id="cdesc"
                  name="cdesc"
                  placeholder="Description"
                  value={formData.cdesc}
                  onChange={handleChange}
                />
              </div>
              <div id="conbtn" className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-outline-light fw-bold fs-5"
                  style={{ textDecoration: "none", color: "#ff1100", borderRadius: "25px" }}
                  onClick={handleSubmit}
                >
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
