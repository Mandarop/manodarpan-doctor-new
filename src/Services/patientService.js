export const fetchPatients = () => {
  return [
    { id: '1', name: 'John Doe', age: 24 },
    { id: '2', name: 'Jane Smith', age: 30 },
  ];
};

export const fetchPatientById = (id) => {
  return {
    id,
    name: 'John Doe',
    age: 24,
    email: 'john@example.com',
    reports: [
      { type: 'PHQ-9', score: 15, date: '2025-06-01' },
      { type: 'GAD-7', score: 10, date: '2025-06-01' },
    ],
  };
};