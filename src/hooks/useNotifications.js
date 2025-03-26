import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  fetchNotifications,
  addNotification
} from '../store/slices/notificationSlice.js';

// Sample notifications data (in a real app, this would come from an API)
const initialNotifications = [
  {
    id: '1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Smith has been confirmed for tomorrow at 10:00 AM.',
    type: 'appointment',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: '2',
    title: 'New Message',
    message: 'You have a new message from Dr. Johnson regarding your test results.',
    type: 'message',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    title: 'Medication Reminder',
    message: "Don't forget to take your medication today.",
    type: 'reminder',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: '4',
    title: 'Appointment Rescheduled',
    message: 'Your appointment with Dr. Williams has been rescheduled to Friday at 11:00 AM.',
    type: 'appointment',
    read: true,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: '5',
    title: 'Lab Results Available',
    message: 'Your recent lab results are now available. Please check your health records.',
    type: 'results',
    read: false,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  }
];

function useNotifications() {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(state => state.notifications);
  const [isOpen, setIsOpen] = useState(false);
  
  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Fetch notifications on mount
  useEffect(() => {
    if (notifications.length === 0) {
      // Simulate API request
      setTimeout(() => {
        dispatch(fetchNotifications(initialNotifications));
      }, 500);
    }
  }, [dispatch, notifications.length]);
  
  // Toggle notifications panel
  const toggleNotifications = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  // Mark notification as read
  const markNotificationAsRead = useCallback((id) => {
    dispatch(markAsRead(id));
  }, [dispatch]);
  
  // Mark all notifications as read
  const markAllNotificationsAsRead = useCallback(() => {
    dispatch(markAllAsRead());
  }, [dispatch]);
  
  // Delete a notification
  const deleteNotificationById = useCallback((id) => {
    dispatch(deleteNotification(id));
  }, [dispatch]);
  
  // Clear all notifications
  const clearNotifications = useCallback(() => {
    dispatch(clearAllNotifications());
  }, [dispatch]);
  
  // Create a new notification
  const createNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now().toString(),
      read: false,
      date: new Date().toISOString(),
      ...notification
    };
    
    dispatch(addNotification(newNotification));
    return newNotification;
  }, [dispatch]);
  
  // Filter notifications by type
  const getNotificationsByType = useCallback((type) => {
    return notifications.filter(notification => notification.type === type);
  }, [notifications]);
  
  // Get all unread notifications
  const getUnreadNotifications = useCallback(() => {
    return notifications.filter(notification => !notification.read);
  }, [notifications]);
  
  // Get all recent notifications (last 24 hours)
  const getRecentNotifications = useCallback(() => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    return notifications.filter(notification => {
      const notificationDate = new Date(notification.date);
      return notificationDate > oneDayAgo;
    });
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    isOpen,
    toggleNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotificationById,
    clearNotifications,
    createNotification,
    getNotificationsByType,
    getUnreadNotifications,
    getRecentNotifications
  };
}

export default useNotifications; 