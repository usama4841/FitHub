import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import strength from "../img/strength.jpg";
import aerobic from "../img/aerobic.png";
import flexibility from "../img/flexibility.png";
import balance from "../img/balance.jpg";

export default function Types() {
  return (
    <>
      <div className="container my-5">
        <h1 className=" display-3 text-light text-center my-5">
          Types Of Fitness Training
        </h1>
        <div className="row featurette my-3">
          <div className="col-md-7 order-md-2">
            <h2
              className="featurette-heading fw-normal lh-2 text-center fw-bold"
              style={{ color: "#ff1100" }}
            >
              STRENGTH TRAINING
            </h2>
            <br />
            <p className="lead text-light">
              <span style={{ color: "#ff1100" }}>
                Strength training (also known as resistance training)
              </span>{" "}
              is a type of exercise that causes your muscles to contract against
              an outside resistance. The outside resistance can be from your
              body weight, weight machines, medicine balls, resistance bands or
              dumbbells.
            </p>
          </div>
          <div className="col-md-5 order-md-1" width="500" height="500">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src={strength}
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            ></img>
          </div>
        </div>
        <hr />
        <div className="row featurette my-3">
          <div className="col-md-7">
            <h2
              className="featurette-heading fw-normal lh-2 text-center fw-bold"
              style={{ color: "#ff1100" }}
            >
              AEROBIC TRAINING
            </h2><br />
            <p className="lead text-light text-justify">
              Aerobic exercise is physical exercise of low to high intensity
              that depends primarily on the aerobic energy-generating process.{" "}
              <span style={{ color: "#ff1100" }}>
                "Aerobic" is defined as "relating to, involving, or requiring
                oxygen",
              </span>{" "}
              and refers to the use of oxygen to meet energy demands during
              exercise via aerobic metabolism adequately.
            </p>
          </div>
          <div className="col-md-5 order-md-1" width="500" height="500">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src={aerobic}
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            ></img>
          </div>
        </div>
        <hr />
        <div className="row featurette my-3">
          <div className="col-md-7 order-md-2">
            <h2
              className="featurette-heading fw-normal lh-2 text-center fw-bold"
              style={{ color: "#ff1100" }}
            >
              FLEXIBILITY
            </h2><br />
            <br />
            <p className="lead text-light">
              <span style={{ color: "#ff1100" }}>
                Flexibility training involves activities that aim to stretch
                your muscles
              </span>{" "}
              until they're loosened up, and your body becomes lithe and limber.
              Furthermore, doing flexibility exercises regularly will provide
              you with more freedom of movement.
            </p>
          </div>
          <div className="col-md-5 order-md-1" width="500" height="500">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src={flexibility}
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            ></img>
          </div>
        </div>
        <hr />
        <div className="row featurette my-3">
          <div className="col-md-7">
            <h2
              className="featurette-heading fw-normal lh-2 text-center fw-bold"
              style={{ color: "#ff1100" }}
            >
              BALANCE
            </h2><br />
            <p className="lead text-light text-justify">
              <span style={{ color: "#ff1100" }}>
                Balance training programs aim to :
              </span>{" "}
              Strengthen balance control in everyday activities leading to
              improved fall-related self-efficacy, reduced fear of falling and
              increased walking speed. Improve physical function. Improve
              quality of life.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <img
              className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src={balance}
              width="500" height="500"
              aria-label="Placeholder: 500x500"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}
