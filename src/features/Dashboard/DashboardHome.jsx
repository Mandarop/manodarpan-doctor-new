import React, { useEffect, useState } from "react";
import { auth, db } from "../../Services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("No user is logged in.");
        setLoading(false);
        return;
      }

      console.log("Logged in user email:", user.email);

      try {
        const doctorsSnapshot = await getDocs(collection(db, "doctors"));
        let matchedDoctor = null;

        doctorsSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email.toLowerCase() === user.email.toLowerCase()) {
            matchedDoctor = { id: doc.id, ...data };
          }
        });

        if (matchedDoctor) {
          setDoctor(matchedDoctor);
        } else {
          console.log("No doctor found with this email.");
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");  // ✅ Redirect to start page with Login & Register options
    } catch (error) {
      console.error("Logout error:", error);
    }
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
            <p><strong>Your ID:</strong> {doctor.id}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <div className="availability-section">
  <p><strong>Clinic Days & Timings:</strong></p>
  {doctor.availability ? (
    <ul className="availability-list">
      {Object.keys(doctor.availability).map((day) => (
        <li key={day}>
          <strong>{day}:</strong>{" "}
          {doctor.availability[day].map((slot, idx) => slot.time).join(", ")}
        </li>
      ))}
    </ul>
  ) : (
    <p>No availability set.</p>
  )}
</div>

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
