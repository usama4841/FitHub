import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totalusers, setTotalUsers] = useState(0);
  const [totalgyms, setTotalGyms] = useState(0);
  const [totalweekusers, setTotalWeekUsers] = useState(0);
  const [totalweekgyms, setTotalWeekGyms] = useState(0);
  const token = localStorage.getItem("token");

  const fetchtotalusers = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/allusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      setTotalUsers(json.length);
      console.log(json.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [token]);

  const fetchtotalgyms = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/gym/allgyms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      setTotalGyms(json.length);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  }, [token]);

  const fetchweekusers = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/usersLast7Days`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const json = await response.json();
      setTotalWeekUsers(json.length);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  }, [token]);

  const fetchweekgyms = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/gym/gymsLast7Days`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );
      const json = await response.json();
      setTotalWeekGyms(json.length);
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchtotalusers();
      fetchtotalgyms();
      fetchweekusers();
      fetchweekgyms();
    }
  }, [
    token,
    navigate,
    fetchtotalgyms,
    fetchtotalusers,
    fetchweekusers,
    fetchweekgyms,
  ]);

  return (
    <div>
      <AdminNav />
      <div className="container text-center mx-auto my-5 py-5">
        <p className="fs-1" style={{ color: "#ff1100" }}>
          Admin DashBoard
        </p>
        <p className="text-white mt-4 fs-5">
          Admin/Owner Of The Site Can Get The Overview Of The Website. Can
          Generate Various Reports Like Users As Well As Gyms & Packages
          Registered B/W Specific Dates. Admin Cn Also Delete User Accounts And
          Gym Accounts If Needed
        </p>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-4 my-5 text-center">
          <div className="col my-2">
            <div className="card text-bg-secondary mb-4 rounded-3 shadow-sm h-100">
              <div
                className="card-header py-3 d-flex align-items-center justify-content-center"
                style={{ height: "130px" }}
              >
                <h3 className="my-0 fw-normal">
                  Total Gyms Registered In Last 7 Days
                </h3>
              </div>
              <div className="card-body">
                <h1 className="card-title text-dark pricing-card-title mt-3">
                  {totalweekgyms}
                </h1>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin/totalgyms"
                >
                  <button
                    type="button"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Gyms
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
          <div className="col my-2">
            <div className="card text-bg-secondary mb-4 rounded-3 shadow-sm h-100">
              <div
                className="card-header py-3 d-flex align-items-center justify-content-center"
                style={{ height: "130px" }}
              >
                <h3 className="my-0 fw-normal">
                  Total Users Registered In Last 7 Days
                </h3>
              </div>
              <div className="card-body">
                <h1 className="card-title text-dark pricing-card-title mt-3">
                  {totalweekusers}
                </h1>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin/totalusers"
                >
                  <button
                    type="button"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Users
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
          <div className="col my-2">
            <div className="card text-bg-secondary mb-4 rounded-3 shadow-sm h-100">
              <div
                className="card-header py-3 d-flex align-items-center justify-content-center"
                style={{ height: "130px" }}
              >
                <h3 className="my-0 fw-normal">Total Registered Users</h3>
              </div>
              <div className="card-body">
                <h1 className="card-title text-dark pricing-card-title mt-3">
                  {totalusers}
                </h1>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin/totalusers"
                >
                  <button
                    type="button"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Users
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
          <div className="col my-2">
            <div className="card text-bg-secondary mb-4 rounded-3 shadow-sm h-100">
              <div
                className="card-header py-3 d-flex align-items-center justify-content-center"
                style={{ height: "130px" }}
              >
                <h3 className="my-0 fw-normal">Total Registered Gyms</h3>
              </div>
              <div className="card-body">
                <h1 className="card-title text-dark pricing-card-title mt-3">
                  {totalgyms}
                </h1>
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/admin/totalgyms"
                >
                  <button
                    type="button"
                    className="btn w-100 btn btn-lg btn-outline-dark fw-bold fs-6 mt-3"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      borderRadius: "10px",
                    }}
                  >
                    More Details About Gyms
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
