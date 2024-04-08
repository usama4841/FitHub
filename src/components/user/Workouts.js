import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
function Workouts() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/exercises/fetchexercises"
        ); // Corrected endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchExercises();
  }, []);

  return (
    <>
      <UserNav />
      <div className="container text-light mt-3">
        <h2
          className="display-4 fw-bold text-center"
          style={{ color: "#ff1100" }}
        >
          Exercises
        </h2>
        <div>
          {exercises.map((exercise, index) => (
            <div className="card my-5 mx-auto workoutcard" style={{"width": "70vw"}} key={index}>
              <div className="card-body">
                <h3 className="card-title fw-bold mb-4" style={{ color: "#ff1100" }}><u>{exercise.name}</u></h3>
                <p className="card-text "><span className="fw-bold"  style={{ color: "#ff1100" }}>Exercise Type :</span> {exercise.type}</p>  
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Target Muscle : </span> {exercise.muscle}</p>
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Equipment Required : </span> {exercise.equipment}</p>
                <p className="card-text"><span className="fw-bold"  style={{ color: "#ff1100" }}>Difficulty Level :</span> {exercise.difficulty}</p>
                <p className="card-text"><span className="fw-bold" style={{ color: "#ff1100" }}> Instructions : </span> {exercise.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Workouts;
