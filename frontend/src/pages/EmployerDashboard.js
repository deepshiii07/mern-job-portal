import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployerDashboard.css";

function EmployerDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("post");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
  });

  const token = localStorage.getItem("token");

  /* ================= FETCH JOBS ================= */
  const fetchJobs = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/jobs/my-jobs",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  /* ================= FETCH APPLICATIONS ================= */
  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/applications/employer",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [fetchJobs, fetchApplications]);

  /* ================= VIEW FULL APPLICATION ================= */
  const viewApplication = async (application) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${application.applicant._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedApplication(application);
      setSelectedProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UPDATE JOB STATUS ================= */
  const updateJobStatus = async (jobId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobs/${jobId}/status`,
        { jobStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UPDATE APPLICATION STATUS ================= */
  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${appId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= POST JOB ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/jobs",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
      });

      setActiveTab("jobs");
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE JOB ================= */
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="employer-dashboard">
      <div className="dashboard-grid">

        {/* LEFT PANEL */}
        <div className="profile-card">
          <h5>Your Company</h5>
          <p>Industry: Technology</p>
          <p>Location: Mumbai</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/employer-profile")}
          >
            View Full Profile
          </button>
        </div>

        {/* CENTER PANEL */}
        <div className="center-content">
          <h2>Employer Dashboard</h2>

          <div className="dashboard-tabs">
            <button onClick={() => setActiveTab("post")}
              className={activeTab === "post" ? "active" : ""}>
              Post Job
            </button>

            <button onClick={() => setActiveTab("jobs")}
              className={activeTab === "jobs" ? "active" : ""}>
              My Jobs
            </button>

            <button onClick={() => setActiveTab("applications")}
              className={activeTab === "applications" ? "active" : ""}>
              Applications
            </button>
          </div>

          {/* ================= POST JOB TAB ================= */}
          {activeTab === "post" && (
            <div className="card-box">
              <h4>Post a New Job</h4>
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Job Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-control mb-3" required />

                <input type="text" placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-control mb-3" required />

                <input type="text" placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="form-control mb-3" required />

                <textarea placeholder="Job Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-control mb-3" rows="4" required />

                <input type="number" placeholder="Salary (Optional)"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="form-control mb-3" />

                <button className="btn btn-primary w-100">Post Job</button>
              </form>
            </div>
          )}

          {/* ================= MY JOBS TAB ================= */}
          {activeTab === "jobs" && (
            <div className="jobs-feed">
              <h4>My Posted Jobs</h4>
              {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
              ) : (
                jobs.map((job) => (
                  <div key={job._id} className="job-card">
                    <h5>{job.title}</h5>
                    <p><strong>Status:</strong> {job.jobStatus}</p>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <select
                        value={job.jobStatus}
                        onChange={(e) => updateJobStatus(job._id, e.target.value)}
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                      >
                        <option value="hiring">Hiring</option>
                        <option value="closing soon">Closing Soon</option>
                        <option value="closed">Closed</option>
                      </select>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================= APPLICATIONS TAB ================= */}
          {activeTab === "applications" && (
            <div className="card-box">
              <h4>Applications</h4>

              {applications.map((app) => (
                <div key={app._id} className="job-card">
                  <p><strong>Applicant:</strong> {app.applicant?.name}</p>
                  <p><strong>Email:</strong> {app.applicant?.email}</p>
                  <p><strong>Job:</strong> {app.job?.title}</p>

                  <button
                    className="btn btn-outline-primary btn-sm mb-2"
                    onClick={() => viewApplication(app)}
                  >
                    View Full Application
                  </button>

                  <select
                    value={app.status}
                    onChange={(e) =>
                      updateApplicationStatus(app._id, e.target.value)
                    }
                    className="form-control"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="side-panel">
          <h6>Stats</h6>
          <p>Jobs Posted: {jobs.length}</p>
          <p>Applications: {applications.length}</p>
        </div>
      </div>

      {/* ================= OVERLAY ================= */}
      {selectedProfile && (
        <div className="application-overlay">
          <div className="application-modal">
            <button
              className="close-btn"
              onClick={() => {
                setSelectedProfile(null);
                setSelectedApplication(null);
              }}
            >
              ✕
            </button>

            <h2>{selectedProfile.name}</h2>
            <p><strong>Email:</strong> {selectedProfile.email}</p>
            <p><strong>Location:</strong> {selectedProfile.location}</p>

            <hr />

            <h4>Bio</h4>
            <p>{selectedProfile.bio || "Not provided"}</p>

            <h4>Education</h4>
            <p>{selectedProfile.education || "Not provided"}</p>

            <h4>Experience</h4>
            <p>{selectedProfile.experience || "Not provided"}</p>

            <h4>Resume</h4>
            <p>{selectedProfile.resume || "No resume uploaded"}</p>

            <h4>Cover Letter</h4>
            <p>{selectedApplication?.coverLetter || "No cover letter"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;