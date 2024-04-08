import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.svg";
import Navbar from "./Navbar";

export default function AdminLogin() {
  useEffect(()=>{
    const authtoken = localStorage.getItem('authtoken');
    if (authtoken) {
      localStorage.removeItem('authtoken');
      alert('Please Login Again To Continue')
    }
  }, []);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/admin/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.jwtdata);
      console.log("token");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
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
            Admin Login
          </h1>
          <form className="mx-auto pb-3" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="enter Email Address"
                autoComplete="off"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter Password"
                autoComplete="off"
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
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" srcSet={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  );
}
