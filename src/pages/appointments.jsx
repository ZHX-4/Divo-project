import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showDetails, setShowDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const cardHoverVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  // Filter appointments based on search term and filter
  const filterAppointments = (data) => {
    if (!data) return [];
    
    // Apply search filter
    let filtered = data;
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(appointment => 
        appointment.doctor.toLowerCase().includes(term) ||
        appointment.specialty.toLowerCase().includes(term) ||
        appointment.location?.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.type === selectedFilter);
    }
    
    return filtered;
  };

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      date: 'May 25, 2023',
      time: '10:30 AM',
      doctor: 'Dr. Sarah Bounab',
      specialty: 'Cardiology',
      duration: 30,
      location: 'Medical Center, Building A, Room 305',
      status: 'Confirmed',
      type: 'in-person',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/043/253/872/small/arabian-female-doctor-in-hijab-and-gloves-in-hospital-photo.jpg',
      notes: 'Follow-up appointment to check blood pressure and discuss test results. Please bring your medication list and any recent test results.',
    },
    {
      id: 2,
      date: 'June 3, 2023',
      time: '2:00 PM',
      doctor: 'Dr. Farid Al-Khalidi',
      specialty: 'Dermatology',
      duration: 45,
      location: 'Online Consultation',
      status: 'Confirmed',
      type: 'video',
      image: 'https://www.shutterstock.com/image-photo/smiling-bearded-male-indian-doctor-600nw-2036186171.jpg',
      notes: 'Virtual consultation to discuss skin condition. Please have good lighting and be in a private location. Take photos of any areas of concern before the appointment.',
    },
    {
      id: 3,
      date: 'June 10, 2023',
      time: '11:15 AM',
      doctor: 'Dr. Fouzi Bachtouti',
      specialty: 'Orthopedics',
      duration: 60,
      location: 'Orthopedic Clinic, Floor 2',
      status: 'Pending',
      type: 'in-person',
      image: 'https://media.istockphoto.com/id/507750349/photo/let-him-help-you-get-healthy.jpg?s=612x612&w=0&k=20&c=5-lRYeOBxTVEg9MO2TNsxCXPhTOFA9ogH9AwQPMR3KA=',
      notes: 'Initial consultation for knee pain. Bring any previous X-rays or MRI results if available.',
    }
  ];

  const pastAppointments = [
    {
      id: 101,
      date: 'April 15, 2023',
      time: '9:00 AM',
      doctor: 'Dr. Douaa Bouden',
      specialty: 'Pediatrics',
      duration: 30,
      location: 'Pediatric Center',
      status: 'Completed',
      type: 'in-person',
      image: 'https://cdn.ghanaweb.com/imagelib/pics/357/35708062.295.jpg',
      summary: 'Annual check-up. Child is developing well, all vaccines up to date. Next appointment in 12 months.',
    },
    {
      id: 102,
      date: 'March 22, 2023',
      time: '11:15 AM',
      doctor: 'Dr. Farhet Mounir',
      specialty: 'Cardiology',
      duration: 45,
      location: 'Medical Center, Building A, Room 305',
      status: 'Completed',
      type: 'in-person',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-arab-doctor-man-600nw-2049497993.jpg',
      summary: 'Follow-up on heart condition. EKG results normal. Continue with current medication. Schedule follow-up in 3 months.',
    },
    {
      id: 103,
      date: 'March 5, 2023',
      time: '3:30 PM',
      doctor: 'Dr. Abdellah Djadour',
      specialty: 'Physical Therapy',
      duration: 60,
      location: 'Online Consultation',
      status: 'Completed',
      type: 'video',
      image: 'https://img.freepik.com/free-photo/pleased-young-bald-male-doctor-wearing-medical-robe-stethoscope-sitting-desk-work-with-medical-tools-points-side-isolated-green-background_141793-63407.jpg',
      summary: 'Virtual session for back pain exercises. Showed proper form for stretches. Continue with daily exercise regimen.',
    }
  ];

  const filteredUpcoming = filterAppointments(upcomingAppointments);
  const filteredPast = filterAppointments(pastAppointments);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video':
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'phone':
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Appointments | Divo</title>
        <meta name="description" content="Manage your medical appointments" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              My Appointments
            </motion.h1>
            <motion.p 
              className="mt-2 text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              View and manage all your scheduled appointments
            </motion.p>
          </div>
          <motion.div 
            className="mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Schedule New Appointment
            </button>
          </motion.div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="mt-4 md:mt-0">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">All Types</option>
                <option value="in-person">In-Person</option>
                <option value="video">Video Call</option>
                <option value="phone">Phone Call</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Past
            </button>
          </nav>
        </div>

        {/* Appointments List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence>
            {(activeTab === 'upcoming' ? filteredUpcoming : filteredPast).map((appointment) => (
              <motion.div
                key={appointment.id}
                variants={cardHoverVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={appointment.image}
                        alt={appointment.doctor}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {appointment.doctor}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.duration} minutes
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(appointment.type)}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {showDetails === appointment.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {activeTab === 'upcoming' ? appointment.notes : appointment.summary}
                          </p>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => setShowDetails(showDetails === appointment.id ? null : appointment.id)}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                        >
                          {showDetails === appointment.id ? 'Hide Details' : 'Show Details'}
                        </button>
                        {activeTab === 'upcoming' && (
                          <div className="flex space-x-3">
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                            >
                              Reschedule
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Appointments;