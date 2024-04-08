import React from "react";
import logo from "../img/logo.svg";
import facebook from "../img/facebook.svg";
import instagram from "../img/instagram.svg";
import twitter from "../img/twitterx.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <img src={logo} alt="" srcSet="" />
          </Link>
          <span className=" h6 mb-3 mb-md-0 text-light">
            © 2024 FitHub, Inc
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
            <Link to="https://facebook.com/" target="_blank">
              <img className="bi" width="40" height="40" src={facebook} alt=""/>
            </Link>
          </li>
          <li className="ms-3">
            <Link to="https://instagram.com/" target="_blank">
              <img className="bi" width="40" height="40" src={instagram} alt=""/>
            </Link>
          </li>
          <li className="ms-3">
            <Link to="https://twitter.com/" target="_blank">
              <img className="bi" width="40" height="40" src={twitter} alt=""/>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
