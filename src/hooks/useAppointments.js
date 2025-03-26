import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchAppointmentsStart,
  fetchAppointmentsSuccess,
  fetchAppointmentsFailure,
  addAppointment,
  updateAppointment,
  cancelAppointment
} from '../store/slices/appointmentSlice';

// Mock data for doctors
const mockDoctors = [
  {
    id: 'd1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.8,
  },
  {
    id: 'd2',
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    profileImage: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 4.9,
  },
  {
    id: 'd3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    profileImage: 'https://randomuser.me/api/portraits/women/63.jpg',
    rating: 4.7,
  },
  {
    id: 'd4',
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    profileImage: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 4.6,
  },
  {
    id: 'd5',
    name: 'Dr. Lisa Thompson',
    specialty: 'Dermatology',
    profileImage: 'https://randomuser.me/api/portraits/women/37.jpg',
    rating: 4.9,
  },
];

// Generate random past date within the last 30 days
const getRandomPastDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString().split('T')[0];
};

// Generate random future date within the next 30 days
const getRandomFutureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);
  return date.toISOString().split('T')[0];
};

// Generate random time
const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
  const minutes = Math.random() > 0.5 ? '00' : '30';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

// Generate mock appointments
const generateMockAppointments = (patientId, count) => {
  const appointments = [];
  const appointmentTypes = ['consultation', 'follow-up', 'check-up', 'emergency'];
  const statuses = ['scheduled', 'completed', 'cancelled', 'no-show'];
  const symptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea', 'Dizziness', 
    'Chest pain', 'Shortness of breath', 'Back pain', 'Joint pain'
  ];

  for (let i = 0; i < count; i++) {
    const isPast = Math.random() > 0.5;
    const doctor = mockDoctors[Math.floor(Math.random() * mockDoctors.length)];
    const type = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
    
    // Past appointments can be any status, future ones can only be scheduled
    const status = isPast 
      ? statuses[Math.floor(Math.random() * statuses.length)]
      : 'scheduled';
    
    // Random number of symptoms (0-3)
    const symptomCount = Math.floor(Math.random() * 4);
    const appointmentSymptoms = [];
    for (let j = 0; j < symptomCount; j++) {
      const symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
      if (!appointmentSymptoms.includes(symptom)) {
        appointmentSymptoms.push(symptom);
      }
    }

    appointments.push({
      id: `app-${i + 1}`,
      patientId,
      doctorId: doctor.id,
      doctor,
      date: isPast ? getRandomPastDate() : getRandomFutureDate(),
      time: getRandomTime(),
      status,
      type,
      notes: Math.random() > 0.7 ? 'Patient notes will be added after the appointment.' : undefined,
      symptoms: appointmentSymptoms.length > 0 ? appointmentSymptoms : undefined,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
    });
  }

  return appointments;
};

export const useAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  const fetchAppointments = useCallback(
    async (patientId) => {
      try {
        dispatch(fetchAppointmentsStart());
        
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate fetching with mock data
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const mockAppointments = generateMockAppointments(patientId, 10);
        dispatch(fetchAppointmentsSuccess(mockAppointments));
        
        return { success: true, appointments: mockAppointments };
      } catch (error) {
        dispatch(fetchAppointmentsFailure(error instanceof Error ? error.message : 'Failed to fetch appointments'));
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
      }
    },
    [dispatch]
  );

  const createAppointment = useCallback(
    async (appointmentData) => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const newAppointment = {
          ...appointmentData,
          id: `app-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        
        dispatch(addAppointment(newAppointment));
        return { success: true, appointment: newAppointment };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to create appointment' };
      }
    },
    [dispatch]
  );

  const updateAppointmentById = useCallback(
    async (id, appointmentData) => {
      try {
        const existingAppointment = appointments.find(app => app.id === id);
        
        if (!existingAppointment) {
          throw new Error('Appointment not found');
        }
        
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const updatedAppointment = {
          ...existingAppointment,
          ...appointmentData,
        };
        
        dispatch(updateAppointment(updatedAppointment));
        return { success: true, appointment: updatedAppointment };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to update appointment' };
      }
    },
    [appointments, dispatch]
  );

  const cancelAppointmentById = useCallback(
    async (id) => {
      try {
        const existingAppointment = appointments.find(app => app.id === id);
        
        if (!existingAppointment) {
          throw new Error('Appointment not found');
        }
        
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        dispatch(cancelAppointment(id));
        return { success: true };
      } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : 'Failed to cancel appointment' };
      }
    },
    [appointments, dispatch]
  );

  const getUpcomingAppointments = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (appointment) => appointment.date >= today && appointment.status === 'scheduled'
    ).sort((a, b) => {
      // Sort by date first
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      // If same date, sort by time
      return a.time.localeCompare(b.time);
    });
  }, [appointments]);

  const getPastAppointments = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(
      (appointment) => appointment.date < today || appointment.status !== 'scheduled'
    ).sort((a, b) => {
      // Sort by date in descending order (most recent first)
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date);
      }
      // If same date, sort by time in descending order
      return b.time.localeCompare(a.time);
    });
  }, [appointments]);

  const getDoctors = useCallback(() => {
    return mockDoctors;
  }, []);

  return {
    appointments,
    loading,
    error,
    fetchAppointments,
    createAppointment,
    updateAppointmentById,
    cancelAppointmentById,
    getUpcomingAppointments,
    getPastAppointments,
    getDoctors
  };
}; 