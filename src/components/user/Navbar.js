import React from "react";
import logo from "./img/logo.svg";
import { Link } from "react-router-dom";
import '../css/Navbar.css'

export default function Navbar() { 
  return (
    <nav
      className="navbar navbar-expand-lg bg-dark navbar-dark"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <Link className="navbar-brand col-lg-4 me-0 px-3" to="/">
          <img srcSet={logo} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <ul className="navbar-nav col-lg justify-content-lg-end">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
