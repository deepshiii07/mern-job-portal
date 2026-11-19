import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="hero-section">
      <section className="overlay">
        <h1 className="hero-title">
          Find the right opportunity. <span>Build what’s next.</span>
        </h1>
        <p className="hero-subtitle">
          A simpler space for job seekers to discover opportunities and for employers
          to connect with people ready to make an impact.
        </p>
        <div className="hero-buttons">
          <button className="hero-btn" onClick={() => navigate("/login")}>Explore jobs</button>
          <button className="hero-btn" onClick={() => navigate("/register")}>Create an account</button>
        </div>
        <div className="hero-proof">
          <span>Discover opportunities</span>
          <span>Track applications</span>
          <span>Connect with employers</span>
        </div>
      </section>
    </main>
  );
}

export default Home;