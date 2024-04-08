import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import GymNav from './GymNav';
import logo from './img/logo.svg';

export default function AddTrainer() {
  const [credentials, setCredentials] = useState({
    trainername: "",
    trainernumber:  "",
    traineraddress: "",
    traineremail:"",
    clients:""
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/trainer/addtrainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      if (response.ok) {
        setShowModal(true);
      } else {
        if (json && json.error) {
          alert(json.error);
        } else {
          alert("Insert failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/gym/GymDashboard"); // Redirect to dashboard after closing modal
  };

  return (
    <div>
      <GymNav />
      <div className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient" width="100%" style={{ borderRadius: "10px" }}>
        <h1 className="display-5 fw-semibold text-center" style={{ color: "#ff1100" }}>Trainer Registration</h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label for="trainername" className="form-label">Trainer Name</label>
            <input
              type="text"
              className="form-control"
              id="trainername"
              name="trainername"
              value={credentials.trainername}
              onChange={handleChange}
              placeholder="Enter trainer name"
            />
          </div>
          <div className="col-md-6">
            <label for="traineremail" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="traineremail"
              name="traineremail"
              value={credentials.traineremail}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>
          <div className="col-md-6">
            <label for="trainernumber" className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="trainernumber"
              name="trainernumber"
              value={credentials.trainernumber}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          <div className="col-md-10">
            <label for="traineraddress" className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="traineraddress"
              name="traineraddress"
              value={credentials.traineraddress}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>
          <div className="col-md-2">
            <label for="clients" className="form-label">Number of Clients</label>
            <input
              type="number"
              className="form-control"
              id="clients"
              name="clients"
              value={credentials.clients}
              onChange={handleChange}
            />
          </div>
          <div className=" mt-5 d-grid gap-2">
            <button className="btn btn-outline-light fw-bold" style={{ textDecoration: "none", color: "#ff1100" }}>Add Trainer</button>
          </div>
        </form>
      </div>
      <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Trainer Added Successfully</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
            </div>
            {/* Additional modal content if needed */}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc
</p>
      </div>
    </div>
  )
}
