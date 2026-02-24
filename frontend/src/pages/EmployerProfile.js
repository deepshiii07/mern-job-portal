import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployerProfile.css";
import API_BASE_URL from "../config";

function EmployerProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
  `${API_BASE_URL}/api/profile`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
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
  `${API_BASE_URL}/api/profile`,
  profile,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
      setEditMode(false);
      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await axios.put(
  `${API_BASE_URL}/api/profile/password`,
  passwords,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
      alert("Password updated successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Password update failed");
    }
  };

  if (!profile) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="employer-profile-container">
      <div className="profile-card">

        {/* Company Info Section */}
        <h2>Company Information</h2>

        <div className="profile-group">
          <label>Company Name</label>
          <input
            name="companyName"
            value={profile.companyName || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-group">
          <label>Industry</label>
          <input
            name="industry"
            value={profile.industry || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-group">
          <label>Location</label>
          <input
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-group">
          <label>Website</label>
          <input
            name="website"
            value={profile.website || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="profile-group">
          <label>Description</label>
          <textarea
            name="description"
            value={profile.description || ""}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {!editMode ? (
          <button
            className="primary-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>
        )}

      </div>

      {/* Security Section */}
      <div className="profile-card">
        <h2>Account Security</h2>

        <div className="profile-group">
          <label>Current Password</label>
          <input
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
          />
        </div>

        <div className="profile-group">
          <label>New Password</label>
          <input
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
          />
        </div>

        <button
          className="danger-btn"
          onClick={handlePasswordUpdate}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

export default EmployerProfile;