import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.svg";
import GymNav from "./GymNav";

export default function GymProfile() {
  const [formData, setFormData] = useState({
    gymname: "",
    gymemail: "",
    gymphone: "",
    ownername: "",
    gymaddress: "",
    zipcode: "",
    gymcity: "",
    gymstate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/gym/getgym", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            gymname: data.gymname,
            gymemail: data.gymemail,
            gymphone: data.gymphone,
            ownername: data.ownername,
            gymaddress: data.gymaddress,
            zipcode: data.zipcode,
            gymcity: data.gymcity,
            gymstate: data.gymstate,
          });
        })
        .catch((error) => {
          console.error("Error fetching gym details:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/gym/updategym", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error updating gym details:", error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("../gym/GymDashboard");
  };

  return (
    <div>
      <GymNav />
      <div className="container text-light px-5 pt-3 pb-2 mx-auto">
        <h1
          className="display-5 fw-semibold text-center"
          style={{ color: "#ff1100" }}
        >
          Update Details
        </h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Input fields */}
          {/* Name */}
          <div className="col-md-6">
            <label htmlFor="gymname" className="form-label">
              Gym Name
            </label>
            <input
              type="text"
              className="form-control"
              id="gymname"
              placeholder="Enter gym name"
              value={formData.gymname}
              onChange={handleChange}
            />
          </div>
          {/* Owner Name */}
          <div className="col-md-6">
            <label htmlFor="ownername" className="form-label">
              Owner Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ownername"
              placeholder="Enter owner name"
              value={formData.ownername}
              onChange={handleChange}
            />
          </div>
          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="gymemail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="gymemail"
              placeholder="Enter email"
              value={formData.gymemail}
              onChange={handleChange}
            />
          </div>
          {/* Phone */}
          <div className="col-md-6">
            <label htmlFor="gymphone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="gymphone"
              placeholder="Enter phone number"
              value={formData.gymphone}
              onChange={handleChange}
            />
          </div>
          {/* Address */}
          <div className="col-8">
            <label htmlFor="gymaddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="gymaddress"
              placeholder="Enter address"
              value={formData.gymaddress}
              onChange={handleChange}
            />
          </div>
          {/* Zipcode */}
          <div className="col-4">
            <label htmlFor="zipcode" className="form-label">
              Zipcode
            </label>
            <input
              type="text"
              className="form-control"
              id="zipcode"
              placeholder="Enter zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
          {/* City */}
          <div className="col-md-6">
            <label htmlFor="gymcity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="gymcity"
              placeholder="Enter city"
              value={formData.gymcity}
              onChange={handleChange}
            />
          </div>
          {/* State */}
          <div className="col-md-6">
            <label htmlFor="gymState" className="form-label">
              State
            </label>
            <select
              className="form-select col-md-4"
              aria-label="Small select example"
              value={formData.gymstate}
              onChange={handleChange}
              id="gymstate"
              name="gymstate"
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam Dispur">Assam Dispur</option>
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
          <div className="mt-5 d-grid gap-2">
            <button
              type="submit"
              className="btn btn-outline-light fw-bold"
              style={{ textDecoration: "none", color: "#ff1100" }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          style={{ display: showModal ? "block" : "none" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <div></div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <h5 className="text-success">Updated Successfully</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
