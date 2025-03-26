import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  appointments: [],
  selectedAppointment: null,
  doctorAvailability: [],
  loading: false,
  error: null,
};

// Create the appointment slice
export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    // Fetch appointments request
    fetchAppointmentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Fetch appointments success
    fetchAppointmentsSuccess: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
      state.error = null;
    },
    
    // Create appointment request
    createAppointmentRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Create appointment success
    createAppointmentSuccess: (state, action) => {
      state.loading = false;
      state.appointments.push(action.payload);
      state.error = null;
    },
    
    // Update appointment status
    updateAppointmentStatus: (state, action) => {
      state.loading = false;
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index].status = action.payload.status;
        state.appointments[index].updatedAt = new Date().toISOString();
      }
      state.error = null;
    },
    
    // Select appointment
    selectAppointment: (state, action) => {
      state.selectedAppointment = state.appointments.find(app => app.id === action.payload) || null;
    },
    
    // Fetch doctor availability request
    fetchDoctorAvailabilityRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Fetch doctor availability success
    fetchDoctorAvailabilitySuccess: (state, action) => {
      state.loading = false;
      state.doctorAvailability = action.payload;
      state.error = null;
    },
    
    // Handle appointment failure
    appointmentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear selected appointment
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },

    // For demo purposes, add a fetch appointments action
    fetchAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

// Export the actions
export const {
  fetchAppointmentsRequest,
  fetchAppointmentsSuccess,
  createAppointmentRequest,
  createAppointmentSuccess,
  updateAppointmentStatus,
  selectAppointment,
  fetchDoctorAvailabilityRequest,
  fetchDoctorAvailabilitySuccess,
  appointmentFailure,
  clearSelectedAppointment,
  fetchAppointments,
} = appointmentSlice.actions;

// Export the reducer
export default appointmentSlice.reducer; 