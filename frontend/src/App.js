import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";

import EmployerProfile from "./pages/EmployerProfile";
import SeekerProfile from "./pages/SeekerProfile";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboards */}
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />

          {/* Profile Pages */}
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/seeker-profile" element={<SeekerProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;