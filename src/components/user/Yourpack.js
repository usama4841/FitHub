import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";

export default function Yourpack() {
  // State variables for package details, loading state, and error message
  const [packageDetails, setPackageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch package details from the server
    async function fetchData() {
      try {
        // Check if authentication token is available
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        // Fetch package details from the server
        const response = await fetch(
          "http://localhost:5000/api/purchase/userPackageDetails",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );

        // Check if response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        // Parse response JSON
        const json = await response.json();
        
        // Set package details state
        setPackageDetails(json);
        setLoading(false); // Set loading state to false
      } catch (error) {
        // Handle errors
        console.error("Error fetching package details:", error);
        setError("Failed to fetch package details. Please try again.");
        setLoading(false); // Set loading state to false
      }
    }

    // Call fetchData function when component mounts
    fetchData();
  }, []);

  return (
    <div>
      <UserNav />
      <div className="container">
        <h1
          className="text-center my-3"
          style={{
            fontSize: "3.0rem",
            color: "#ff1100",
            fontFamily: "initial",
            fontWeight: "",
          }}
        >
          Your Packages
        </h1>
        {/* Conditional rendering based on loading and error states */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <h4 className="text-light text-center">{error}</h4>
        ) : (
          <div className="row">
            {/* Map over package details and render each detail as a card */}
            {packageDetails.map((packageDetail, index) => (
              <div
                key={index}
                className="col-md-6 mb-4"
                style={{ minHeight: "20vh" }}
              >
                <div
                  className="card card-expand-lg text-light"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid white",
                  }}
                >
                  <div className="card-body" style={{ minHeight: "80vh" }}>
                    <img
                      src="https://i.shgcdn.com/d61f124a-5eb2-41c7-abd1-ace0dd6f7d97/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                      className="card-img-top"
                      alt="..."
                      style={{
                        height: "200px",
                        width: "100%",
                        overflow: "hidden",
                        borderRadius: "4px",
                      }}
                    />
                    <h3
                      className="card-title text-center"
                      style={{
                        color: "#ff1100",
                        fontFamily: "initial",
                        fontSize: "2.0 rem",
                      }}
                    >
                      {packageDetail.packageTitle}
                    </h3>
                    <h6 className="card-text my-3">
                      {packageDetail.packageDescription}
                    </h6>
                    <h6 className="card-text mb-1">
                      <span style={{ color: "#ff1100" }}>Amount Paid :</span>{" "}
                      {packageDetail.packageAmount}
                    </h6>
                    <h6 className="card-text mb-1">
                      <span style={{ color: "#ff1100" }}>Gym Name :</span>{" "}
                      {packageDetail.gymname}
                    </h6>
                    <h6 className="card-text  mb-1">
                      <span style={{ color: "#ff1100" }}>City :</span>{" "}
                      {packageDetail.gymcity}
                    </h6>
                    <h6 className="card-text mb-1">
                      <span style={{ color: "#ff1100" }}>Email Address :</span>{" "}
                      {packageDetail.gymEmail}
                    </h6>
                    <h6 className="card-text mb-1">
                      <span style={{ color: "#ff1100" }}>Contact No:</span>{" "}
                      {packageDetail.gymPhone}
                    </h6>
                    <h6 className="card-text mb-1">
                      <span style={{ color: "#ff1100" }}>Purchase Date :</span>{" "}
                      {packageDetail.purchaseDate}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
