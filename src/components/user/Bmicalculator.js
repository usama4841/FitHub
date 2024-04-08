import React, { useState } from "react";
import UserNav from "./UserNav";
import logo from './img/logo.svg'

export default function Bmicalculator() {
  const [heightValue, setHeightValue] = useState("");
  const [weightValue, setWeightValue] = useState("");
  const [bmiValue, setBmiValue] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");

  const calculate = (event) => {
    event.preventDefault();

    if (heightValue && weightValue) {
      const heightInMeters = heightValue / 100;
      const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
      setBmiValue(bmi);

      let message = "";
      if (bmi < 18.5) {
        message = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        message = "Healthy";
      } else if (bmi >= 25 && bmi < 30) {
        message = "Overweight";
      } else {
        message = "Obese";
      }
      setBmiMessage(message);
    } else {
      setBmiValue("");
      setBmiMessage("");
    }
  };
  return (
    <>
      <UserNav />
      <div
        className=" container my-4 mx-auto text-light"
        style={{ width: "55vw" }}
      >
        <h2
          className="display-5 mb-3 fw-semibold text-center"
          style={{ color: "#ff1100" }}
        >
          Body Mass Index Calculator
        </h2>
        <form className="row g-3" onSubmit={(e) => calculate(e)}>
          <div className="col-md-12">
            <label for="inputage" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="inputage"
              placeholder="Please Enter Your Age"
              required
            />
          </div>
          <div className="col-md-6">
            <label for="inputweight" className="form-label">
              Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="inputweight"
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              placeholder="Please Enter Weight In Kg"
              required
            />
          </div>
          <div className="col-md-6">
            <label for="inputheight" className="form-label">
              Height
            </label>
            <input
              type="number"
              className="form-control"
              id="inputheight"
              value={heightValue}
              onChange={(e) => setHeightValue(e.target.value)}
              placeholder="Please Enter Height In Cm"
              required
            />
          </div>
          <div className=" mt-4 d-grid gap-2">
            <button
              type="submit"
              id="Calculate"
              className="btn btn-outline-light fw-bold"
              style={{ textDecoration: "none", color: "#ff1100" }}
            >
              Calculate
            </button>
          </div>
          <div className="result mt-5 d-grid gap-2">
            <button
              disabled
              className="btn btn-outline-light fw-bold"
              style={{ textDecoration: "none", color: "#ff1100" }}
            >
              Your BMI: <span className="bmi-value text-light">{bmiValue}</span>
            </button>
            <button
              disabled
              className="btn btn-outline-light fw-bold"
              style={{ textDecoration: "none", color: "#ff1100" }}
            >
              Result:{" "}
              <span className="bmi-message text-light">{bmiMessage}</span>
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center my-2">
        <img className="mx-4" src={logo} alt="" width="72" height="30" />
        <p className="mx-4 my-auto text-light h6">© 2024 FitHub, Inc</p>
      </div>
      </div>
    </>
  );
}
