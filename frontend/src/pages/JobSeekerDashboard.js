import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./JobSeekerDashboard.css";
import API_BASE_URL from "../config";

function JobSeekerDashboard() {
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [applications, setApplications] = useState([]);

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  /* ================= FETCH JOBS ================= */
  const fetchJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/jobs`);
      setJobs(res.data || []);
      if (res.data?.length > 0) {
        setSelectedJob(res.data[0]);
      }
    } catch (err) {
      console.error("Jobs Error:", err.response?.data || err.message);
    }
  }, []);

  /* ================= FETCH APPLICATIONS ================= */
  const fetchMyApplications = useCallback(async () => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/applications/my-applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data || []);
    } catch (err) {
      console.error("Applications Error:", err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, [fetchJobs, fetchMyApplications]);

  /* ================= APPLY ================= */
  const submitApplication = async () => {
    if (!selectedJob) return;

    try {
      await axios.post(
        `${API_BASE_URL}/api/applications/${selectedJob._id}`,
        { coverLetter },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Application submitted successfully!");
      setShowApplicationForm(false);
      setCoverLetter("");
      fetchMyApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Error applying to job");
    }
  };

  /* ================= FILTER ================= */
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = job.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const locationMatch = job.location
      ?.toLowerCase()
      .includes(location.toLowerCase());

    return titleMatch && locationMatch;
  });

  const getApplicationForJob = (jobId) => {
    return applications.find((app) => app.job?._id === jobId);
  };

  return (
    <div className="seeker-dashboard">
      {/* SEARCH BAR */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Job title or keyword"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={() => {}}>Find Jobs</button>
      </div>

      <div className="dashboard-body">
        {/* LEFT JOB LIST */}
        <div className="job-list">
          <h4>Jobs for you</h4>

          {filteredJobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className={`job-card ${
                  selectedJob?._id === job._id ? "active-job" : ""
                }`}
                onClick={() => {
                  setSelectedJob(job);
                  setShowApplicationForm(false);
                }}
              >
                <h5>{job.title}</h5>
                <p className="company">{job.company}</p>
                <p className="location">{job.location}</p>

                {job.salary && (
                  <p className="salary">₹{job.salary}</p>
                )}

                <p>
                  <strong>Status:</strong> {job.jobStatus}
                </p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT JOB DETAILS */}
        <div className="job-details">
          {selectedJob ? (
            <>
              <h3>{selectedJob.title}</h3>
              <p className="company">{selectedJob.company}</p>
              <p className="location">{selectedJob.location}</p>

              {selectedJob.salary && (
                <p className="salary">
                  ₹{selectedJob.salary} per year
                </p>
              )}

              {(() => {
                const existingApplication = getApplicationForJob(
                  selectedJob._id
                );

                const isClosed = selectedJob.jobStatus === "closed";

                if (existingApplication) {
                  return (
                    <>
                      <button className="apply-btn" disabled>
                        Applied
                      </button>
                      <p>
                        <strong>Application Status:</strong>{" "}
                        {existingApplication.status}
                      </p>
                    </>
                  );
                }

                if (isClosed) {
                  return (
                    <button className="apply-btn" disabled>
                      Job Closed
                    </button>
                  );
                }

                return (
                  <>
                    {!showApplicationForm ? (
                      <button
                        className="apply-btn"
                        onClick={() => setShowApplicationForm(true)}
                      >
                        Apply Now
                      </button>
                    ) : (
                      <div className="card-box mt-3">
                        <h5>Application Form</h5>

                        <textarea
                          placeholder="Write your cover letter..."
                          value={coverLetter}
                          onChange={(e) =>
                            setCoverLetter(e.target.value)
                          }
                          className="form-control mb-3"
                          rows="4"
                        />

                        <button
                          className="btn btn-primary me-2"
                          onClick={submitApplication}
                        >
                          Submit Application
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() =>
                            setShowApplicationForm(false)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}

              <hr />
              <h5>Job Description</h5>
              <p>{selectedJob.description}</p>
            </>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDashboard;