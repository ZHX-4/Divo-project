import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login, logout, updateUser } from '../store/slices/authSlice';

// Sample user data (in a real app, this would come from an API)
const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe',
    role: 'patient',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    email: 'jane@example.com',
    password: 'password123',
    name: 'Jane Smith',
    role: 'doctor',
    specialty: 'Cardiology',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    profilePicture: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export function useAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get auth state from Redux store
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  // Initialize auth state from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && !isAuthenticated) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(login(parsedUser));
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch, isAuthenticated]);
  
  // Sign in handler
  const signIn = useCallback(async (email, password, remember = false) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Remove password before storing
        const { password, ...userWithoutPassword } = foundUser;
        
        // Store in localStorage if remember is true
        if (remember) {
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        }
        
        dispatch(login(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  
  // Sign up handler
  const signUp = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const userExists = mockUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // In a real app, this would be an API call to create a user
      const newUser = {
        id: String(mockUsers.length + 1),
        ...userData,
        role: userData.role || 'patient',
        profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      };
      
      // Remove password before storing
      const { password, ...userWithoutPassword } = newUser;
      
      return { success: true, user: userWithoutPassword };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Sign out handler
  const signOut = useCallback(() => {
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/login');
  }, [dispatch, router]);
  
  // Update user profile
  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...profileData };
      
      // Update localStorage if user was remembered
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      dispatch(updateUser(updatedUser));
      return { success: true, user: updatedUser };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [dispatch, user]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile
  };
}

export default useAuth; 