import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./img/logo.svg";
import GymNavbar from "./GymNavbar";

export default function GymLogin(props) {
  useEffect(()=>{
    const gymtoken = localStorage.getItem('token');
    if (gymtoken) {
      localStorage.removeItem('token');
      alert('Please Login Again To Continue')
    }
  }, []);

  const [credentials, setCredentials] = useState({ gymemail: "", gympassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/gym/gymlogin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.jwtdata);
        console.log('token');
        navigate("/gym/GymDashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <GymNavbar />
      <div
        className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient"
        width="100%"
        style={{ borderRadius: "10px" }}
      >
        <div className="container">
        <h1
          className="display-5 fw-semibold text-center"
          style={{ color: "#ff1100" }}
        >
          Login Form
        </h1>
        <form className="mx-auto pb-3" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="gymemail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="gymemail"
              name="gymemail"
              value={credentials.gymemail}
              onChange={onChange}
              placeholder="Enter Email Address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gympassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="gympassword"
              name="gympassword"
              value={credentials.gympassword}
              onChange={onChange}
              placeholder="Enter Password"
            />
          </div>
            <div className=" mt-5 d-grid gap-2">
              <button
                type="submit"
                className="btn btn-outline-light fw-bold"
                style={{ textDecoration: "none", color: "#ff1100" }}
              >
                Login
              </button>
            </div>
            <div className="text-center mt-2">
            <p>
              New to Website? Please Visit{" "}
              <Link
                style={{ textDecoration: "none", color: "#ff1100" }}
                to="../gym/gymsignup"
              >
                Sign-Up Page
              </Link>
            </p>
          </div>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center my-2 mb-2">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  );
}
