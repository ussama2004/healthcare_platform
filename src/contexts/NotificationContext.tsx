import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'message' | 'system';
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1', // patient
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Ali on June 15 is confirmed.',
    type: 'appointment',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '2',
    userId: '1', // patient
    title: 'New Message',
    message: 'You have a new message from Dr. Ali regarding your upcoming appointment.',
    type: 'message',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '3',
    userId: '2', // nurse
    title: 'New Appointment Request',
    message: 'Ahmed Hassan has requested a home visit on June 18 at 10:00 AM.',
    type: 'appointment',
    isRead: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  {
    id: '4',
    userId: '2', // nurse
    title: 'Rating Received',
    message: 'You received a 5-star rating from your last visit.',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    id: '5',
    userId: '3', // admin
    title: 'New User Registered',
    message: 'A new nurse has registered and requires approval.',
    type: 'system',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications when user changes
  useEffect(() => {
    if (user) {
      // Filter notifications for the current user
      const userNotifications = mockNotifications.filter(
        notification => notification.userId === user.id
      );
      setNotifications(userNotifications);
    } else {
      setNotifications([]);
    }
  }, [user]);
  
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        isRead: true,
      }))
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};