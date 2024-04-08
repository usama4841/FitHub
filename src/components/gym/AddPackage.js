import GymNav from './GymNav';
import logo from './img/logo.svg';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPackage(props) {
  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    amount: "",
    image: null
  });
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, amount, image } = credentials;
  
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("amount", amount);
      formData.append("image", image);
  
      const response = await fetch("http://localhost:5000/api/package/createpackage", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token")
        },
        body: formData,
      });
  
      if (response.ok) {
        setShowModal(true);
      } else {
        const json = await response.json();
        if (json && json.errors) {
          alert(json.errors[0].msg);
        } else {
          alert("Insert failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChange = (e) => {
    if (e.target.type === "file") {
      setCredentials({ ...credentials, image: e.target.files[0] });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const handleDismiss = () => {
    setShowModal(false);
    navigate("/gym/totalpackages"); // Redirect to totalpackages
  };

  return (
    <div className={`text-${props.mode === "light" ? "dark" : "light"}`}>
      <GymNav />
      <div className="container text-light my-5 px-5 pt-3 pb-2 mx-auto bg-dark" style={{ borderRadius: "10px" }}>
        <h1 className="display-5 fw-semibold text-center" style={{ color: "#ff1100" }}>
          Add Package
        </h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          {/* Add form fields for title, description, amount, and image */}
          <div className="col-md-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={credentials.title}
              onChange={onChange}
              placeholder="Enter package title"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={credentials.description}
              onChange={onChange}
              placeholder="Enter package description"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={credentials.amount}
              onChange={onChange}
              placeholder="Enter package price"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              accept="image/*"
              onChange={onChange}
            />
          </div>
          <div className="mt-5 d-grid gap-2">
            <button className="btn btn-outline-light fw-bold" style={{ textDecoration: "none", color: "#ff1100" }}>
              Add Package
            </button>
          </div>
        </form>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal fade show" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" aria-label="Close" onClick={handleDismiss}></button>
              </div>
              <div className="modal-body">
                <h4 className='text-dark'>Your package has been added successfully.</h4>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  )
}
