import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setMenuOpen(false);
    navigate("/");
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate(role === "employer" ? "/employer-profile" : "/seeker-profile");
  };

  const handleHome = () => {
    setMenuOpen(false);
    navigate(role === "employer" ? "/employer" : "/jobseeker");
  };

  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${isHome ? "cc-navbar-home" : ""}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => setMenuOpen(false)}>CareerConnect<span className="cc-brand-period">.</span></Link>
        <button className="navbar-toggler cc-nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <div className={`cc-nav-content ${menuOpen ? "cc-nav-open" : ""}`}>
          {token ? (
            <div className="cc-nav-actions">
              <button onClick={handleHome} className="cc-nav-link">Dashboard</button>
              <button onClick={handleProfile} className="cc-nav-link">My profile</button>
              <button onClick={handleLogout} className="cc-nav-login">Logout</button>
            </div>
          ) : (
            <div className="cc-nav-actions">
              <Link to="/login" className="cc-nav-link" onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="cc-nav-register" onClick={() => setMenuOpen(false)}>Create account <span>↗</span></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
