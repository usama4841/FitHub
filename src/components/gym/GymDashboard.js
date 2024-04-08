import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import GymNav from "./GymNav";

export default function GymDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [totalTrainers, setTotalTrainers] = useState(0); 
  const [totalpackages, settotalpackages] = useState(0);
  const [totalmembers, setTotalmembers] = useState(0);

  const fetchTotalTrainers = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/trainer/fetchtrainers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      setTotalTrainers(data.length); // Set total number of trainers based on fetched data
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  }, [token]);

  const fetchtotalpackages = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/package/fetchpackages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      settotalpackages(data.length); // Set total number of trainers based on fetched data
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  }, [token]);

  const fetchTotalmembers = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/purchase/packagesByGym",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      setTotalmembers(data.length);
      console.log(data);
    } catch (error) {
      console.error("Error fetching trainers:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
        navigate("/");
    } else {
        fetchTotalTrainers();
        fetchtotalpackages();
        fetchTotalmembers();
    }
}, [token, navigate, fetchTotalTrainers, fetchtotalpackages, fetchTotalmembers]);


  return (
    <div>
      <GymNav />
      <div className="container mt-5">
        <h1 className="text-center" style={{ color: "#ff1100" }}>
          Gym Dashboard
        </h1>
        <div class="row row-cols-1 row-cols-md-3 my-5 text-center">
          <div class="col">
            <div class="card  text-bg-secondary mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h3 class="my-0 fw-normal">Total Trainers</h3>
              </div>
              <div class="card-body">
                <h1 class="card-title text-dark pricing-card-title mt-3">
                  {totalTrainers}
                </h1>
                <Link className="dropdown-item" to="/gym/totaltrainers">
                <button
                    type="button"
                    class="w-100 btn btn-lg"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Trainers
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-caret-right mt-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  text-bg-secondary mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h3 class="my-0 fw-normal">Total Packages</h3>
              </div>
              <div class="card-body">
                <h1 class="card-title text-dark pricing-card-title mt-3">
                  {totalpackages}
                </h1>
                <Link className="dropdown-item" to="/gym/totalpackages">
                <button
                    type="button"
                    class="w-100 btn btn-lg"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Packages
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-caret-right mt-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card  text-bg-secondary mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3">
                <h3 class="my-0 fw-normal">Total Members</h3>
              </div>
              <div class="card-body">
                <h1 class="card-title text-dark pricing-card-title mt-3">
                  {totalmembers}
                </h1>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/gym/totalmembers"
                >
                  <button
                    type="button"
                    class="w-100 btn btn-lg"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Members
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-caret-right mt-0"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
