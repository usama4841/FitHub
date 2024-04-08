import React from "react";
import { Link } from "react-router-dom";
import facebook from "./img/facebook.svg";
import twitter from "./img/twitterx.svg";
import instagram from "./img/instagram.svg";

export default function Middle() {
  return (
    <>
      <div id="middle">
        <div id="first">
          <p
            className="text-decoration-underline fs-4"
            style={{ color: "black" }}
          >
            Head Office
          </p>
          <p className="fs-6">
            915,914, Golden Square,
            <br /> ABC circle, Bharuch - 392001,
            <br /> Gujarat, India
          </p>
          <br />
          <p
            className="text-decoration-underline fs-4"
            style={{ color: "black" }}
          >
            Branch
          </p>
          <p className="fs-6">
            M.K.Institute Of Computer Of Studies,
            <br /> College Campus, Old N.H. No. 8, Bharuch,
            <br /> Gujarat, India
          </p>
          <br />
          <p
            className="text-decoration-underline fs-4"
            style={{ color: "black" }}
          >
            Social Media
          </p>
          <ul className="nav col-12 mt-4 justify-content-center list-unstyled d-flex">
            <li className="ms-3">
              <Link to="https://facebook.com/" target="_blank">
                <img
                  className="bi"
                  width="40"
                  height="40"
                  src={facebook}
                  alt=""
                />
              </Link>
            </li>
            <li className="ms-3">
              <Link to="https://instagram.com/" target="_blank">
                <img
                  className="bi"
                  width="40"
                  height="40"
                  src={instagram}
                  alt=""
                />
              </Link>
            </li>
            <li className="ms-3">
              <Link to="https://twitter.com/" target="_blank">
                <img
                  className="bi"
                  width="40"
                  height="40"
                  src={twitter}
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </div>
        <div id="sec">
          <p className="text-decoration-underline fs-4">Connect with us</p>
          <div id="form" className="container">
          <form className="row g-3">
              <div className="col-md-12">
                <input
                  style={{ backgroundColor: "transparent"  }}
                  type="text"
                  className="contactform form-control"
                  id="cname"
                  placeholder="Name"
                />
              </div>
              <div className="col-md-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="email"
                  className="contactform form-control"
                  id="cemailaddress"
                  placeholder="Email Address"
                />
              </div>
              <div className="col-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  className="contactform form-control"
                  id="ccontact"
                  placeholder="Contact No"
                />
              </div>
              <div className="col-12">
                <input
                  style={{ backgroundColor: "transparent" }}
                  type="text"
                  className="contactform form-control"
                  id="cdesc"
                  placeholder="Description"
                />
              </div>
              <div className=" mt-5 d-grid gap-2">
            <button
              className="btn btn-outline-light fw-bold fs-5"
              style={{ textDecoration: "none", color: "#ff1100", borderRadius:"25px" }}
            >
              Submit
            </button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
