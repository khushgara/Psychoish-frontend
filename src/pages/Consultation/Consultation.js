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
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("/consultations/my-bookings");
      setBookings(response.data.bookings || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

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
      const response = await axiosInstance.post("/consultations/book", formData);
      alert("✅ " + response.data.message);
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
            <button className="book-btn" onClick={() => setShowForm(true)}>
              📅 Book New Consultation
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
              <div className="empty-icon">📅</div>
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
                      <span className="detail-icon">👤</span>
                      <span>{booking.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📧</span>
                      <span>{booking.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📞</span>
                      <span>{booking.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
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
