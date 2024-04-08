import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
function Dietplans() {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    async function fetchDiets() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/diets/fetchDiets"
        ); // Corrected endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch diet plans");
        }
        const data = await response.json();
        setDiets(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDiets();
  }, []);

  return (
    <>
      <UserNav />
      <div className="container text-light mt-3">
        <h2
          className="display-4 fw-bold text-center"
          style={{ color: "#ff1100" }}
        >
          Diet Plans
        </h2>
        <div>
          {diets.map((diet, index) => (
            <div className="card my-5 mx-auto workoutcard" style={{"width": "70vw"}} key={index}>
              <div className="card-body">
                <h3 className="card-title fw-bold mb-4" style={{ color: "#ff1100" }}><u>{diet.title}</u></h3>
                <p className="card-text "><span className="fw-bold"  style={{ color: "#ff1100" }}>Diet Description :</span> {diet.description}</p>  
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Profile : </span> {diet.profile}</p>
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Ingredients: </span> {diet.ingredients}</p>
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Directions :</span> {diet.directions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dietplans;
