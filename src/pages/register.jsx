import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';

const Register = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const checkbox = e.target;
      setFormData({
        ...formData,
        [name]: checkbox.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 3 && validateStep3()) {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call to create the user account
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Redirect to login page after successful registration
        router.push('/login?registered=true');
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({
          form: 'Registration failed. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Sign Up | Divo</title>
        <meta name="description" content="Create your Divo account to schedule and manage your medical appointments" />
      </Head>
      
      <div className="px-4 py-8 sm:px-0 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Join Divo to manage your healthcare journey</p>
          </motion.div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <motion.div 
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= stepNumber 
                        ? 'bg-primary-600 dark:bg-primary-700 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                    animate={{
                      scale: step === stepNumber ? [1, 1.1, 1] : 1,
                      backgroundColor: step >= stepNumber ? '#2563eb' : '#e5e7eb',
                      color: step >= stepNumber ? '#ffffff' : '#6b7280'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {stepNumber}
                  </motion.div>
                  <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                    {stepNumber === 1 && 'Account'}
                    {stepNumber === 2 && 'Personal Info'}
                    {stepNumber === 3 && 'Confirmation'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 w-full bg-gray-200 dark:bg-gray-700 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary-600 dark:bg-primary-700"
                initial={{ width: '0%' }}
                animate={{ width: `${(step - 1) * 50}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.firstName ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.lastName ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.email ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.password ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.confirmPassword ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.dateOfBirth ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dateOfBirth}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.gender ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                    >
                      <option value="" className="text-gray-900 dark:text-gray-100">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.gender}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400 sm:text-sm ${
                        errors.phoneNumber ? 'border-red-300 dark:border-red-500' : ''
                      } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Terms and Conditions</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className={`h-4 w-4 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:checked:bg-primary-600 ${
                          errors.agreeToTerms ? 'border-red-300 dark:border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="font-medium text-gray-700 dark:text-gray-200">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="mt-1 text-red-600 dark:text-red-400">{errors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;