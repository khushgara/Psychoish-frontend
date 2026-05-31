import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Consultation.css";

const Consultation = () => {
  const { axiosInstance, user } = useContext(AuthContext);
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    consultation_type: "",
    description: "",
  });

  const fetchBookings = React.useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/consultations/my-bookings");
      setBookings(response.data.bookings || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
    fetchBookings();
  }, [user, fetchBookings]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axiosInstance.post("/api/consultations/book", formData);
      alert(response.data.message);
      setShowForm(false);
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        consultation_type: "",
        description: "",
      });
      fetchBookings();
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert(error.response?.data?.message || "Failed to book consultation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      confirmed: "#10b981",
      completed: "#6b7280",
      cancelled: "#ef4444",
    };
    return colors[status] || "#6b7280";
  };

  return (
    <div className="consultation-page">
      <div className="consultation-container">
        <div className="consultation-header">
          <h1>Professional Consultations</h1>
          <p>Book a session with licensed mental health professionals</p>
          {!showForm && (
            <button className="book-btn" onClick={() => setShowForm(true)} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "18px", height: "18px" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book New Consultation
            </button>
          )}
        </div>

        {showForm && (
          <div className="booking-form-section">
            <div className="form-header">
              <h2>Book a Consultation</h2>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label>Consultation Type *</label>
                <select
                  name="consultation_type"
                  value={formData.consultation_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select consultation type</option>
                  <option value="therapy">Individual Therapy</option>
                  <option value="counseling">Counseling Session</option>
                  <option value="assessment-review">Assessment Review</option>
                  <option value="crisis-support">Crisis Support</option>
                  <option value="group-therapy">Group Therapy</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional Information</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your concerns or what you'd like to discuss..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Booking..." : "Book Consultation"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bookings-section">
          <h2>Your Consultations</h2>
          
          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "48px", height: "48px", color: "var(--text-secondary)" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>No consultations yet</h3>
              <p>Book your first consultation to get started</p>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.consultation_type}</h3>
                    <span
                      className="status-badge"
                      style={{ background: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <div className="detail-item">
                      <span className="detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span>{booking.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span>{booking.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <span>{booking.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: "16px", height: "16px" }}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <span>{new Date(booking.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {booking.description && (
                    <div className="booking-notes">
                      <strong>Notes:</strong> {booking.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultation;
