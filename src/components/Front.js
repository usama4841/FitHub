import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import fitness from "../img/fitness1.png";
import treadmill from "../img/treadmill.png";
import running from "../img/running.png";
import { Link } from 'react-router-dom';

export default function Front() {
  return (
    <div className="carousel position-relative overflow-hidden mx-5 px-3 pt-3 pt-md-5 text-center">
        <div className="col-md-6 px-3 p-lg-1 text-start mx-5 my-1">
          <h4 className="text-light px-1">ARE YOU READY TO</h4>
          <h1 className="display-5 fw-bold fw-normal text-muted">
            <span style={{ color: "#ff1100" }}>GET FIT,</span>
            <span className="text-light">
              {" "}
              STRONG <br /> & MOTIVATED!
            </span>
          </h1>
          <br />
          <hr style={{ color: "white" }} />
          <p className="text-light">
            Discover the convenience, efficiency, and effectiveness of
            <span className="h4" style={{ color: "#ff1100" }}>
              {" "}
              FitHub{" "}
            </span>{" "}
            today. Welcome to the future of gym management. Join us in
            revolutionizing the way you run your gym and empowering members to
            achieve their fitness goals.
          </p>
          <br />
        </div>
        <div className="carousel position-relative overflow-hidden pt-md-1 text-center">
        <div className="col-md-6 px-3 p-lg-1 text-start mx-auto my-1">
          <h4 className="text-light px-1">FIND THE BEST</h4>
          <h3 className="display-5 fw-bold fw-normal text-muted">
            <span style={{ color: "#ff1100" }}>TRAINING CENTER</span><br/>
            <span className="text-light">
              {" "}
              NEAR YOU.
            </span>
          </h3>
          <br />
          <div className="d-flex justify-content-center">
            <div className="col-md-3 px-1 p-lg-2">
              <img src={fitness} alt="" srcSet="" />
            </div>
            <div className="col-md-3 px-1 p-lg-2">
              <img src={treadmill} alt="" srcSet="" />
            </div>
            <div className="col-md-3 px-1 p-lg-2">
              <img src={running} alt="" srcSet="" />
            </div>
          </div>
          <hr style={{ "color": "white" }} />
          <div className="text-center text-white">
            <h4>
              <Link
                style={{ textDecoration: "none", color: "#ff1100" }}
                to="../about"
              >
                <span className='text-white'> Click Here To Learn More About Our Website</span>{" "}Fithub
              </Link>
            </h4>
          </div>
          <br />
        </div>
      </div>
      </div>
      
  )
}
