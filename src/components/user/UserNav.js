import React, { useState, useEffect } from "react";
import logo from "./img/logo.svg";
import person from "./img/person-circle.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/Navbar.css'

export default function UserNav() {

  let navigate = useNavigate();
  let location = useLocation(); // Import and use useLocation hook

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/user/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserName(data.name);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    }
  }, [location]);

  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark navbar-dark"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <Link className="navbar-brand col-lg-4 me-0 px-3" to="/user/dashboard">
          <img srcSet={logo} alt=""/>
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
              <Link
                className="nav-link"
                aria-current="page"
                to="/user/dashboard"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/user/exercises"
              >
                Exercises
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/user/dietplans"
              >
                Diet Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/user/Bmicalculator"
              >
                BMI Calculator
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/user/Yourpack"
              >
                Membership Details
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/user/userabout">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/user/usercontact">
                Contact Us
              </Link>
            </li>
            <div className="dropdown my-auto px-3 mx-2">
              <Link
                to="/"
                className="d-flex align-items-center justify-content-center link-light text-decoration-none dropdown-toggle"
                id="dropdownUser3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  srcSet={person}
                  alt="mdo"
                  width="25"
                  height="35"
                  className="rounded-circle"
                />
                {userName && <span className="ms-2">{userName}</span>}
              </Link>
              <ul
                className="dropdown-menu text-medium shadow"
                aria-labelledby="dropdownUser3"
              >
                <li>
                  <Link className="dropdown-item" to="/user/usersettings">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/user/profile">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={handlelogout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
