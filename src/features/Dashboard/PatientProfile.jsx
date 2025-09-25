import React from 'react';
import { useParams } from 'react-router-dom';

function PatientProfile() {
  const { id } = useParams();

  // Dummy patient detail
  const patient = {
    id,
    name: 'John Doe',
    age: 24,
    email: 'john@example.com',
    reports: [
      { type: 'PHQ-9', score: 15, date: '2025-06-01' },
      { type: 'GAD-7', score: 10, date: '2025-06-01' },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Patient Profile: {patient.name}</h2>
      <p className="mb-1">Age: {patient.age}</p>
      <p className="mb-4">Email: {patient.email}</p>
      <h3 className="text-lg font-semibold mb-2">Assessment Reports</h3>
      <ul>
        {patient.reports.map((report, idx) => (
          <li key={idx} className="border p-2 mb-2">
            <strong>{report.type}</strong>: Score {report.score} on {report.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientProfile;