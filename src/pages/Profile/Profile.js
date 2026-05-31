import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, axiosInstance } = useContext(AuthContext);
  
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    bio: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    lastAssessment: null,
  });

  const fetchProfile = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/profile");
      const profileData = response.data.data;
      // Format date for input field (YYYY-MM-DD)
      if (profileData.date_of_birth) {
        profileData.date_of_birth = new Date(profileData.date_of_birth).toISOString().split('T')[0];
      }
      setProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  }, [axiosInstance]);

  const fetchStats = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/assessments/stats");
      setStats(response.data.stats || { totalAssessments: 0, lastAssessment: null });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, [fetchProfile, fetchStats]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await axiosInstance.put("/api/profile", profile);
      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <span>{profile.name?.charAt(0) || user?.name?.charAt(0) || "U"}</span>
          </div>
          <h1>{profile.name || user?.name}</h1>
          <p>{profile.email || user?.email}</p>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "24px", height: "24px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{stats.totalAssessments}</h3>
              <p>Total Assessments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "24px", height: "24px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{stats.lastAssessment ? new Date(stats.lastAssessment).toLocaleDateString() : "N/A"}</h3>
              <p>Last Assessment</p>
            </div>
          </div>
        </div>

        <div className="profile-form-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            {!editing && (
              <button className="edit-btn" onClick={() => setEditing(true)} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!editing}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={profile.date_of_birth || ""}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={profile.gender || ""}
                  onChange={handleChange}
                  disabled={!editing}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio || ""}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Tell us a bit about yourself"
                  rows="4"
                />
              </div>
            </div>

            {editing && (
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditing(false);
                    fetchProfile();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
