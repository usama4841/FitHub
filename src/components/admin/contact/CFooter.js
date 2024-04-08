import React from "react";
import logo from "./img/logo.svg";
import facebook from "./img/facebook.svg";
import instagram from "./img/instagram.svg";
import twitter from "./img/twitterx.svg";
import { Link } from "react-router-dom";

export default function CFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="container">
      <footer className="pt-5">
        <div className="row d-flex justify-content-between">
          <div className="col-md-5 offset-md-1 mb-3">
            <h2 className="text-center" style={{color:"#ff1100"}}>Useful Links</h2>
            <ul className="nav flex-column text-center">
              <li className="nav-item mb-2">
                <Link to="/admin/dashboard" className="nav-link p-0 text-light">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/contact" className="nav-link p-0 text-light" onClick={scrollToTop}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/admin/about" className="nav-link p-0 text-light">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-5 offset-md-1 mb-3">
            <h2 className="text-center" style={{color:"#ff1100"}}>Social Media</h2>
            <ul className="nav col-12 mt-4 justify-content-center list-unstyled d-flex">
              <li className="ms-3">
                <Link to="https://facebook.com/" target="_blank">
                  <img
                    className="bi"
                    width="50"
                    height="50"
                    src={facebook}
                    alt=""
                  />
                </Link>
              </li>
              <li className="ms-3">
                <Link to="https://instagram.com/" target="_blank">
                  <img
                    className="bi"
                    width="50"
                    height="50"
                    src={instagram}
                    alt=""
                  />
                </Link>
              </li>
              <li className="ms-3">
                <Link to="https://twitter.com/" target="_blank">
                  <img
                    className="bi"
                    width="50"
                    height="50"
                    src={twitter}
                    alt=""
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <div className="col-md-6 mt-4 d-flex justify-content-center">
            <Link
              to="/"
              className=" text-body-secondary text-decoration-none lh-1"
            >
              <img src={logo} alt="" srcSet="" />
            </Link>
          </div>
          <h6 className="col-md-6 mt-4 my-auto text-light text-center">
              © 2024 FitHub, Inc
            </h6>
        </div>
      </footer>
    </div>
  );
}