import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../Services/firebaseConfig';
import './RegisterDoctor.css';

function RegisterDoctor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    location: '',
    qualification: '',
    type: '',
  });

  const [selectedDays, setSelectedDays] = useState([]);
  const [timeRanges, setTimeRanges] = useState({});
  const [slotDuration, setSlotDuration] = useState(15);
  const [maxPatients, setMaxPatients] = useState(1);

  const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
      const updated = { ...timeRanges };
      delete updated[day];
      setTimeRanges(updated);
    } else {
      setSelectedDays([...selectedDays, day]);
      setTimeRanges({ ...timeRanges, [day]: [{ start: '', end: '' }] });
    }
  };

  const handleTimeChange = (day, index, field, value) => {
    const updated = { ...timeRanges };
    updated[day][index][field] = value;
    setTimeRanges(updated);
  };

  const addTimeRange = (day) => {
    const updated = { ...timeRanges };
    updated[day].push({ start: '', end: '' });
    setTimeRanges(updated);
  };

  const generateSlots = (start, end, duration, limit) => {
    const slots = [];
    const toMinutes = (timeStr) => {
      const [hour, minute] = timeStr.split(':').map(Number);
      return hour * 60 + minute;
    };
    const toTimeStr = (mins) => {
      const h = Math.floor(mins / 60).toString().padStart(2, '0');
      const m = (mins % 60).toString().padStart(2, '0');
      return `${h}:${m}`;
    };
    const startMin = toMinutes(start);
    const endMin = toMinutes(end);
    for (let t = startMin; t < endMin; t += duration) {
      const slotStart = toTimeStr(t);
      const slotEnd = toTimeStr(Math.min(t + duration, endMin));
      slots.push({ time: `${slotStart} - ${slotEnd}`, limit: limit, booked: 0 });
    }
    return slots;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);

      // Build availability object
      const availability = {};
      selectedDays.forEach(day => {
        availability[day] = [];
        timeRanges[day].forEach(range => {
          if (range.start && range.end) {
            const slots = generateSlots(range.start, range.end, parseInt(slotDuration), parseInt(maxPatients));
            availability[day] = [...availability[day], ...slots];
          }
        });
      });

      await setDoc(doc(db, 'doctors', userCredential.user.uid), {
        uid: userCredential.user.uid,
        fullName: form.fullName,
        email: form.email.toLowerCase(),
        location: form.location,
        qualification: form.qualification,
        type: form.type,
        availability: availability,
      });

      alert('Doctor registered successfully!');
      navigate('/Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register Doctor</h2>

        {/* Basic Info */}
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
        <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Clinic Location" required />
        <input type="text" name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" required />

        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Psychologist">Psychologist</option>
          <option value="Psychiatrist">Psychiatrist</option>
          <option value="Therapist">Therapist</option>
          <option value="Counselor">Counselor</option>
        </select>

        {/* Clinic Days with inline time ranges */}
        <div className="days-section">
          <label><strong>Select Clinic Days & Time Ranges:</strong></label>
          <div className="days-checkboxes">
            {daysOfWeek.map(day => (
              <div key={day} className="day-row">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayToggle(day)}
                  />
                  {day}
                </label>

                {/* Inline time ranges for this day */}
                {selectedDays.includes(day) && (
                  <div className="inline-time-box">
                    {timeRanges[day].map((range, idx) => (
                      <div key={idx} className="time-range-inline">
                        <input
                          type="time"
                          value={range.start}
                          onChange={(e) => handleTimeChange(day, idx, 'start', e.target.value)}
                          required
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={range.end}
                          onChange={(e) => handleTimeChange(day, idx, 'end', e.target.value)}
                          required
                        />
                      </div>
                    ))}
                    <button type="button" className="add-range-btn" onClick={() => addTimeRange(day)}>+ Add Range</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Global Slot Duration and Patient Limit */}
        {selectedDays.length > 0 && (
          <div className="slot-settings">
            <label>Slot Duration:</label>
            <select value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)}>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={60}>60 min</option>
            </select>

            <label>Max Patients per Slot:</label>
            <input
              type="number"
              min="1"
              value={maxPatients}
              onChange={(e) => setMaxPatients(e.target.value)}
            />
          </div>
        )}

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default RegisterDoctor;
