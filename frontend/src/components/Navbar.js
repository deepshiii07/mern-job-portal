import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleProfile = () => {
    if (role === "employer") {
      navigate("/employer-profile");
    } else if (role === "jobseeker") {
      navigate("/seeker-profile");
    }
  };

  const handleHome = () => {
    if (role === "employer") {
      navigate("/employer");
    } else if (role === "jobseeker") {
      navigate("/jobseeker");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CareerConnect
        </Link>

        <div className="d-flex align-items-center">
          {token ? (
            <>
              {/* HOME ICON BUTTON */}
              <button
                onClick={handleHome}
                className="btn btn-light btn-sm me-3 home-btn"
                title="Dashboard"
              >
                🏠
              </button>

              <button
                onClick={handleProfile}
                className="btn btn-light btn-sm me-3"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="btn btn-danger btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-light btn-sm me-3">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;