import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// Main Layout
import Layout from '../components/layout/Layout';

// Pages
import Dashboard from '../pages/Dashboard';
import Appointments from '../pages/appointments/Appointments';
import Services from '../pages/services/Services';
import ServiceDetail from '../pages/services/ServiceDetail';
import Nurses from '../pages/nurses/Nurses';
import NurseDetail from '../pages/nurses/NurseDetail';
import Patients from '../pages/patients/Patients';
import PatientDetail from '../pages/patients/PatientDetail';
import Requests from '../pages/requests/Requests';
import Analytics from '../pages/Analytics';
import Notifications from '../pages/Notifications';
import Messages from '../pages/Messages';
import ChatRoom from '../pages/ChatRoom';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Help from '../pages/Help';
import NotFound from '../pages/NotFound';

// Protected Route Component
const ProtectedRoute: React.FC<{
  element: React.ReactNode;
  allowedRoles?: string[];
}> = ({ element, allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  // If auth is still loading, show nothing
  if (isLoading) return null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If no roles are specified or user's role is allowed, render the element
  if (allowedRoles.length === 0 || (user && allowedRoles.includes(user.role))) {
    return <>{element}</>;
  }
  
  // If user's role is not allowed, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/appointments" element={<Appointments />} />
          
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          
          <Route path="/nurses" element={<ProtectedRoute element={<Nurses />} allowedRoles={['patient', 'admin']} />} />
          <Route path="/nurses/:id" element={<ProtectedRoute element={<NurseDetail />} allowedRoles={['patient', 'admin']} />} />
          
          <Route path="/patients" element={<ProtectedRoute element={<Patients />} allowedRoles={['nurse', 'admin']} />} />
          <Route path="/patients/:id" element={<ProtectedRoute element={<PatientDetail />} allowedRoles={['nurse', 'admin']} />} />
          
          <Route path="/requests" element={<ProtectedRoute element={<Requests />} allowedRoles={['patient', 'nurse']} />} />
          
          <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} allowedRoles={['admin']} />} />
          
          <Route path="/notifications" element={<Notifications />} />
          
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:id" element={<ChatRoom />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;