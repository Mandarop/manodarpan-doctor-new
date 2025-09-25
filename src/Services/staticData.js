// Static data service to replace Firebase
export const staticData = {
  // Sample doctor data
  doctor: {
    id: 'demo-doctor-001',
    fullName: 'Dr. Sarah Johnson',
    email: 'dr.sarah@manodarpan.com',
    location: 'Mumbai, Maharashtra',
    qualification: 'MD Psychiatry, MBBS',
    type: 'Psychiatrist',
    availability: {
      'Monday': [
        { time: '09:00 - 09:30', limit: 1, booked: 0 },
        { time: '10:00 - 10:30', limit: 1, booked: 0 },
        { time: '14:00 - 14:30', limit: 1, booked: 1 },
        { time: '15:00 - 15:30', limit: 1, booked: 0 }
      ],
      'Tuesday': [
        { time: '09:00 - 09:30', limit: 1, booked: 0 },
        { time: '10:00 - 10:30', limit: 1, booked: 0 },
        { time: '11:00 - 11:30', limit: 1, booked: 0 },
        { time: '14:00 - 14:30', limit: 1, booked: 0 },
        { time: '15:00 - 15:30', limit: 1, booked: 1 }
      ],
      'Wednesday': [
        { time: '09:00 - 09:30', limit: 1, booked: 0 },
        { time: '10:00 - 10:30', limit: 1, booked: 1 },
        { time: '11:00 - 11:30', limit: 1, booked: 0 },
        { time: '14:00 - 14:30', limit: 1, booked: 0 }
      ],
      'Thursday': [
        { time: '09:00 - 09:30', limit: 1, booked: 0 },
        { time: '10:00 - 10:30', limit: 1, booked: 0 },
        { time: '11:00 - 11:30', limit: 1, booked: 0 },
        { time: '14:00 - 14:30', limit: 1, booked: 0 }
      ],
      'Friday': [
        { time: '09:00 - 09:30', limit: 1, booked: 0 },
        { time: '10:00 - 10:30', limit: 1, booked: 0 },
        { time: '11:00 - 11:30', limit: 1, booked: 1 },
        { time: '14:00 - 14:30', limit: 1, booked: 0 },
        { time: '15:00 - 15:30', limit: 1, booked: 0 }
      ]
    }
  },

  // Sample patients data
  patients: [
    {
      id: 'patient-001',
      patientId: 'patient-001',
      patientName: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      date: '2024-01-15',
      slot: '09:00 - 09:30',
      slotTime: '09:00 AM',
      slotDuration: '30 minutes',
      timestamp: new Date('2024-01-15T09:00:00'),
      phone: '+91 98765 43210',
      age: 28,
      gender: 'Male',
      concerns: 'Anxiety and stress management',
      status: 'completed',
      progress: [
        { week: 1, anxiety: 12, depression: 8, date: '2024-01-01' },
        { week: 2, anxiety: 10, depression: 6, date: '2024-01-08' },
        { week: 4, anxiety: 8, depression: 5, date: '2024-01-22' }
      ]
    },
    {
      id: 'patient-002',
      patientId: 'patient-002',
      patientName: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      date: '2024-01-16',
      slot: '10:00 - 10:30',
      slotTime: '10:00 AM',
      slotDuration: '30 minutes',
      timestamp: new Date('2024-01-16T10:00:00'),
      phone: '+91 98765 43211',
      age: 32,
      gender: 'Female',
      concerns: 'Depression and mood disorders',
      status: 'in-progress',
      progress: [
        { week: 1, anxiety: 18, depression: 14, date: '2024-01-01' },
        { week: 2, anxiety: 16, depression: 12, date: '2024-01-08' },
        { week: 4, anxiety: 14, depression: 10, date: '2024-01-22' }
      ]
    },
    {
      id: 'patient-003',
      patientId: 'patient-003',
      patientName: 'Amit Patel',
      email: 'amit.patel@email.com',
      date: '2024-01-17',
      slot: '14:00 - 14:30',
      slotTime: '02:00 PM',
      slotDuration: '30 minutes',
      timestamp: new Date('2024-01-17T14:00:00'),
      phone: '+91 98765 43212',
      age: 25,
      gender: 'Male',
      concerns: 'Sleep disorders and insomnia',
      status: 'scheduled',
      progress: [
        { week: 1, anxiety: 6, depression: 7, date: '2024-01-01' },
        { week: 2, anxiety: 5, depression: 6, date: '2024-01-08' },
        { week: 4, anxiety: 4, depression: 5, date: '2024-01-22' }
      ]
    },
    {
      id: 'patient-004',
      patientId: 'patient-004',
      patientName: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      date: '2024-01-18',
      slot: '09:30 - 10:00',
      slotTime: '09:30 AM',
      slotDuration: '30 minutes',
      timestamp: new Date('2024-01-18T09:30:00'),
      phone: '+91 98765 43213',
      age: 29,
      gender: 'Female',
      concerns: 'Work-related stress and burnout',
      status: 'completed',
      progress: [
        { week: 1, anxiety: 11, depression: 9, date: '2024-01-01' },
        { week: 2, anxiety: 9, depression: 7, date: '2024-01-08' },
        { week: 4, anxiety: 7, depression: 5, date: '2024-01-22' }
      ]
    }
  ],

  // Sample report data
  reports: {
    'patient-001': {
      anxiety_level: 'Moderate',
      anxiety_score: 12,
      depression_level: 'Mild',
      depression_score: 8,
      start_date: '2024-01-01',
      end_date: '2024-01-15',
      anxiety_occurrences: {
        'Symptom 9': ['2024-01-02', '2024-01-03', '2024-01-05', '2024-01-07', '2024-01-09', '2024-01-11', '2024-01-13'],
        'Symptom 10': ['2024-01-01', '2024-01-04', '2024-01-06', '2024-01-08', '2024-01-10', '2024-01-12', '2024-01-14'],
        'Symptom 11': ['2024-01-02', '2024-01-05', '2024-01-08', '2024-01-11', '2024-01-14']
      },
      depression_occurrences: {
        'Symptom 1': ['2024-01-01', '2024-01-03', '2024-01-06', '2024-01-09', '2024-01-12'],
        'Symptom 2': ['2024-01-02', '2024-01-05', '2024-01-08', '2024-01-11', '2024-01-14'],
        'Symptom 4': ['2024-01-01', '2024-01-04', '2024-01-07', '2024-01-10', '2024-01-13']
      }
    },
    'patient-002': {
      anxiety_level: 'Severe',
      anxiety_score: 18,
      depression_level: 'Moderate',
      depression_score: 14,
      start_date: '2024-01-01',
      end_date: '2024-01-16',
      anxiety_occurrences: {
        'Symptom 9': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15'],
        'Symptom 10': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15'],
        'Symptom 11': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14', '2024-01-15']
      },
      depression_occurrences: {
        'Symptom 1': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14'],
        'Symptom 2': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14'],
        'Symptom 4': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12', '2024-01-13', '2024-01-14']
      }
    },
    'patient-003': {
      anxiety_level: 'Mild',
      anxiety_score: 6,
      depression_level: 'Mild',
      depression_score: 7,
      start_date: '2024-01-01',
      end_date: '2024-01-17',
      anxiety_occurrences: {
        'Symptom 9': ['2024-01-03', '2024-01-06', '2024-01-09', '2024-01-12'],
        'Symptom 10': ['2024-01-01', '2024-01-05', '2024-01-10', '2024-01-15']
      },
      depression_occurrences: {
        'Symptom 1': ['2024-01-02', '2024-01-08', '2024-01-14'],
        'Symptom 4': ['2024-01-01', '2024-01-07', '2024-01-13']
      }
    },
    'patient-004': {
      anxiety_level: 'Moderate',
      anxiety_score: 11,
      depression_level: 'Mild',
      depression_score: 9,
      start_date: '2024-01-01',
      end_date: '2024-01-18',
      anxiety_occurrences: {
        'Symptom 9': ['2024-01-02', '2024-01-04', '2024-01-06', '2024-01-08', '2024-01-10', '2024-01-12', '2024-01-14', '2024-01-16'],
        'Symptom 10': ['2024-01-01', '2024-01-03', '2024-01-05', '2024-01-07', '2024-01-09', '2024-01-11', '2024-01-13', '2024-01-15'],
        'Symptom 11': ['2024-01-02', '2024-01-05', '2024-01-08', '2024-01-11', '2024-01-14', '2024-01-17']
      },
      depression_occurrences: {
        'Symptom 1': ['2024-01-01', '2024-01-04', '2024-01-07', '2024-01-10', '2024-01-13', '2024-01-16'],
        'Symptom 2': ['2024-01-02', '2024-01-05', '2024-01-08', '2024-01-11', '2024-01-14', '2024-01-17'],
        'Symptom 4': ['2024-01-01', '2024-01-03', '2024-01-06', '2024-01-09', '2024-01-12', '2024-01-15']
      }
    }
  }
};

// Helper functions to simulate API calls
export const getDoctorData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticData.doctor), 500);
  });
};

export const getPatients = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(staticData.patients), 500);
  });
};

export const getPatientById = (id) => {
  return new Promise((resolve) => {
    const patient = staticData.patients.find(p => p.id === id);
    setTimeout(() => resolve(patient || null), 300);
  });
};

export const getReportByPatientId = (patientId) => {
  return new Promise((resolve) => {
    const report = staticData.reports[patientId];
    setTimeout(() => resolve(report || null), 300);
  });
};
