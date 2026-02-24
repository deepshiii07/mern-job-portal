import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SeekerProfile.css";

function SeekerProfile() {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/profile",
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="seeker-container">

      {/* HEADER */}
      <div className="seeker-header">
        <div className="avatar-circle">
          {profile.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.location || "Location not added"}</p>
        </div>
      </div>

      {/* RESUME SECTION */}
      <div className="profile-card">
        <h3>Resume</h3>
        {profile.resume ? (
          <div className="resume-box">
            <span>{profile.resume}</span>
          </div>
        ) : (
          <p className="muted-text">No resume uploaded</p>
        )}

        {editMode && (
          <input
            type="text"
            name="resume"
            placeholder="Resume file name (demo)"
            value={profile.resume || ""}
            onChange={handleChange}
          />
        )}
      </div>

      {/* BIO */}
      <div className="profile-card">
        <h3>Bio</h3>
        {editMode ? (
          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            placeholder="Write a short professional bio..."
          />
        ) : (
          <p>{profile.bio || "No bio added yet."}</p>
        )}
      </div>

      {/* EDUCATION */}
      <div className="profile-card">
        <h3>Education</h3>
        {editMode ? (
          <textarea
            name="education"
            value={profile.education || ""}
            onChange={handleChange}
            placeholder="Add your education details..."
          />
        ) : (
          <p>{profile.education || "No education details added."}</p>
        )}
      </div>

      {/* EXPERIENCE */}
      <div className="profile-card">
        <h3>Experience</h3>
        {editMode ? (
          <textarea
            name="experience"
            value={profile.experience || ""}
            onChange={handleChange}
            placeholder="Add your work experience..."
          />
        ) : (
          <p>{profile.experience || "No experience added yet."}</p>
        )}
      </div>

      {/* ACTION BUTTON */}
      <div className="action-section">
        {!editMode ? (
          <button className="primary-btn" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="primary-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

    </div>
  );
}

export default SeekerProfile;