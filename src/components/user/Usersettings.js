import React, { useState } from "react";
import UserNav from "./UserNav";
import logo from "./img/logo.svg";

export default function Usersettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!password || !newPassword || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/updatepassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("usertoken"),
          },
          body: JSON.stringify({ password, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to change password");
      } else {
        setSuccessMessage(data.message);
        setShowModal(true);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to change password");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <UserNav />
      <div
        className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient"
        style={{ borderRadius: "10px" }}
      >
        <div className="container">
          <p
            className="display-5 fw-semibold text-center"
            style={{ color: "#ff1100" }}
          >
            Change Password
          </p>
          <form
            className="mx-auto pb-3"
            style={{ maxWidth: "500px" }}
            onSubmit={handleChangePassword}
          >
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Current Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="npassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="npassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className=" mt-5 d-grid gap-2">
              <button
                className="btn btn-outline-light fw-bold"
                style={{ textDecoration: "none", color: "#ff1100" }}
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
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
              <h5 className="text-success">{successMessage}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-3 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
    </div>
  );
}
