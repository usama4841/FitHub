import React, { useState, useEffect } from "react";
import logo from "./img/logo.svg";
import person from "./img/person-circle.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../css/Navbar.css'

export default function AdminNav() {
  let navigate = useNavigate();
  let location = useLocation(); // Import and use useLocation hook

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/admin/getadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserName(data.email);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    }
  }, [location]); // Add location to the dependency array

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
        <Link className="navbar-brand col-lg-4 me-0 px-3" to="/admin/dashboard">
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
              <Link
                className="nav-link"
                aria-current="page"
                to="/admin/dashboard"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/admin/totalusers"
              >
                Registered Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                aria-current="page"
                to="/admin/totalgyms"
              >
                Registered Gyms
              </Link>
            </li>
            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/admin/dashboard" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Reports
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/admin/bwusers">User Joined B/W Dates</Link></li>
            <li><Link className="dropdown-item" to="/admin/bwgyms">Gyms Registed B/W Dates</Link></li>
            <li><Link className="dropdown-item" to="/admin/bwpackages">Packages Added B/W Dates</Link></li>
          </ul>
        </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/admin/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/admin/contact">
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
                  src={person}
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
                  <Link className="dropdown-item" to="/admin/adminsettings">
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/"  onClick={handlelogout}>
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
