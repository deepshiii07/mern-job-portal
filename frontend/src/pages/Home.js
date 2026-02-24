import React from "react";
import "../App.css";
import API_BASE_URL from "../config";

function Home() {
  return (
    <div className="hero-section">
      <div className="overlay">
        <h1 className="hero-title">
          Search, Apply and Create jobs for millions of people to see and connect!
        </h1>

        <div className="hero-buttons">
          <button className="hero-btn">Search Jobs</button>
          <button className="hero-btn">Create Jobs</button>
          <button className="hero-btn">Connect</button>
        </div>
      </div>
    </div>
  );
}

export default Home;