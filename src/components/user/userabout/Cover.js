import React from "react";
import "../../../App.css";

export default function Cover() {
  return (
    <>
      <div id="cover" className=" d-flex w-100 mx-auto flex-column"></div>
      <main className=" my-5 px-5 py-5 text-light text-center">
        <h1>
          <span style={{ color: "#ff1100" }}>OUR STORY </span>
        </h1>
        <p className="lead my-5 px-5">
          FitHub Is A Platform that helps users and gyms to connect with
          each-other(FItHub is like an intermediator between user & gym). it
          provides gym owners a platform to add lucratcive offers for their gyms
          which can easily reach to users from the same city. it also provides a
          gym additional features to manage their trainers and members. From the
          user side, this site provides them easy way to reach gym virtually and
          easily purchase gym packages(Offers). it also provides user additional
          features like BMI calculator, different kind of exercises and diets.
        </p>
        <div className="pb-5"></div>
      </main>
    </>
  );
}
