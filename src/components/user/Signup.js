import React, { useState } from "react";
import logo from "./img/logo.svg";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    address: "",
    city: "",
    state: ""
  });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    const {
      name,
      email,
      phone,
      password,
      age,
      address,
      city,
      state,
    } = formData;
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            age,
            address,
            city,
            state,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("token", data.jwtdata);
        setShowModal(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page
  };

  return (
    <div>
      <Navbar />
      <div
        className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient"
        width="100%"
        style={{ borderRadius: "10px" }}
      >
        <h1
          className="display-5 fw-semibold text-center"
          style={{ color: "#ff1100" }}
        >
          Registration Form
        </h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="enter your name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="enter your email"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="enter your mobile number"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="enter Password"
              required
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              value={formData.age}
              onChange={onChange}
              placeholder="enter Your Age"
              required
            />
          </div>
          <div className="col-md-10">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={onChange}
              placeholder="enter your address"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={onChange}
              placeholder="enter city name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-select col-md-4"
              aria-label="Small select example"
              id="state"
              name="state"
              value={formData.state}
              onChange={onChange}
              required
            >
             <option>Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option on value="Assam Dispur">Assam Dispur</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarhr">Chhattisgarhr</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra & Nagar Haveli and Daman & Diu">
                Dadra & Nagar Haveli and Daman & Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="jharkhand">Jharkhand</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jammu">Jammu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Taamil Nadu">Tamil Nadu</option>
              <option value="Telengana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className=" mt-5 d-grid gap-2">
            <button
              /*type="submit"*/ className="btn btn-outline-light fw-bold"
              style={{ textDecoration: "none", color: "#ff1100" }}
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <p>
              Already Have An Account? Please Visit{" "}
              <Link
                style={{ textDecoration: "none", color: "#ff1100" }}
                to="../user/login"
              >
                Login Page
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none'}} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body text-center">
              <h5 className='text-success'>Successfully Registered</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" srcSet={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  );
}
