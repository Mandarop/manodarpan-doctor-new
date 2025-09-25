import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctorData } from "../../Services/staticData";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorData = await getDoctorData();
        setDoctor(doctorData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const getAvailableSlots = () => {
    if (!doctor || !doctor.availability) return [];
    const allSlots = doctor.availability[selectedDay] || [];
    // Limit to only 4-5 slots
    return allSlots.slice(0, 5);
  };

  const getNextAvailableDays = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const today = new Date().getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return days.map(day => {
      const dayIndex = dayNames.indexOf(day);
      const daysUntil = dayIndex > today ? dayIndex - today : (7 - today) + dayIndex;
      const date = new Date();
      date.setDate(date.getDate() + daysUntil);
      
      return {
        name: day,
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        available: doctor?.availability?.[day]?.length > 0
      };
    });
  };

  const formatTime = (timeString) => {
    const [start, end] = timeString.split(' - ');
    return `${start} - ${end}`;
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-container">
      {doctor ? (
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Welcome, {doctor.fullName}</h1>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          <div className="info-card">
            <div className="doctor-profile">
              <div className="profile-avatar">
                <span className="avatar-text">Dr. {doctor.fullName.split(' ')[1]?.charAt(0) || 'D'}</span>
              </div>
              <div className="profile-details">
                <h2 className="profile-name">{doctor.fullName}</h2>
                <p className="profile-qualification">{doctor.qualification}</p>
                <p className="profile-location">📍 {doctor.location}</p>
                <p className="profile-id">ID: {doctor.id}</p>
              </div>
            </div>
          </div>

          {/* Appointment Management Section */}
          <div className="appointment-section">
            <div className="section-header">
              <h2 className="section-title">Appointment Management</h2>
              <div className="day-selector">
                {getNextAvailableDays().map((day) => (
                  <button
                    key={day.name}
                    className={`day-button ${selectedDay === day.name ? 'active' : ''} ${!day.available ? 'unavailable' : ''}`}
                    onClick={() => setSelectedDay(day.name)}
                    disabled={!day.available}
                  >
                    <span className="day-name">{day.name}</span>
                    <span className="day-date">{day.date}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="slots-grid">
              {getAvailableSlots().map((slot, index) => (
                <div key={index} className={`slot-card ${slot.booked >= slot.limit ? 'booked' : 'available'}`}>
                  <div className="slot-time">{formatTime(slot.time)}</div>
                  <div className="slot-status">
                    {slot.booked >= slot.limit ? (
                      <span className="status-badge booked">Booked</span>
                    ) : (
                      <span className="status-badge available">Available</span>
                    )}
                  </div>
                  <div className="slot-duration">30 min</div>
                </div>
              ))}
            </div>
            
            {getAvailableSlots().length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <p>No available slots for {selectedDay}</p>
              </div>
            )}
          </div>

          <div className="about-card">
            <h2>About Manodarpan</h2>
            <p>
              <strong>Manodarpan</strong> is an initiative dedicated to improving mental
              health by connecting individuals with compassionate, verified doctors like you.
            </p>
            <p>
              You play a vital role in diagnosing, treating, and supporting people dealing
              with mental health challenges. Together, we're building a safe, stigma-free
              environment for healing.
            </p>
          </div>
        </div>
      ) : (
        <p className="loading-text">No doctor found for this user.</p>
      )}
    </div>
  );
};

export default DashboardHome;
