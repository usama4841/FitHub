import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPackagesByUserLocation();
  }, []);

  const fetchPackagesByUserLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/package/packagesByUserLocation",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const handlePurchase = async (packageId) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/purchase/purchase",
        { packageId }, // Send packageId in the request body
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response)
      setShowModal(true);
      setModalMessage("Successfully Purchased");
    } catch (error) {
      console.error("Error purchasing:", error);
  
      setShowModal(true);
      setModalMessage("Please Try Again Later");
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <h6
        className="text-center mt-3 mb-5"
        style={{
          fontSize: "2.5rem",
          color: "#ff1100",
          fontFamily: "initial",
          fontWeight: "",
        }}
      >
        Best Offers On The Gym Memberships In
        <span className="text-white"> Your Nearest Gyms</span>
      </h6>
      {packages.map((singlePackage) => (
        <div
          key={singlePackage._id}
          className="card card-expand-lg text-light col-md-6"
          style={{
            backgroundColor: "transparent",
            border: "1px solid transparent",
            paddingTop: "15px",
          }}
        >
          <img
            src={`http://localhost:3000/${singlePackage.image.replace(/\\/g, "/")}`}
            className="card-img-top"
            alt="Package"
            style={{
              height: "225px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />

          <div className="card-body" style={{ minHeight: "250px" }}>
            <h3
              className="card-title text-center"
              style={{
                color: "#ff1100",
                fontFamily: "initial",
                fontSize: "2.0 rem",
              }}
            >
              {singlePackage.title}
            </h3>
            <h6 className="card-text my-3">
              <span style={{ color: "#ff1100" }}>Description :</span>{" "}
              {singlePackage.description}
            </h6>
            <h6 className="card-text">
              <span style={{ color: "#ff1100" }}>Amount :</span>{" "}
              {singlePackage.amount}
            </h6>
            <h6 className="card-text text-end my-0">
              <span style={{ color: "#ff1100" }}>Gym Name :</span>{" "}
              {singlePackage.gymname}
            </h6>
            <h6 className="card-text text-end  mb-4">
              <span style={{ color: "#ff1100" }}>City :</span>{" "}
              {singlePackage.gymcity}
            </h6>
            <div className=" d-grid gap-1 my-2">
              <button
                id="purchasebtn"
                className="btn btn-light"
                onClick={() =>
                  handlePurchase(singlePackage._id, singlePackage.amount)
                }
              >
                <span style={{ textDecoration: "none", color: "#ff1100" }}>
                  {" "}
                  Get A Membership For{" "}
                </span>
                {singlePackage.amount} /-
              </button>
            </div>
          </div>
        </div>
      ))}
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
              <h5 className="text-success">{modalMessage}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
