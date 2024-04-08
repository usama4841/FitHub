import React, { useState } from "react";
import logo from "./img/logo.svg";
import { Link } from "react-router-dom";
import GymNavbar from "./GymNavbar";

export default function GymSignup(props) {
  const [showModal, setShowModal] = useState(false);
  const [credentials, setCredentials] = useState({
    gymname: "",
    gymemail:  "",
    gympassword: "",
    gymphone: "",
    ownername: "",
    gymaddress: "",
    zipcode: "",
    gymcity: "",
    gymstate: ""
  });

  const handleSubmit = async (e) => {
    const { gymname, gymemail, gympassword,gymphone,ownername, gymaddress,zipcode,gymcity,gymstate} = credentials;
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/gym/creategym", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
        },
        
        body: JSON.stringify({gymname,gymemail,gympassword,gymphone,ownername,gymaddress,zipcode,gymcity,gymstate}),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.jwtdata);
        setShowModal(true);
      } else {
        // Handle registration failure
        alert(json.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleModalDismiss = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div
    className={` text-${
      props.mode === "light" ? "dark" : "light"
    }`}>



      <GymNavbar />
      <div
        className="container text-light px-5 pt-5 pb-2 mx-auto .bg-dark.bg-gradient"
        width="100%"
        style={{ borderRadius: "10px" }}
      >
        <h1
          className="display-5 fw-semibold text-center"
          style={{ color: "#ff1100" }}
        >
          Gym Registration Form
        </h1>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label for="gymname" className="form-label">
              Gym Name
            </label>
            <input
              type="text"
              className="form-control"
              id="gymname"
              name="gymname"
              value={credentials.name}
              onChange={onChange}
              placeholder="enter your gym name"
            />
          </div>
          <div className="col-md-6">
            <label for="gymemail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="gymemail"
              name="gymemail"
              value={credentials.email}
              onChange={onChange}
              placeholder="enter your email"
            />
          </div>
          <div className="col-md-6">
            <label for="ownerename" className="form-label">
              Owner Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ownername"
              name="ownername"
              value={credentials.jownername}
              onChange={onChange}
              placeholder="enter owner name"
            />
          </div>
          <div className="col-md-6">
            <label for="gymphone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="gymphone"
              name="gymphone"
              value={credentials.jnumber}
              onChange={onChange}
              placeholder="enter your mobile number"
            />
          </div>
          <div className="col-md-6">
            <label for="gympassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="gympassword"
              name="gympassword"
              value={credentials.jpassword}
              onChange={onChange}
              placeholder="enter Password"
            />
          </div>
          <div className="col-md-10">
            <label for="gymaddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="gymaddress"
              name="gymaddress"
              value={credentials.address}
              onChange={onChange}
              placeholder="enter your address"
            />
          </div>
          <div className="col-md-2">
            <label for="zipcode" className="form-label">
              Zip Code
            </label>
            <input
              type="number"
              className="form-control"
              id="zipcode"
              name="zipcode"
              value={credentials.jzipcode}
              onChange={onChange}
              placeholder="enter zip code"
            />
          </div>
          <div className="col-md-6">
            <label for="gymcity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="gymcity"
              name="gymcity"
              value={credentials.city}
              onChange={onChange}
              placeholder="enter city name"
            />
          </div>
          <div className="col-md-6">
            <label for="gymState" className="form-label">
              State
            </label>
            <select
              class="form-select col-md-4"
              aria-label="Small select example"
              value={credentials.state}
              onChange={onChange}
              id="gymstate"
              name="gymstate"
            >
              <option>Select State</option>
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
          <div className=" mt-5 d-grid gap-2">
            <button type="submit" className="btn btn-outline-light fw-bold"style={{ textDecoration: "none", color: "#ff1100" }} >
             
                Sign Up
             
            </button>
          </div>
          <div className="text-center">
            <p>
              Already Have An Account? Please Visit{" "}
              <Link
                style={{ textDecoration: "none", color: "#ff1100" }}
                to="../gym/gymlogin"
              >
                Login Page
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-center my-2 mb-5">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
      {showModal && (
        <div
          className="modal text-dark"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Successfully Registered</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalDismiss}
                />
              </div>
              <div className="text-center">
            <p>
              Please Visit{" "}{" "}
              <Link
                style={{ textDecoration: "none", color: "#ff1100" }}
                to="../gym/gymlogin"
              >
                Login Page
              </Link>{" "}{" "}
              To Continue
            </p>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
