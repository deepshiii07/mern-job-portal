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
      console.error("Fetch Jobs Error:", err.response?.data || err.message);
    }
  }, []);

  /* ================= FETCH MY APPLICATIONS ================= */
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
      console.error(
        "Fetch Applications Error:",
        err.response?.data || err.message
      );
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

  const getApplicationForJob = (jobId) =>
    applications.find((app) => app.job?._id === jobId);

  return (
    <div className="seeker-dashboard">
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
      </div>

      <div className="dashboard-body">
        <div className="job-list">
          <h4>Jobs for you</h4>

          {filteredJobs.length === 0 && <p>No jobs available</p>}

          {filteredJobs.map((job) => (
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
              <p>{job.company}</p>
              <p>{job.location}</p>
            </div>
          ))}
        </div>

        <div className="job-details">
          {selectedJob ? (
            <>
              <h3>{selectedJob.title}</h3>
              <p>{selectedJob.company}</p>
              <p>{selectedJob.location}</p>

              {(() => {
                const existingApplication = getApplicationForJob(
                  selectedJob._id
                );

                if (existingApplication) {
                  return (
                    <>
                      <button disabled>Applied</button>
                      <p>Status: {existingApplication.status}</p>
                    </>
                  );
                }

                return (
                  <>
                    {!showApplicationForm ? (
                      <button onClick={() => setShowApplicationForm(true)}>
                        Apply Now
                      </button>
                    ) : (
                      <>
                        <textarea
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                        <button onClick={submitApplication}>
                          Submit
                        </button>
                      </>
                    )}
                  </>
                );
               })()}
            </>
          ) : (
            <p>Select a job</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSeekerDashboard;