import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="cc-home">
      <section className="cc-hero">
        <div className="cc-hero-inner">
          <div className="cc-hero-copy">
            <div className="cc-eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Make your next career move <em>count.</em></h1>
            <p className="cc-hero-lede">
              Find opportunities that fit your ambitions, or meet the people
              who can help your business move forward.
            </p>
            <div className="cc-hero-actions">
              <button className="cc-btn cc-btn-primary" onClick={() => navigate("/login")}>Explore opportunities <span>→</span></button>
              <button className="cc-btn cc-btn-secondary" onClick={() => navigate("/register")}>Create an account</button>
            </div>
            <div className="cc-trust-line"><span className="cc-trust-mark">✓</span> A simpler way to connect talent with opportunity</div>
          </div>
          <div className="cc-hero-art" aria-label="Career opportunity dashboard illustration">
            <div className="cc-orbit cc-orbit-one" />
            <div className="cc-orbit cc-orbit-two" />
            <div className="cc-art-card cc-art-main">
              <div className="cc-art-top"><span className="cc-art-dot" /><span className="cc-art-dot" /><span className="cc-art-dot" /><small>CAREER / DASHBOARD</small></div>
              <div className="cc-art-greeting">Your next opportunity<br /><b>is out there.</b></div>
              <div className="cc-art-search"><span>⌕</span> Search roles, skills or companies <b>→</b></div>
              <div className="cc-art-label">FEATURED OPPORTUNITY</div>
              <div className="cc-art-job"><div className="cc-art-company">N</div><div><b>Product Designer</b><small>Northstar Studio · Full time</small></div><span className="cc-art-pill">New</span></div>
              <div className="cc-art-job"><div className="cc-art-company cc-company-alt">A</div><div><b>Frontend Developer</b><small>Atlas Digital · Hybrid</small></div><span className="cc-art-arrow">↗</span></div>
              <div className="cc-art-footer"><span>Discover</span><span>Connect</span><span>Grow</span></div>
            </div>
            <div className="cc-float-note"><span>✦</span><div><b>One step closer</b><small>Your next chapter awaits</small></div></div>
            <div className="cc-float-stamp">CAREER<br />FORWARD</div>
          </div>
        </div>
        <div className="cc-hero-bottom"><span>CAREERCONNECT</span><span>OPPORTUNITY MEETS AMBITION</span><span>01 — 03</span></div>
      </section>

      <section className="cc-intro-section">
        <div className="cc-section-kicker">A BETTER WAY FORWARD</div>
        <div className="cc-intro-grid">
          <h2>Good things happen when the <em>right people</em> connect.</h2>
          <p>CareerConnect brings job seekers and employers together in one straightforward space. Discover roles, share opportunities, and keep every application moving.</p>
        </div>
      </section>

      <section className="cc-feature-section">
        <div className="cc-feature-heading">
          <div><div className="cc-section-kicker">WHAT YOU CAN DO HERE</div><h2>Built for your next move.</h2></div>
          <p>Whether you're looking for your next role or your next great hire, start here.</p>
        </div>
        <div className="cc-feature-grid">
          <article className="cc-feature-card cc-feature-blue"><div className="cc-feature-number">01 / JOB SEEKERS</div><div className="cc-feature-icon">↗</div><h3>Find work that<br />moves you forward.</h3><p>Explore job openings, search by role and location, and apply with your profile and cover letter.</p><button onClick={() => navigate("/login")}>Explore jobs <span>→</span></button></article>
          <article className="cc-feature-card cc-feature-navy"><div className="cc-feature-number">02 / EMPLOYERS</div><div className="cc-feature-icon">✳</div><h3>Meet your next<br />great teammate.</h3><p>Publish opportunities, review applicants, and manage your hiring pipeline in one place.</p><button onClick={() => navigate("/register")}>Find talent <span>→</span></button></article>
          <article className="cc-feature-card cc-feature-light"><div className="cc-feature-number">03 / STAY IN CONTROL</div><div className="cc-feature-icon">◎</div><h3>Keep every step<br />in perspective.</h3><p>Manage your profile, follow application progress, and keep important details together.</p><button onClick={() => navigate("/register")}>Get started <span>→</span></button></article>
        </div>
      </section>

      <section className="cc-cta-section">
        <div><div className="cc-section-kicker">YOUR FUTURE ISN'T ON HOLD</div><h2>Ready to make<br />your next move?</h2></div>
        <div className="cc-cta-action"><p>Create your account and take the first step with CareerConnect.</p><button className="cc-btn cc-btn-white" onClick={() => navigate("/register")}>Get started today <span>→</span></button></div>
      </section>
      <footer className="cc-footer"><div className="cc-footer-brand">Career<span>Connect.</span></div><p>Connecting ambition with opportunity.</p><div className="cc-footer-links"><button onClick={() => navigate("/login")}>Login</button><button onClick={() => navigate("/register")}>Register</button></div><small>© {new Date().getFullYear()} CareerConnect. All rights reserved.</small></footer>
    </main>
  );
}

export default Home;
