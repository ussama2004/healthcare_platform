import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserRole } from './types';

// Pages
import AuthPage from './pages/auth/AuthPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import NurseDashboard from './pages/nurse/NurseDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import HomePage from './pages/HomePage';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: UserRole[] }) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (authState.user && !allowedRoles.includes(authState.user.role)) {
    if (authState.user.role === UserRole.PATIENT) {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (authState.user.role === UserRole.NURSE) {
      return <Navigate to="/nurse/dashboard" replace />;
    } else if (authState.user.role === UserRole.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  const isAuthPage = window.location.pathname === '/auth';
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {!isAuthPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function AppRoutes() {
  const { authState } = useAuth();
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route 
          path="/auth" 
          element={
            authState.isAuthenticated ? (
              authState.user?.role === UserRole.PATIENT ? (
                <Navigate to="/patient/dashboard" replace />
              ) : authState.user?.role === UserRole.NURSE ? (
                <Navigate to="/nurse/dashboard" replace />
              ) : (
                <Navigate to="/admin/dashboard" replace />
              )
            ) : (
              <AuthPage />
            )
          } 
        />
        
        <Route 
          path="/patient/dashboard" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.PATIENT]}>
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/nurse/dashboard" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.NURSE]}>
              <NurseDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppRoutes />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;